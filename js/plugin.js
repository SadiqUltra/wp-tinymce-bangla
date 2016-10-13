( function() {

    tinymce.PluginManager.add( 'fb_test', function( editor, url ) {

        // Add a button that opens a window
        editor.addButton( 'fb_test_avro', {

            text: 'অ',
            icon: false,
            onclick: function() {
               //alert('love it');
               isAvro = true;
                IBn_driver = IBn_english;
                IBn_writingMode = "e";
               bn_kbmode="eng";
               $("#mceu_14").addClass('mce-active');
               $("#mceu_15").removeClass('mce-active');
               $("#mceu_17").removeClass('mce-active');
                //isBijoy = false;
            }

        } );

        //bijoy
        editor.addButton( 'fb_test_bijoy', {
            
            text: 'বি',
            icon: false,
            onclick: function() {
                //alert("Unijoy keyboard layout is activated");
                bn_kbmode="ujy";
                isAvro = false;
                IBn_driver = IBn_bijoy;
                (IBn_writingMode == "b") ? IBn_writingMode = "e" : IBn_writingMode = "b";

               $("#mceu_15").addClass('mce-active');
               $("#mceu_14").removeClass('mce-active');
               $("#mceu_17").removeClass('mce-active');
            }

        } );

        //english
        editor.addButton( 'fb_test_english', {
            
            text: 'ই',
            icon: false,
            onclick: function() {
               //alert("English keyboard layout is activated");
                bn_kbmode="eng";
                isAvro = false;
                IBn_driver = IBn_english;
                IBn_writingMode = "e";
               
               $("#mceu_17").addClass('mce-active');
               $("#mceu_15").removeClass('mce-active');
               $("#mceu_14").removeClass('mce-active');
            }

        } );

        //bijoy 2 unijoy
        editor.addButton( 'fb_test_bijoy2unijoy', {
            
            text: 'রূ',
            icon: false,
            onclick: function() {
               // Open window
              editor.windowManager.open({
                  title: 'বিজয় থেকে ইউনিকোড',
                  body: [
                      {type: 'textbox', multiline: true, name: 'bijoy2UnijoyContent', label: '', minHeight: '300', minWidth: '300'}
                  ],
                  onsubmit: function(e) {
                      // Insert content when the window form is submitted
                      var unijoyUft8 = cM("bangla", e.data.bijoy2UnijoyContent);

                      editor.insertContent(unijoyUft8);
                  }
              });

            }

        } );
        /**
         * avro
         */
editor.on('init', function() {
    $(editor.contentDocument.activeElement)
      .atwho({
        at: "",
        limit: 11,
        data: {},
        //insert_tpl: "${name}",
        callbacks: {
          //just match everything baby :3
          matcher: function (flag, subtext) {
            if (!isAvro) return null; // always return null when user selects english
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

      })
});
/**/
///////
      editor.on('keydown', function(e) {

        /**
         * avro bijoy english
         */
        
        if (e.which == 32 && e.ctrlKey) {
          toggleAvro();
        }

        if (e.which == 66 && e.ctrlKey && e.altKey) {
          toggleBijoy();
        }

        
        

        //console.log('love it');
        /**
         * tinyMCE and atwho conflicts Resolved
         * removing unwanted span
         */
        var editorID = $(this).attr('id');
        var editorIframeID = '#' + editorID + '_ifr';
        
        $(editorIframeID).contents().find("span.atwho-view-flag").replaceWith( $(editorIframeID).contents().find("span.atwho-view-flag").text() );


        if(e.keyCode == 13 && $(editor.contentDocument.activeElement).atwho('isSelecting'))
          return false
      });
  // editor on key down
        // event
        editor.on('keypress', function (e) {
          switch (e.type) {
                    case "keypress":   
                        if(bn_kbmode!='eng')
                        {
                               var keyCode = (e.keyCode) ? e.keyCode : e.which;
                       var bn_char_e = String.fromCharCode(keyCode);//get the char equivalent to this keycode                           
                            if(keyCode==8 || keyCode==32||keyCode==13)
                            {
                            // if space is pressed we have to clear the carry. otherwise there will be some malformed conjunctions
                                bn_carry = " "; 
                                bn_old_len = 1;
                                return;
                            }
                            bn_lastcarry = bn_carry;
                            bn_carry += "" + bn_char_e;  //append the current character pressed to the carry                            
                            //Start the intellisense
                            if(bn_kbmode=='phni')
                            {                   
                                if ((phonetic['vowels'].indexOf(bn_lastcarry)!=-1 && phonetic['vowels'].indexOf(bn_char_e)!=-1) ||  (bn_lastcarry==" " && phonetic['vowels'].indexOf(bn_char_e)!=-1))                                                                     
                                {
                                    //let's check for dhirgho i kar and dhirgho u kar :P        
                                    if(bn_carry=='ii' || bn_carry=='uu'){bn_carry = bn_lastcarry+bn_char_e;}
                                    else
                                    {
                                        bn_char_e = bn_char_e.toUpperCase();
                                        bn_carry = bn_lastcarry+bn_char_e;                                      
                                    }               
                                }
                                
                            }
                            //intellisense ended
                            
                            bn_bangla=_bn_Parsekeyboardinput(bn_carry);//bn_bangla = phonetic[bn_carry]?phonetic[bn_carry]:''; // get the combined equivalent
                            bn_tempBangla=_bn_Parsekeyboardinput(bn_char_e);//bn_tempBangla = phonetic[bn_char_e]?phonetic[bn_char_e]:''; // get the single equivalent
                            



                            if (bn_tempBangla == ".." || bn_bangla == "..") //that means it has next sibling
                            {
                                return false;
                            }
                            if((bn_char_e=="+" || bn_char_e=="="|| bn_char_e=="`")&&(bn_kbmode=="phn" || bn_kbmode=="phni"))
                            {
                                if((bn_carry=="++" || bn_carry=="=="|| bn_carry=="``")&&(bn_kbmode=="phn" || bn_kbmode=="phni"))
                                {
                                    // check if it is a plus sign
                                    _bn_insertJointAtCursor(bn_char_e,bn_old_len);
                                    e.returnValue = false;
                                    e.preventDefault();                     
                                    bn_old_len=1;
                                    return false;
                                }   
                                //otherwise this is a simple joiner
                                _bn_insertAtCursor('\u09CD');
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1;
                                bn_carry2=bn_carry;
                                bn_carry="+";
                                return false;
                            }
                            if (bn_char_e=="g" && bn_kbmode=="ujy")
                            {
                                if(bn_carry=="gg")
                                {
                                    // check if it is a plus sign
                                    _bn_insertJointAtCursor('\u09CD' + '\u200c',bn_old_len);
                                    e.returnValue = false;
                                    e.preventDefault(); 
                                    bn_old_len=1;
                                    return false;
                                }   
                                //otherwise this is a simple joiner
                                _bn_insertAtCursor("\u09CD");
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1;
                                bn_carry="g";
                                return false;
                            }
                            if (bn_char_e=="d" && bn_kbmode=="ins")
                            {
                                _bn_insertAtCursor("\u09CD");
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1;
                                bn_carry2=bn_carry;
                                bn_carry="d";               
                                return false;
                            
                            }
                            if (bn_char_e=="/" && bn_kbmode=='phb')
                            {
                                if(bn_carry=="//")
                                {
                                    // check if it is a / sign
                                    _bn_insertJointAtCursor("/",bn_old_len);
                                    e.returnValue = false;
                                    e.preventDefault(); 
                                    bn_old_len=1;
                                    return false;
                                }           
                                //otherwise this is a simple joiner
                                _bn_insertAtCursor("\u09CD");
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1;
                                bn_carry2=bn_carry;
                                bn_carry="/";               
                                return false;
                            
                            }
                            else if(bn_old_len==0) //first character
                            {
                                // this is first time someone press a character     
                                
                                //alert('hi');
                                
                                _bn_insertJointAtCursor(bn_bangla,0);                   
                                bn_old_len=1;
                                e.returnValue = false;
                                e.preventDefault(); 
                                
                                return false;
                                
                            }
                            else if(((bn_char_e=='z' || bn_char_e=='Z')&& bn_carry2=="r+") &&( bn_kbmode=="phn" || bn_kbmode=="phni"))//force Za-phola after Ra
                            {           
                                _bn_insertJointAtCursor('\u200C'+'\u09CD'+phonetic['z'],1);                 
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len=1;   
                                return false;
                            }
                            else if(bn_char_e=='\\' && bn_carry2=="jd" && bn_kbmode=='ujy')//force Za-phola after Ra
                            {       
                                _bn_insertJointAtCursor('\u200C'+'\u09CD'+'\u09AF',1);
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len=1;   
                                return false;
                                
                            }
                            else if (bn_carry == "jM" && bn_kbmode=="ins") //solve ra-japhola issue
                            {
                                _bn_insertJointAtCursor(inscript['j']+'\u200C'+inscript['M'],bn_old_len);
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1;
                                return false;
                            }
                            else if(bn_carry=="ao" && bn_kbmode=="phn")// its a shore o
                            {                               
                                _bn_insertJointAtCursor(phonetic['ao']?phonetic['ao']:'',bn_old_len);
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len=1;
                                return false;
                            }
                            else if(bn_carry=="Ao" && bn_kbmode=="phni")
                            {
                                // its a shore o
                                _bn_insertJointAtCursor(phonetic['ao']?phonetic['ao']:'',bn_old_len);
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len=1;
                                return false;
                            }
                            else if (bn_carry == "ii" && (bn_kbmode=="phn" || bn_kbmode=="phni"))// process dirgho i kar            
                            {   
                                _bn_insertJointAtCursor(_bn_Parsekeyboardinput(bn_carry),1);                    
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1;
                                return false;
                            }
                            else if (bn_carry == "oi"  && bn_kbmode=="phn")//oi kar
                            {
                                _bn_insertJointAtCursor('\u09C8',1);                    
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1;
                                return false;
                            }       
                            else if (bn_carry == "oI" && bn_kbmode=="phni")//oi kar
                            {
                                _bn_insertJointAtCursor('\u09C8',bn_old_len); //same treatment like ou kar (By manchu)
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1; 
                                return false;
                            }   
                            else if (bn_char_e == "o" && (bn_kbmode=="phn" || bn_kbmode=="phni"))
                            {
                                //alert('yes');
                                bn_old_len = 1;                                     
                                _bn_insertAtCursor('\u09CB');
                                bn_carry = "o";
                                e.returnValue = false;
                                e.preventDefault();                                 
                                //alert('bn_char_e='+bn_char_e+' bn_carry='+bn_carry+' bn_lastcarry='+bn_lastcarry);
                                return false;
                            }
                            else if (bn_carry == "ou" && bn_kbmode=="phn")// ou kar
                            {                               
                                _bn_insertJointAtCursor("\u09CC",bn_old_len);                   
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1;
                                return false;
                            }   
                            else if (bn_carry == "oU" && bn_kbmode=="phni")// ou kar
                            {
                                //alert('hi');
                                _bn_insertJointAtCursor("\u09CC",bn_old_len);
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = 1;
                                return false;
                            }
                            else if(bn_char_e=="A" && bn_kbmode=="ujy")
                            {
                                //process old style ref
                                _bn_insertAtCursor(unijoy['v']+ '\u09CD');
                                bn_old_len = 1;
                                return false;
                            }
                            else if(bn_char_e=='Z' && bn_carry2=="r/" && bn_kbmode=="pbh")//force Za-phola after Ra
                            {   
                                _bn_insertJointAtCursor('\u200d'+probhat['/']+probhat['Z'],1);
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len=1;   
                                return false;
                            }
                            else if((bn_bangla == "" && bn_tempBangla !="")) //that means it has no joint equivalent
                            {                                                   
                                // there is no joint equivalent - so show the single equivalent. 
                                
                                bn_bangla = bn_tempBangla;
                                //alert('No joint='+bn_bangla);
                                if (bn_bangla=="")
                                {
                                    // there is no available equivalent - leave as is
                                    bn_carry ="";
                                    return;
                                }                   
                                else
                                {
                                    // found one equivalent
                                    bn_carry = bn_char_e;
                                    //tinymce.activeEditor.execCommand('mceInsertContent', false, bn_bangla);                        
                                    _bn_insertAtCursor(bn_bangla);
                                    e.returnValue = false;
                                    e.preventDefault();                     
                                    bn_old_len = bn_bangla.length;
                                    return false;
                                }
                            }
                            else if(bn_bangla!="")//joint equivalent found 
                            {
                                _bn_insertJointAtCursor(bn_bangla, bn_old_len);                 
                                e.returnValue = false;
                                e.preventDefault(); 
                                bn_old_len = bn_bangla.length;
                                return false;
                            }
                            else
                            {
                                return false;
                            }   
                        }// End if
                        else{
                            _bn_insertAtCursor(e.keyCode);
                        }                                                                          
                    case "keydown":                     
                            return false;               
                    case "keyup":                   
                            return false;
                        }
                return true;
        });
        // end of event 

    } );
// end of pluginManger

/*
    * Get's the equivalent bengali character for any particular keyboard
    *
    */
    function _bn_Parsekeyboardinput(myValue)
    {
        switch(bn_kbmode)
        {
            case 'phn':
                return  phonetic[myValue]?phonetic[myValue]:'';
            break;
            case 'phni':
                return  phonetic[myValue]?phonetic[myValue]:'';
            break;
            case 'ujy':             
                return  unijoy[myValue]?unijoy[myValue]:'';
            break;
            case 'pbh':
                return  probhat[myValue]?probhat[myValue]:'';
            break;
            case 'ins':
                return  inscript[myValue]?inscript[myValue]:'';
            break;
            default:            
                return  '';
        }
    }

//main theme is taken from hasin hayder's phonetic parser
    function _bn_insertJointAtCursor(myValue, len)
    {        
         if (tinymce.Env.gecko) 
         {  
             if (tinymce.activeEditor)
             {
                 rng = tinymce.activeEditor.selection.getRng();            
                 rngNode = rng.commonAncestorContainer;              
                 if(rng.startOffset>=len)
                 {               
                     rng.setStart(rngNode, rng.startOffset-1*(len)) ;              
                     tinymce.activeEditor.execCommand('mceInsertContent', false, myValue);                                        
                 }
                 else if(rng.startOffset==0)
                 {
                     rng.setStart(rngNode, rng.startOffset) ;              
                     tinymce.activeEditor.execCommand('mceInsertContent', false, myValue);                     
                 }              
             }           
         }
         else if(tinyMCE.isIE)        //Hope this will work for IE based brower
         {       
             if (tinymce.activeEditor) 
             {
                 var rng = tinymce.activeEditor.getDoc().selection.createRange();
                 //if(tinymce.activeEditor.getDoc().length >= len)
                 //{             
                    rng.moveStart('character',-1*(len));
                    //bn_old_len=1; 
                 //}                    
                 rng.select();               
                  tinymce.activeEditor.execCommand('mceInsertContent', false, myValue);
                 
             }
         }//end of if       
    }//end of function

    function _bn_insertAtCursor(myValue)
    {
        tinymce.activeEditor.execCommand('mceInsertContent', false, myValue);    
    }//end of function

// base :)
} )();
