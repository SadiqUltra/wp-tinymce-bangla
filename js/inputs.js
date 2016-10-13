$(function () {

    //Show incompatibily alert
    if (navigator.userAgent.match(/Android/i)){
        if (!LS.browserWarning){
            LS.browserWarning = 1;
            alert('AvroPad may not work as expected due to some bugs of Android. Ask Google to get their things right.');
        }
    }


    avro = new AvroPhonetic(
        function () {
            if (LS.AvroCandidateSelection) {
                return JSON.parse(LS.AvroCandidateSelection);
            } else {
                return {};
            }
        },
        function (cS) {
            LS.AvroCandidateSelection = JSON.stringify(cS);
        }
    );

    // Functions
    toggleLanguage = function () {
        isBN = !isBN;
        $(document.body).toggleClass('sys');
        $statusControl.prop('checked', isBN);
        runningEvent = 0;
    };
    //http://a248.e.akamai.net/assets.github.com/images/icons/emoji/8.png
    $("input").atwho({
        at: '',
        displayTpl: "<li><img src='http://a248.e.akamai.net/assets.github.com/images/icons/emoji/${name}.png' height='20' width='20'/> ${name} </li>",
        insertTpl: ":${name}:",
        start_with_space: false,
        limit: 6,
        highlight_first: true,
        data: {},
        callbacks: {
            //just match everything baby :3
            matcher: function (flag, subtext) {
                if (!isAvro) return null; // always return null when user selects english

                var inputID = $(this).attr('id');
                //console.log(inputID);
                if(inputID  == 'url'){
                    return null;
                }
                var res = subtext.match(/\s?([^\s]+)$/);
                // console.log(subtext, res);
                if (res == null) return null;
                var bnregex = /[\u0980-\u09FF]+$/;
                if (bnregex.exec(res[1])) return null;
                return res[1];
            },
            // main work is done here
            filter: function (query, data, search_key) {
                // console.log(query, data, search_key);
                var bnarr = avro.suggest(query);

                bnarr.words = bnarr.words.slice(0,10);
                if (avro.candidate(query) === query) {
                    bnarr.prevSelection = bnarr.words.length;
                }
                bnarr.words.push(query);

                selectedIndex = 0;
                return $.map(bnarr.words, function (value, i) {
                    if (i === bnarr.prevSelection) selectedIndex = i;
                    return {
                        id: i,
                        name: value
                    };
                });
            },
            before_insert: function (value, li) {
                // save the selected value to user preferences;
                var qtxt = this.query.text;
                setTimeout(function () {
                    avro.commit(qtxt, value);
                }, 500);
                //console.log(value);
                return value;
            },
            highlighter: function(li, query) {
                return li;
            },
            sorter: function (query, items, search_key) {
                return items;
            },

        }// end of call back
    }).keydown(function (e) {
        /**
         * avro bijoy english
         */

        // change default


        if (e.which == 32 && e.ctrlKey) {
            toggleAvro();
            IBn_driver = IBn_english;
        }

        if (e.which == 66 && e.ctrlKey && e.altKey) {
            toggleBijoy();
            IBn_driver = IBn_bijoy;
        }
        //

        //bijoy
        if (e.which == 66 && e.ctrlKey && e.altKey) {
            (IBn_writingMode == "b") ? IBn_writingMode = "e" : IBn_writingMode = "b";
            IBn_driver = IBn_bijoy;
        }
        // avro
        if (e.which == 32 && e.ctrlKey) {
            IBn_writingMode = "e";
            IBn_driver = IBn_english;
        }
        /****/

        var IBn_keycode = e.which;
        var IBn_keycode =  e.keyCode ? e.keyCode : e.which;
        var IBn_keystring = String.fromCharCode(IBn_keycode);
        //console.log(IBn_keystring);
        //lets check if writing mode is english. if so, dont process anything
        if (IBn_writingMode == "e" || isAvro == true) {
            return true;
        }


        //end mode check
    }).keypress(function(e) {

        // checking if it is url

        var inputID = $(this).attr('id');
        //console.log(inputID);
        if(inputID  == 'url'){
            return true;
        }

        var IBn_keycode = e.which;
        var IBn_keycode =  e.keyCode ? e.keyCode : e.which;
        var IBn_keystring = String.fromCharCode(IBn_keycode);

        if (IBn_ctrlPressed) {
            $("#stat").html("Not Processing");
        }else {
            var _IBn_carry = IBn_carry;
            IBn_carry += IBn_keystring;
            //processing intellisense
            if (IBn_driver.IBn_supportIntellisense) {
                var IBn_mods = IBn_driver.IBn_intellisense(IBn_keystring, _IBn_carry);
                if (IBn_mods) {
                    IBn_keystring = IBn_mods.IBn_keystring
                    IBn_carry = IBn_mods.IBn_carry;
                }
            }
            //end intellisense


            var IBn_replacement = IBn_driver.keymaps[IBn_carry];
            if (IBn_replacement) {
                IBn_iac(this, IBn_replacement, 1);
                e.stopPropagation();
                return false;
            }
            //carry processing end

            //if no equivalent is found for carry, then try it with relpacement itself
            IBn_replacement = IBn_driver.keymaps[IBn_keystring];
            IBn_carry = IBn_keystring;
            if (IBn_replacement) {
                IBn_iac(this, IBn_replacement, 0);
                e.stopPropagation();
                return false;
            }

            //nothing found, leave it as is
            IBn_lastInsertedString = "";
            return true;
        }
        /****/

        if(e.keyCode == 13 && $(editor.contentDocument.activeElement).atwho('isSelecting')) {
            return false;
        }
    });

    var IBn_iac = function(obj, input, type){
        var myField = obj;
        var myValue = input;

        IBn_len = IBn_lastInsertedString.length;
        if (!type)
            IBn_len = 0;
        if (document.selection) {
            myField.focus();
            IBn_sel = document.selection.createRange();
            if (myField.value.length >= len) { // here is that first conjunction bug in IE, if you use the > operator
                sel.moveStart('character', -1 * (len));
            }
            IBn_sel.text = myValue;
            IBn_sel.collapse(true);
            IBn_sel.select();
        }
        //MOZILLA/NETSCAPE support
        else {
            if (myField.selectionStart || myField.selectionStart == 0) {
                myField.focus();
                var startPos = myField.selectionStart - IBn_len;
                var endPos = myField.selectionEnd;
                var scrollTop = myField.scrollTop;
                startPos = (startPos == -1 ? myField.value.length : startPos);
                myField.value = myField.value.substring(0, startPos) +
                    myValue +
                    myField.value.substring(endPos, myField.value.length);
                myField.focus();
                myField.selectionStart = startPos + myValue.length;
                myField.selectionEnd = startPos + myValue.length;
                myField.scrollTop = scrollTop;
            }
            else {
                var IBn_scrollTop = myField.scrollTop;
                myField.value += myValue;
                myField.focus();
                myField.scrollTop = IBn_scrollTop;
            }
        }
        IBn_lastInsertedString = myValue;
    }
    /**/
});
/***********/
