
var preConversionMap =	//Mostly Usable for Spelling Mistake Correction
{
	' +':' ',
	'yy':'y',	// Added by Abdullah Ibne Alam. Shohag - 20090603 - Double Hrosh-u-Kar
	'vv':'v',	// Added by Abdullah Ibne Alam. Shohag - 20090603 - Double Aa-Kar
	'Â­Â­':'Â­',	// Added by Abdullah Ibne Alam. Shohag - 20090603 - Double Jukto-L - L+Double-L = Triple L
	'y&':'y',	// Added by Abdullah Ibne Alam. Shohag - 20090603 - Hoshonto+Hrosh-u
	'â€ž&':'â€ž',	// Added by Abdullah Ibne Alam. Shohag - 20090603 - Hoshonto+Ri-Kar
	'â€¡u':'uâ€¡',	// Added by Abdullah Ibne Alam. Shohag - 20090603 - ChondroBindu Error /Typing Mistake
	'wu':'uw',	// Added by Abdullah Ibne Alam. Shohag - 20090604 - ChondroBindu Error /Typing Mistake
	' ,':',',
	' \\|':'\\|',
	'\\\\ ':'',
	' \\\\':'',
	'\\\\':'',
	'\n +':'\n',
	' +\n':'\n',
	'\n\n\n\n\n':'\n\n',
	'\n\n\n\n':'\n\n',
	'\n\n\n':'\n\n',
};

var conversionMap =
{
	// Vowels Start
	'Av':'à¦†',
	'A':'à¦…',
	'B':'à¦‡',
	'C':'à¦ˆ',
	'D':'à¦‰',
	'E':'à¦Š',
	'F':'à¦‹',
	'G':'à¦',
	'H':'à¦',
	'I':'à¦“',
	'J':'à¦”',
	
	// Constants
	'K':'à¦•',
	'L':'à¦–',
	'M':'à¦—',
	'N':'à¦˜',
	'O':'à¦™',
	'P':'à¦š',
	'Q':'à¦›',
	'R':'à¦œ',
	'S':'à¦',
	'T':'à¦ž',
	'U':'à¦Ÿ',
	'V':'à¦ ',
	'W':'à¦¡',
	'X':'à¦¢',
	'Y':'à¦£',
	'Z':'à¦¤',
	'_':'à¦¥',
	'`':'à¦¦',
	'a':'à¦§',
	'b':'à¦¨',
	'c':'à¦ª',
	'd':'à¦«',
	'e':'à¦¬',
	'f':'à¦­',
	'g':'à¦®',
	'h':'à¦¯',
	'i':'à¦°',
	'j':'à¦²',
	'k':'à¦¶',
	'l':'à¦·',
	'm':'à¦¸',
	'n':'à¦¹',
	'o':'à§œ',
	'p':'à§',
	'q':'à§Ÿ',
	'r':'à§Ž',
 	's':'à¦‚',
 	't':'à¦ƒ',
	'u':'à¦',
	
	// Numbers
	'0':'à§¦',
	'1':'à§§',
	'2':'à§¨',
	'3':'à§©',
	'4':'à§ª',
	'5':'à§«',
	'6':'à§¬',
	'7':'à§­',
	'8':'à§®',
	'9':'à§¯',

	// Kars
	'â€¢':'à¦™à§',
	'v':'à¦¾',	// Aa-Kar
	'w':'à¦¿',	// i-Kar
	'x':'à§€',	// I-Kar
	'y':'à§',	// u-Kar
	'z':'à§',	// u-Kar
	'â€œ':'à§',	// u-kar
	'â€“':'à§',	// u-kar
	'~':'à§‚',	// U-kar
	'Æ’':'à§‚',	// U-kaar
	'â€š':'à§‚',	// U-kaar
	'â€žâ€ž':'à§ƒ',	// Added by Abdullah Ibne Alam. Shohag - 20090506 - Double Rri-kar Bug
	'â€ž':'à§ƒ',	// Ri-Kar
	'â€¦':'à§ƒ',	// Ri-Kar
	"â€ ":'à§‡',	// E-Kar
	"â€¡":'à§‡',	// E-Kar
	'Ë†':'à§ˆ',	// Oi-Kar
	'â€°':'à§ˆ',	// Oi-Kar
	'Å ':'à§—',	// Ou-Kar
	'\\|':'à¥¤',	// Full-Stop
	'\\&':'à§â€Œ', // Ho-shonto

	//	Jukto Okkhor
	'\\^':'à§à¦¬',
	'â€˜':'à§à¦¤à§',
	'â€™':'à§à¦¥',
	'â€¹':'à§à¦•',
	'Å’':'à§à¦•à§à¦°',
	'â€':'à¦šà§',
	'â€”':'à§à¦¤',
	'Ëœ':'à¦¦à§',
	'â„¢':'à¦¦à§',
	'Å¡':'à¦¨à§',
	'â€º':'à¦¨à§',
	'Å“':'à§à¦¨',
	'Å¸':'à§à¦¬',
	'Â¡':'à§à¦¬',
	'Â¢':'à§à¦­',
	'Â£':'à§à¦­à§à¦°',
	'Â¤':'à¦®à§',
	'Â¥':'à§à¦®',
	'Â¦':'à§à¦¬',
	'Â§':'à§à¦®',
	'Â¨':'à§à¦¯',
	'Â©':'à¦°à§',
	'Âª':'à§à¦°',
	'Â«':'à§à¦°',
	'Â¬':'à§à¦²',
	'Â­':'à§à¦²',
	'Â®':'à¦·à§',
	'Â¯':'à¦¸à§',

	'Â°':'à¦•à§à¦•',
	'Â±':'à¦•à§à¦Ÿ',
	'Â²':'à¦•à§à¦·à§à¦£',	// Added by Abdullah Ibne Alam. Shohag - 20090522 - shu(kkhno)
	'Â³':'à¦•à§à¦¤',
	'Â´':'à¦•à§à¦®',
	'Âµ':'à¦•à§à¦°',
	'Â¶':'à¦•à§à¦·',
	'Â·':'à¦•à§à¦¸',
	'Â¸':'à¦—à§',
	'Â¹':'à¦œà§à¦ž',
	'Âº':'à¦—à§à¦¦',
	'Â»':'à¦—à§à¦§',
	'Â¼':'à¦™à§à¦•',
	'Â½':'à¦™à§à¦—',
	'Â¾':'à¦œà§à¦œ',
	'Â¿':'à§à¦¤à§à¦°',
	'Ã€':'à¦œà§à¦',
	'Ã':'à¦œà§à¦ž',
	'Ã‚':'à¦žà§à¦š',
	'Ãƒ':'à¦žà§à¦›',
	'Ã„':'à¦žà§à¦œ',
	'Ã…':'à¦žà§à¦',
	'Ã†':'à¦Ÿà§à¦Ÿ',
	'Ã‡':'à¦¡à§à¦¡',
	'Ãˆ':'à¦£à§à¦Ÿ',
	'Ã‰':'à¦£à§à¦ ',
	'ÃŠ':'à¦£à§à¦¡',
	'Ã‹':'à¦¤à§à¦¤',
	'ÃŒ':'à¦¤à§à¦¥',
	'Ã':'à¦¤à§à¦®',	// Fixed by Abdullah Ibne Alam. Shohag - 20090601 - (tm) toy-mo AddyaTik
	'ÃŽ':'à¦¤à§à¦°',
	'Ã':'à¦¦à§à¦¦',
	'Ã':'-',
	'Ã‘':'-',	// Added by Abdullah Ibne Alam. Shohag - 20090505 - Missing Dash(-)
	'Ã’':'"',	// Replace by Abdullah Ibne Alam. Shohag - 20090507 - Problem with "
	'Ã“':'"',	// Replace by Abdullah Ibne Alam. Shohag - 20090507 - Problem with "
	'Ã”':"'",	// Replace by Abdullah Ibne Alam. Shohag - 20090507 - Problem with `
	'Ã•':"'",	// Replace by Abdullah Ibne Alam. Shohag - 20090507 - Problem with `
	'Ã–':'à§à¦°',
	'Ã—':'à¦¦à§à¦§',
	'Ã˜':'à¦¦à§à¦¬',
	'Ã™':'à¦¦à§à¦®',
	'Ãš':'à¦¨à§à¦ ',
	'Ã›':'à¦¨à§à¦¡',
	'Ãœ':'à¦¨à§à¦§',
	'Ã':'à¦¨à§à¦¸',
	'Ãž':'à¦ªà§à¦Ÿ',
	'ÃŸ':'à¦ªà§à¦¤',
	'Ã ':'à¦ªà§à¦ª',
	'Ã¡':'à¦ªà§à¦¸',
	'Ã¢':'à¦¬à§à¦œ',
	'Ã£':'à¦¬à§à¦¦',
	'Ã¤':'à¦¬à§à¦§',
	'Ã¥':'à¦­à§à¦°',
	'Ã¦':'à¦®à§à¦¨',
	'Ã§':'à¦®à§à¦«',
	'Ã¨':'à§à¦¨',
	'Ã©':'à¦²à§à¦•',
	'Ãª':'à¦²à§à¦—',
	'Ã«':'à¦²à§à¦Ÿ',
	'Ã¬':'à¦²à§à¦¡',
	'Ã­':'à¦²à§à¦ª',
	'Ã®':'à¦²à§à¦«',
	'Ã¯':'à¦¶à§',
	'Ã°':'à¦¶à§à¦š',
	'Ã±':'à¦¶à§à¦›',
	'Ã²':'à¦·à§à¦£',
	'Ã³':'à¦·à§à¦Ÿ',
	'Ã´':'à¦·à§à¦ ',
	'Ãµ':'à¦·à§à¦«',
	'Ã¶':'à¦¸à§à¦–',
	'Ã·':'à¦¸à§à¦Ÿ',
	'Ã¸':'à¦¸à§à¦¨',	// Added by Abdullah Ibne Alam. Shohag - 20090522 - (sn)eho //â€ Ã¸nÃ˜
	'Ã¹':'à¦¸à§à¦«',
	'Ãº':'à§à¦ª',
	'Ã»':'à¦¹à§',
	'Ã¼':'à¦¹à§ƒ',
	'Ã½':'à¦¹à§à¦¨',
	'Ã¾':'à¦¹à§à¦®',


	//'à§à¦²à§à¦²':'à§à¦²',	// Commented By Abdullah Ibne Alam. Shohag - 20090603, preConversionMap, Triple ll Correction
	//'à§à§':'à§',
};

var proConversionMap = 
{
	'à§à§':'à§'
};

var postConversionMap = 
{
 	//Colon with Number/Space Bug - Fixed by Abdullah Ibne Alam. Shohag - 20090506
	'à§¦à¦ƒ':'à§¦:',
	'à§§à¦ƒ':'à§§:',
	'à§¨à¦ƒ':'à§¨:',
	'à§©à¦ƒ':'à§©:',
	'à§ªà¦ƒ':'à§ª:',
	'à§«à¦ƒ':'à§«:',
	'à§¬à¦ƒ':'à§¬:',
	'à§­à¦ƒ':'à§­:',
	'à§®à¦ƒ':'à§®:',
	'à§¯à¦ƒ':'à§¯:',
	' à¦ƒ':' :',	// Added by Abdullah Ibne Alam. Shohag - 20090507
	'\nà¦ƒ':'\n:',	// Added by Abdullah Ibne Alam. Shohag - 20090507
	']à¦ƒ':']:',	// Added by Abdullah Ibne Alam. Shohag - 20090603
	'\\[à¦ƒ':'\\[:',	// Added by Abdullah Ibne Alam. Shohag - 20090603

	'  ':' ',
	//' à¥¤':'à¥¤',
	'à¦…à¦¾':'à¦†',
	'à§â€Œà§â€Œ':'à§â€Œ',
};


function convertToUnicode(srcID, dstID)
{
	var srcText = document.getElementById(srcID).value;
	var dstHWND = document.getElementById(dstID);

	for (var srcKey in preConversionMap)
	{
		var strReplaceExp = new RegExp(srcKey, 'g');
		srcText = srcText.replace(strReplaceExp, preConversionMap[srcKey]);
	}

	for (var srcKey in conversionMap)
	{
		var strReplaceExp = new RegExp(srcKey, 'g');
		srcText = srcText.replace(strReplaceExp, conversionMap[srcKey]);
	}

	srcText = ReArrangeUnicodeConvertedText(srcText);

	for (var srcKey in postConversionMap)
	{
		var strReplaceExp = new RegExp(srcKey, 'g');
		srcText = srcText.replace(strReplaceExp, postConversionMap[srcKey]);
	}

	insertContent(dstHWND, srcText);
}


/******************************************************************************
	Rearranges the folas, kars in a unicode string already mapped from ASCII.
	Coded by : S M Mahbub Murshed
	Date: September 05, 2006
	Modified by: RepulsiveCoder Date: 20090526
*******************************************************************************/

function ReArrangeUnicodeConvertedText(str)
{
	for (var i = 0; i < str.length; ++i)
	{
		// Change refs
		if (i < str.length - 1 && str.charAt(i)=='à¦°' && IsBanglaHalant(str.charAt(i+1)) && !IsBanglaHalant(str.charAt(i-1)))
		{
			var j = 1;
			while(true)
			{
				if (i-j<0)
				{
					break;
				}
				if (IsBanglaBanjonborno(str.charAt(i-j)) && IsBanglaHalant(str.charAt(i-j-1)))
				{
					j += 2;
				}
				else if (j==1 && IsBanglaKar(str.charAt(i-j)))
				{
					j++;
				}
				else
				{
					break;
				}
			}
			var temp = str.substring(0, i-j);
			temp += str.charAt(i);
			temp += str.charAt(i+1);
			temp += str.substring(i-j, i);
			temp += str.substring(i+2, str.length);
			str = temp;
			i += 1;
			continue;
		}
	}

	for (var srcKey in proConversionMap)
	{
		var strReplaceExp = new RegExp(srcKey, 'g');
		str = str.replace(strReplaceExp, proConversionMap[srcKey]);
	}

	for (var i = 0; i < str.length; ++i)
	{
		if (i < str.length - 1 && str.charAt(i)=='à¦°' && IsBanglaHalant(str.charAt(i+1)) && !IsBanglaHalant(str.charAt(i-1)) && IsBanglaHalant(str.charAt(i+2)))
		{
			var j = 1;
			while(true)
			{
				if (i-j<0)
				{
					break;
				}
				if (IsBanglaBanjonborno(str.charAt(i-j)) && IsBanglaHalant(str.charAt(i-j-1)))
				{
					j += 2;
				}
				else if (j==1 && IsBanglaKar(str.charAt(i-j)))
				{
					j++;
				}
				else
				{
					break;
				}
			}
			var temp = str.substring(0, i-j);
			temp += str.charAt(i);
			temp += str.charAt(i+1);
			temp += str.substring(i-j, i);
			temp += str.substring(i+2, str.length);
			str = temp;
			i += 1;
			continue;
		}

		// for 'Vowel + HALANT + Consonant'
		// it should be 'HALANT + Consonant + Vowel'
		if (i > 0 && str.charAt(i) == '\u09CD' && (IsBanglaKar(str.charAt(i - 1)) || IsBanglaNukta(str.charAt(i - 1))) && i < str.length-1)
		{
			var temp = str.substring(0, i-1);
			temp += str.charAt(i);
			temp += str.charAt(i + 1);
			temp += str.charAt(i - 1);
			temp += str.substring(i + 2, str.length);
			str = temp;
		}

		// for 'RA (\u09B0) + HALANT + Vowel'
		// it should be 'Vowel + RA (\u09B0) + HALANT'
		if (i > 0 && i < str.length - 1 && str.charAt(i) == '\u09CD' && str.charAt(i-1) == '\u09B0' && str.charAt(i-2) != '\u09CD' && IsBanglaKar(str.charAt(i + 1)))
		{
			var temp = str.substring(0, i-1);
			temp += str.charAt(i + 1);
			temp += str.charAt(i - 1);
			temp += str.charAt(i);
			temp += str.substring(i + 2, str.length);
			str = temp;
		}

		// Change pre-kar to post format suitable for unicode
		if (i < str.length - 1 && IsBanglaPreKar(str.charAt(i)) && IsSpace(str.charAt(i+1))==false)
		{
			var temp = str.substring(0, i);
			var j = 1;

			while(IsBanglaBanjonborno(str.charAt(i+j)))
			{
				if (IsBanglaHalant(str.charAt(i+j+1)))
				{
					j += 2;
				}
				else
				{
					break;
				}
			}
			temp += str.substring(i+1,i+j+1);

			var l = 0;
			if (str.charAt(i)=='à§‡' && str.charAt(i+j+1) == 'à¦¾')
			{
				temp += "à§‹"; l = 1;
			}
			else if (str.charAt(i)=='à§‡' && str.charAt(i+j+1) == "à§—")
			{
				temp += "à§Œ"; l = 1;
			}
			else
			{
				temp += str.charAt(i);
			}
			temp += str.substring(i+j+l+1, str.length);
			str = temp;
			i += j;
		}

		// nukta should be placed after kars
		if (i < str.length-1 && IsBanglaNukta(str.charAt(i)) && IsBanglaPostKar(str.charAt(i+1)))
		{
			var temp = str.substring(0, i);
			temp += str.charAt(i+1);
			temp += str.charAt(i);
			temp += str.substring(i+2,str.length);
			str = temp;
		}
	}
	return str;
}

function IsBanglaDigit(c)
{
	if (c >= 'à§¦' && c <= 'à§¯') return true;
	return false;
}

function IsBanglaPreKar(c)
{
	if (c == 'à¦¿' || c == 'à§ˆ' || c == 'à§‡') return true;
	return false;
}

function IsBanglaPostKar(c)
{
	if (c == 'à¦¾' || c == 'à§‹' || c == 'à§Œ' || c == 'à§—' || c == 'à§' || c == 'à§‚' || c == 'à§€' || c == 'à§ƒ') return true;
	return false;
}

function IsBanglaKar(c)
{
	if (IsBanglaPreKar(c) || IsBanglaPostKar(c)) return true;
	return false;
}

function IsBanglaBanjonborno(c)
{
	if (c == 'à¦•' || c == 'à¦–' || c == 'à¦—' || c == 'à¦˜' || c == 'à¦™' || c == 'à¦š' || c == 'à¦›' || c == 'à¦œ' || c == 'à¦' || c == 'à¦ž' || c == 'à¦Ÿ' || c == 'à¦ ' || c == 'à¦¡' || c == 'à¦¢' || c == 'à¦£' || c == 'à¦¤' || c == 'à¦¥' || c == 'à¦¦' || c == 'à¦§' || c == 'à¦¨' || c == 'à¦ª' || c == 'à¦«' || c == 'à¦¬' || c == 'à¦­' || c == 'à¦®' || c == 'à¦¯' || c == 'à¦°' || c == 'à¦²' || c == 'à¦¶' || c == 'à¦·' || c == 'à¦¸' || c == 'à¦¹' || c == 'à§œ' || c == 'à§' || c == 'à§Ÿ' || c == 'à§Ž' || c == 'à¦‚' || c == 'à¦ƒ' || c == 'à¦') return true;
	return false;
}

function IsBanglaSoroborno(c)
{
	if (c == 'à¦…' || c == 'à¦†' || c == 'à¦‡' || c == 'à¦ˆ' || c == 'à¦‰' || c == 'à¦Š' || c == 'à¦‹' || c == 'à¦Œ' || c == 'à¦' || c == 'à¦' || c == 'à¦“' || c == 'à¦”') return true;
	return false;
}

function IsBanglaNukta(c)
{
	if (c == 'à¦') return true;
	return false;
}


function IsBanglaHalant(c)
{
	if (c == 'à§') return true;
	return false;
}

function IsSpace(c)
{
	if (c == ' ' || c == '\t' || c == '\n' || c == '\r') return true;
	return false;
}