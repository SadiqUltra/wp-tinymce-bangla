var IBn_english = {
    keymaps: {}
};
var IBn_driver = IBn_english;

var IBn_bijoy = {
    keymaps: {
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
        '0': '০',

        '্a': 'ঋ',      
        '্s': 'উ',
        '্S': 'ঊ',
        '্d': 'ই',
        '্D': 'ঈ',
        '্f': 'আ',
        '্x': '‌ও',
        '্X': 'ঔ',
        '্c': 'এ',
        '্C': 'ঐ',
            
        
        'q': 'ঙ',
        'w': 'য',
        'e': 'ড',
        'r': 'প',
        't': 'ট',
        'y': 'চ',
        'u': 'জ',
        'i': 'হ',
        'o': 'গ',
        'p': 'ড়',

        'a': 'ৃ',
        's': 'ু',
        'd': 'ি',
        'f': 'া',           
        'g': '্',
        'h': 'ব',           
        'j': 'ক',
        'k': 'ত',
        'l': 'দ',

        'z': '্র',
        'x': 'ো',
        'c': 'ে',
        'v': 'র',
        'b': 'ন',
        'n': 'স',
        'm': 'ম',

        'Q': 'ং',
        'W': 'য়',
        'E': 'ঢ',
        'R': 'ফ',
        'T': 'ঠ',
        'Y': 'ছ',
        'U': 'ঝ',
        'I': 'ঞ',
        'O': 'ঘ',
        'P': 'ঢ়',

        'A': 'র্',
        'S': 'ূ',
        'D': 'ী',
        'F': 'অ',
        'G': '।',
        'H': 'ভ',
        'J': 'খ',
        'K': 'থ',
        'L': 'ধ',

        'Z': '্য',
        'X': 'ৌ',
        'C': 'ৈ',
        'V': 'ল',
        'B': 'ণ',
        'N': 'ষ',
        'M': 'শ',

        //'!': '!',
        '@': 'ঁ',
        '\\$': '৳',
        '%': '%',
        '^': 'ঃ',
        '&': 'ৎ',

        '`': '`',
        '~': '~',
        '-': '-',
        '=': '=',
        '!': '!',
        '#': '#',
        '$': '৳',
        '%': '%',
        '*': '*',
        '(': '(',
        ')': ')',
        '_': '_',
        '+': '+',
        '[': '[',
        '{': '{',
        ']': ']',
        '}': '}',
        '\\': '\\',
        '|': '|',
        ';': ';',
        ':': ':',
        ',': ',',
        '<': '<',
        '.': '।',
        '>': '>',
        '/': '/',
        '?': '?'
    },
    IBn_supportIntellisense: false,
    IBn_intellisense: function(IBn_currentinput, IBn_lastcarry){
        var IBn_vowels = 'aIiUuoiiouueEiEu';
        if ((IBn_vowels.indexOf(IBn_lastcarry) != -1 && IBn_vowels.indexOf(IBn_currentinput) != -1) || (IBn_lastcarry == " " && IBn_vowels.indexOf(IBn_currentinput) != -1)) {
            //let's check for dhirgho i kar and dhirgho u kar :P	
            IBn_carry = IBn_lastcarry + IBn_currentinput;
            if (IBn_carry == 'ii' || IBn_carry == 'uu')
                IBn_newkeystring = IBn_currentinput;
            else
                IBn_newkeystring = IBn_currentinput.toUpperCase();

            IBn_newcarry = IBn_lastcarry + IBn_newkeystring;
            IBn_mods = {
                IBn_keystring: IBn_newkeystring,
                IBn_carry: IBn_newcarry
            }
            return IBn_mods;
        }
        return true;
    }
};


