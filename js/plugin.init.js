/**
 * Created by A S M Sadiqul Islam on 10/11/16.
 */

var LS = window.localStorage,
    selectedIndex,
    avro,
    isAvro = true,
    isBijoy = false,
    runningEvent = 0
    ;

// init avro

// init keyboard
KEY_CODE = {
    DOWN: 40,
    UP: 38,
    ESC: 27,
    TAB: 9,
    ENTER: 13,
    SPACE: 32,
    CTRL: 17,
    P: 80,
    N: 78
};

var IBn_opts;
var IBn_common = 1;
var IBn_switched = 0;
var IBn_ctrlPressed;
var IBn_lastInsertedString = "";
var IBn_writingMode = "b";
var IBn_carry;
var IBn_switchKey = "y";


// change avro
toggleAvro = function () {

    isBijoy = false;

    if (isAvro) {
        return isAvro = false;
    }

    isAvro = true;
};

// change bijoy
toggleBijoy = function () {
    isAvro = false;

    if (isBijoy) {
        return isBijoy = false;
    }

    isBijoy = true;
};
// bijoy

/**/
//These are common for any layout..so :)
var bn_carry = '';  //This variable stores each keystrokes
var bn_old_len =0; //This stores length parsed bangla charcter
var bn_carry2="";
var bn_bangla="";
var bn_tempBangla="";
var bn_kbmode='eng';
var bn_lastcarry="";

var phonetic=new Array(); //intelli and legacy version is handled with logic.
var probhat=new Array();
var unijoy=new Array();
var inscript=new Array();
var inscriptaltgr=new Array();
var shift=false; //for intelligent shift //by Hasin vai
// phonetic bangla equivalents
//Bengali: {U+0980..U+09FF}

//digits
phonetic['0']='\u09e6';//'০';
phonetic['1']='\u09e7';//'১';
phonetic['2']='\u09e8';//'২';
phonetic['3']='\u09e9';//'৩';
phonetic['4']='\u09ea';//'৪';
phonetic['5']='\u09eb';//'৫';
phonetic['6']='\u09ec';//'৬';
phonetic['7']='\u09ed';//'৭';
phonetic['8']='\u09ee';//'৮';
phonetic['9']='\u09ef';//'৯';

phonetic['i']='\u09BF'; // hrossho i kar
phonetic['I']='\u0987'; // hrossho i
phonetic['ii']='\u09C0'; // dirgho i kar
phonetic['II']='\u0988'; // dirgho i
phonetic['e']='\u09C7'; // e kar
phonetic['E'] = '\u098F'; // E
phonetic['U'] = '\u0989'; // hrossho u
phonetic['u'] = '\u09C1'; // hrossho u kar
phonetic['uu'] = '\u09C2'; // dirgho u kar
phonetic['UU'] = '\u098A'; // dirgho u
phonetic['r']='\u09B0'; // ro
phonetic['WR']='\u098B'; // wri
phonetic['a']='\u09BE'; // a kar
phonetic['A']='\u0986'; // shore a
phonetic['ao']='\u0985'; // shore o
phonetic['s']='\u09B8'; // dontyo so
phonetic['t']='\u099f'; // to

phonetic['k'] = '\u0995'; // ko
phonetic['K'] = '\u0996'; // Kho
phonetic['kh'] = '\u0996'; // kho

phonetic['n']='\u09A8'; // dontyo no
phonetic['N']='\u09A3'; // murdhonyo no
phonetic['T']='\u09A4'; // tto
phonetic['Th']='\u09A5'; // ttho

phonetic['d']='\u09A1'; // ddo
phonetic['dh']='\u09A2'; // ddho

phonetic['b']='\u09AC'; // bo
phonetic['bh']='\u09AD'; // bho
phonetic['v']='\u09AD'; // bho
//phonetic['rh']='o';    // doye bindu ro
phonetic['R']='\u09DC';  // doye bindu ro
phonetic['Rh']='\u09DD';     // dhoye bindu ro
phonetic['g']='\u0997'; // go
phonetic['G']='\u0998'; // gho

phonetic['gh']='\u0998'; // gho

phonetic['h']='\u09B9'; // ho
phonetic['NG']='\u099E';    // yo
phonetic['j']='\u099C'; // borgio jo
phonetic['J']='\u099D'; // jho
phonetic['jh']='\u099D'; // jho
phonetic['c']='\u099A'; //  cho
phonetic['ch']='\u099B'; // cho
phonetic['C']='\u099B'; // ccho
phonetic['th']='\u09A0'; // tho
phonetic['p']='\u09AA'; // po
phonetic['f']='\u09AB'; // fo
phonetic['ph']='\u09AB'; // fo
phonetic['D']='\u09A6'; // do
phonetic['Dh']='\u09A7'; // dho

phonetic['z']='\u09AF';// ontoshyo zo
phonetic['y']='\u09DF'; // ontostho yo
phonetic['Ng']='\u0999';    // Uma
phonetic['ng']='\u0982';    // uniswor
phonetic['l']='\u09B2'; // lo
phonetic['m']='\u09AE'; // mo
phonetic['sh']='\u09B6';    // talobyo sho
phonetic['S']='\u09B7'; // mordhonyo sho
phonetic['O']= '\u0993';//'\u09CB'; // o
phonetic['ou']='\u099C'; // ou kar
phonetic['OU']='\u0994'; // OU
phonetic['Ou']='\u0994'; // OU
phonetic['Oi']='\u0990'; // OU
phonetic['OI']='\u0990'; // OU
phonetic['tt']='\u09CE'; // tto
phonetic['H']='\u0983'; // bisworgo
phonetic["."] ="\u0964"; // dari
phonetic[".."] = "."; // fullstop
phonetic['HH'] = '\u09CD' + '\u200c'; // hosonto
phonetic['NN'] = '\u0981'; // chondrobindu
phonetic['Y'] ='\u09CD'+'\u09AF'; // jo fola
phonetic['w'] ='\u09CD'+ '\u09AC'; // wri kar
phonetic['W'] ='\u09C3';// wri kar
phonetic['wr'] ='\u09C3'; // wri kar
phonetic['x'] ="\u0995"  + '\u09CD'+ '\u09B8';
phonetic['rY'] = phonetic['r']+ '\u200C'+ '\u09CD'+'\u09AF';
//insertConjunction('\u200D'+'\u09CD'+phonetic['z'],1);
phonetic['L'] = phonetic['l'];
phonetic['Z'] = phonetic['z'];
phonetic['P'] = phonetic['p'];
phonetic['V'] = phonetic['v'];
phonetic['B'] = phonetic['b'];
phonetic['M'] = phonetic['m'];
phonetic['V'] = phonetic['v'];
phonetic['X'] = phonetic['x'];
phonetic['V'] = phonetic['v'];
phonetic['F'] = phonetic['f'];
phonetic['vowels']='aIiUuoiiouueEiEu'; //dont change this pattern  //by Hasin vai
//End Set
//For unijoy


unijoy['0']='\u09e6';//'০';
unijoy['1']='\u09e7';//'১';
unijoy['2']='\u09e8';//'২';
unijoy['3']='\u09e9';//'৩';
unijoy['4']='\u09ea';//'৪';
unijoy['5']='\u09eb';//'৫';
unijoy['6']='\u09ec';//'৬';
unijoy['7']='\u09ed';//'৭';
unijoy['8']='\u09ee';//'৮';
unijoy['9']='\u09ef';//'৯';

// unijoy bangla equivalents
unijoy['j'] = '\u0995'; // ko

unijoy['d']='\u09BF'; // hrossho i kar
unijoy['gd']='\u0987'; // hrossho i
unijoy['D']='\u09C0'; // dirgho i kar
unijoy['gD']='\u0988'; // dirgho i
unijoy['c']='\u09C7'; // e kar
unijoy['gc'] = '\u098F'; // E
unijoy['gs'] = '\u0989'; // hrossho u
unijoy['s'] = '\u09C1'; // hrossho u kar
unijoy['S'] = '\u09C2'; // dirgho u kar
unijoy['gS'] = '\u098A'; // dirgho u
unijoy['v']='\u09B0'; // ro
unijoy['a']='\u098B'; // wri
unijoy['f']='\u09BE'; // a kar
unijoy['gf'] = '\u0986'; //shore a
unijoy['F']='\u0985'; // shore ao
//unijoy['ao']='\u0985'; // shore o
unijoy['n']='\u09B8'; // dontyo so
unijoy['t']='\u099f'; // to
unijoy['J'] = '\u0996'; // Kho

//unijoy['kh'] = '\u0996'; // kho

unijoy['b']='\u09A8'; // dontyo no
unijoy['B']='\u09A3'; // murdhonyo no
unijoy['k']='\u09A4'; // tto
unijoy['K']='\u09A5'; // ttho

unijoy['e']='\u09A1'; // ddo
unijoy['E']='\u09A2'; // ddho

unijoy['h']='\u09AC'; // bo
unijoy['H']='\u09AD'; // bho
//unijoy['v']='\u09AD'; // bho
//unijoy['rh']='o';  // doye bindu ro
unijoy['p']='\u09DC';    // doye bindu ro
unijoy['P']='\u09DD';    // dhoye bindu ro
unijoy['o']='\u0997';   // go
unijoy['O']='\u0998';   // gho

//unijoy['gh']='\u0998'; // gho

unijoy['i']='\u09B9';   // ho
unijoy['I']='\u099E';   // yo
unijoy['u']='\u099C';   // borgio jo
unijoy['U']='\u099D'; // jho
//unijoy['jh']='\u099D'; // jho
unijoy['y']='\u099A'; //  cho
unijoy['Y']='\u099B'; // cho
//unijoy['C']='\u099B'; // ccho
unijoy['T']='\u09A0'; // tho
unijoy['r']='\u09AA'; // po
unijoy['R']='\u09AB'; // fo
//unijoy['ph']='\u09AB'; // fo
unijoy['l']='\u09A6'; // do
unijoy['L']='\u09A7'; // dho

unijoy['w']='\u09AF';// ontoshyo zo
unijoy['W']='\u09DF';   // ontostho yo
unijoy['q']='\u0999';   // Uma
unijoy['Q']='\u0982';   // uniswor
unijoy['V']='\u09B2';   // lo
unijoy['m']='\u09AE';   // mo
unijoy['M']='\u09B6';   // talobyo sho
unijoy['N']='\u09B7'; // mordhonyo sho
unijoy['gx']= '\u0993';//'\u09CB'; // o
unijoy['X']='\u09CC'; // ou kar
unijoy['gX']='\u0994'; // OU
//unijoy['Ou']='\u0994'; // OU
unijoy['gC']='\u0990'; // Oi
unijoy['\\']='\u0983'; // khandaTa
unijoy['|']='\u09CE'; // bisworgo
unijoy["G"] ="\u0964"; // dari
//unijoy[".."] = "."; // fullstop
unijoy['g'] = ' ';//'\u09CD' + '\u200c'; // hosonto
unijoy['&'] = '\u0981'; // chondrobindu
unijoy['Z'] ='\u09CD'+'\u09AF'; // jo fola
unijoy['gh'] ='\u09CD'+ '\u09AC'; // bo fola
unijoy['ga'] ='\u098B';// wri kar
unijoy['a'] ='\u09C3'; // wri
//unijoy['k'] ="\u0995"  + '\u09CD'+ '\u09B8';
unijoy['vZ'] = unijoy['v']+ '\u200d'+ '\u09CD'+'\u09AF';
unijoy['z'] =  '\u09CD'+ unijoy['v'];
unijoy['x'] = '\u09CB';
unijoy['C'] = '\u09C8'; //Oi Kar


//For probhat


//  First line
probhat['`']='\u200d'; //ZWJ   `~
probhat['~']='~';//
//digits
probhat['1']='\u09e7';//'১';
probhat['2']='\u09e8';//'২';
probhat['3']='\u09e9';//'৩';
probhat['4']='\u09ea';//'৪';
probhat['5']='\u09eb';//'৫';
probhat['6']='\u09ec';//'৬';
probhat['7']='\u09ed';//'৭';
probhat['8']='\u09ee';//'৮';
probhat['9']='\u09ef';//'৯';
probhat['0']='\u09e6';//'০';
probhat['-']='-';
probhat['=']='=';
//shift digit
probhat['!']="!";
probhat['@']='@';
probhat['#']='#';
probhat['$']='\u09f3';  //bengali taka(BDT) sign ৳
probhat['%']='%';
probhat['^']='^';
probhat['&']='\u099e';   //ঞ niyo
probhat['*']='\u09ce';    //ৎ  khanda ta
probhat['(']='(';
probhat[')']=')';
probhat['_']='_';
probhat['+']='+';
//2nd line
probhat['q']='\u09a6'; //দ
probhat['Q']='\u09a7';//ধ
probhat['w']='\u09c2';  //ঊ-কার
probhat['W']='\u098a';  // ঊ
probhat['e']='\u09c0'; //ঈ-কার
probhat['E']='\u0988'; // ঈ
probhat['r']='\u09b0';  //র
probhat['R']='\u09dc'; //ড়
probhat['t']='\u099f'; //ট
probhat['T']='\u09a0'; //ঠ
probhat['y']='\u098f'; //এ
probhat['Y']='\u0990'; //ঐ
probhat['u']='\u09c1'; // উ-কার
probhat['U']='\u0989';//উ
probhat['i']='\u09bf'; //ই-কার
probhat['I']='\u0987';//ই
probhat['o']='\u0993';//ও
probhat['O']='\u0994';//ঔ
probhat['p']='\u09aa'; //প
probhat['P']='\u09ab';//ফ
probhat['[']='\u09c7';// এ-কার
probhat['{']='\u09c8';//ঐ-কার
probhat[']']='\u09cb';// ও-কার
probhat['}']='\u09cc';//ঔ-কার
probhat['\\']='\u200C'; //ZWNJ
probhat['|']= '\u0965'; // ডাবল দাঁড়ি
//3rd line
probhat['a']='\u09be'; //আ কার
probhat['A']='\u0985'; // অ
probhat['s']='\u09b8'; //স
probhat['S']='\u09b7'; //ষ
probhat['d']='\u09a1'; // ড
probhat['D']='\u09a2'; // ঢ
probhat['f']='\u09a4'; // ত
probhat['F']='\u09a5'; //থ
probhat['g']='\u0997'; //গ
probhat['G']='\u0998'; //ঘ
probhat['h']='\u09b9'; //হ
probhat['H']='\u0983'; //ঃ
probhat['j']='\u099c';  // জ
probhat['J']='\u099d'; // ঝ
probhat['k']='\u0995'; //  ক
probhat['K']='\u0996'; // খ
probhat['l']='\u09b2'; //  ল
probhat['L']='\u0982'; // ং
probhat[';']=';'; // ;
probhat[':']=':'; // :
//4th line
probhat['z']='\u09df';// য়
probhat['Z']='\u09af'; //য
probhat['x']='\u09b6'; //শ
probhat['X']='\u09dd'; //ঢ়
probhat['c']='\u099a'; //চ
probhat['C']='\u099b'; // ছ
probhat['v']='\u0986'; // আ
probhat['V']='\u098b'; // ঋ
probhat['b']='\u09ac'; // ব
probhat['B']='\u09ad'; // ভ
probhat['n']='\u09a8'; // ন
probhat['N']='\u09a3'; // ণ
probhat['m']='\u09ae'; //ম
probhat['M']='\u0999'; //ঙ
probhat[',']=','; //  কমা
probhat['<']='\u09c3'; // ঋ কার
probhat['.']='\u0964'; // দাঁড়ি
probhat[".."] = '\u0965'; // ডাবল দাঁড়ি  This key is modified
probhat['>']='\u0981'; //  ঁ
probhat['/']='\u09cd'; //হসন্ত
probhat['?']='?';  // ?
//For inscript layout
// Set of Characters
//  First line
//special char
inscript['`']='\u200C'; //ZWNJ
inscript['~']='\u200D'; //ZWJ
//normal mode
inscript['0']='\u09e6';//'০';
inscript['1']='\u09e7';//'১';
inscript['2']='\u09e8';//'২';
inscript['3']='\u09e9';//'৩';
inscript['4']='\u09ea';//'৪';
inscript['5']='\u09eb';//'৫';
inscript['6']='\u09ec';//'৬';
inscript['7']='\u09ed';//'৭';
inscript['8']='\u09ee';//'৮';
inscript['9']='\u09ef';//'৯';
inscript['-']='-';//   -
inscript['=']='\u09C3';// ঋ কার
//shift mode
inscript['!']="!";
inscript['@']='@';
inscript['#']='#';
inscript['$']='\u09F2';// bengali rupe mark
inscript['%']='"';  //
inscript['^']='\'';//
inscript['&']='&';
inscript['*']='*';
inscript['(']='(';
inscript[')']=')';
inscript['_']='\u0983';//ঃ
inscript['+']='\u098B'; //ঋ

//2nd line
//normal mode
inscript['q']='\u09CC'; //ঔ-কার
inscript['w']='\u09C8';  //ঐ-কার
inscript['e']='\u09BE'; //আ-কার
inscript['r']='\u09C0';  //ঈ-কার
inscript['t']='\u09C2'; // ঊ-কার
inscript['y']='\u09AC'; //ব
inscript['u']='\u09B9'; // হ
inscript['i']='\u0997'; //গ
inscript['o']='\u09A6';//দ
inscript['p']='\u099C'; //জ
inscript['[']='\u09A1';// ড
inscript[']']='\u09BC';// nukta
//inscript['\\']='\u09DC';// ড়

//shipt mode
inscript['Q']='\u0994';//ঔ
inscript['W']='\u0990';  // ঐ
inscript['E']='\u0986'; // আ
inscript['R']='\u0988'; //ঈ
inscript['T']='\u098A'; //ঊ
inscript['Y']='\u09AD'; //ভ
inscript['U']='\u0999';//ঙ
inscript['I']='\u0998';//ঘ
inscript['O']='\u09A7';//ধ
inscript['P']='\u099D';//ঝ
inscript['{']='\u09A2';//ঢ
inscript['}']='\u099E';//ঞ
//inscript['|']='\u09DD';//ঢ়

//3rd line
//normal mode
inscript['a']='\u09CB'; //ও-কার
inscript['s']='\u09C7'; //এ-কার
//inscript['d']='\u09CD'; // hasanta
inscript['f']='\u09BF'; // ই-কার
inscript['g']='\u09C1'; //উ-কার
inscript['h']='\u09AA'; //প
inscript['j']='\u09B0';  //র
inscript['k']='\u0995'; // ক
inscript['l']='\u09A4'; // ত
inscript[';']='\u099A'; // চ
inscript['\'']='\u099F'; //ট

//shift mode
inscript['A']='\u0993'; // ও
inscript['S']='\u098F'; //এ
inscript['D']='\u0985'; //অ
inscript['F']='\u0987'; //ই
inscript['G']='\u0989'; //উ
inscript['H']='\u09AB'; //ফ
inscript['J']='\u09CE'; //ৎ
inscript['K']='\u0996'; // খ
inscript['L']='\u09A5'; // থ
inscript[':']='\u099B'; // ছ
inscript['"']='\u09A0'; // ঠ
//4th line
//normal mode
//inscript['z']='\u09DC';// ড়
inscript['z']='\u09CD'+'\u09B0'; //র-ফলা
inscript['x']='\u0982'; //ং
inscript['c']='\u09AE'; //ম
inscript['v']='\u09A8'; // ন
inscript['b']='\u09F1'; // ৱ //bengali letter va with lower diagonal (assamese)
inscript['n']='\u09B2'; //ল
inscript['m']='\u09B8'; // স
inscript[',']=','; // ,
inscript['.']='.'; //
inscript['//']='\u09AF'; // য
//shift mode
//inscript['Z']='\u09DD'; //ঢ়
inscript['Z']='\u09B0'+'\u09CD'; //রেফ
inscript['X']='\u0981'; // ঁ
inscript['C']='\u09A3'; // ণ
inscript['V']='\u0965'; // double dari
inscript['B']='\u09F0'; // ৰ bengali letter RA with middle diagonal
inscript['N']='\u09CD'+'\u09AF'; //য-ফলা
inscript['M']='\u09B6'; //  শ
inscript['<']='\u09B7'; // ষ
inscript['>']='\u0964';  // dari
inscript['?']='\u09DF'; //য়
/**/








