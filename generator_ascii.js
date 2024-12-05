let AsciiCharList = [];
let AsciiCharMap = {};
let AsciiConvMap = {};
let AsciiCharMapPart = 0;
let AsciiCharDefault = 63;

let AsciiCharConvBucket = {};
let AsciiCharDerivativies = {};
let AsciiCharDerivativiesIncl = {};
let AsciiCharDerivativiesExcl = {};

function GenerateAsciiReplacementMap()
{
    let LetterChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let LetterNames = [];
    //                Latin                  Cyrillic                                         Greek
    LetterNames.push(["A", "AE",             "YA", "IA",                                      "ALPHA"]);
    LetterNames.push(["B",                   "BE",                                            "BETA"]);
    LetterNames.push(["C",                   "TSE", "CHE", "TSHE"]);
    LetterNames.push(["D", "AFRICAN D",      "DE", "DJE", "DZHE",                             "DELTA"]);
    LetterNames.push(["E",                   "IE", "SCHWA", "IOTIFIED E", "YAT",              "EPSILON", "LUNATE EPSILON", "ETA"]);
    LetterNames.push(["F",                   "EF", "FITA", "LITTLE YUS","IOTIFIED LITTLE YUS","PHI", "DIGAMMA", "PAMPHYLIAN DIGAMMA"]);
    LetterNames.push(["G",                   "GHE", "GJE",                                    "GAMMA"]);
    LetterNames.push(["H", "HENG",           "HA", "ABKHASIAN HA",                            "CHI"]);
    LetterNames.push(["I", "DOTLESS I",      "II", "YI", "PALOCHKA",                          "IOTA"]);
    LetterNames.push(["J", "DOTLESS J",      "JE",                                            "YOT"]);
    LetterNames.push(["K", "KRA",            "KA", "BASHKIR KA", "KJE",                       "KAPPA", "KAI", "KOPPA", "ARCHAIC KOPPA"]);
    LetterNames.push(["L",                   "EL", "LJE",                                     "LAMBDA", "LAMDA"]);
    LetterNames.push(["M",                   "EM",                                            "MU"]);
    LetterNames.push(["N", "ENG",            "EN", "NJE",                                     "NU"]);
    LetterNames.push(["O", "OE", "OU",       "IO", "OT", "BIG YUS", "IOTIFIED BIG YUS",       "OMICRON", "OMEGA", "ROUND OMEGA"]);
    LetterNames.push(["P",                   "PE",                                            "PI", "PSI"]);
    LetterNames.push(["Q"]);
    LetterNames.push(["R",                   "ER",                                            "RHO"]);
    LetterNames.push(["S", "ESH", "SHARP S", "ES", "SHA", "SHCHA",                            "SIGMA", "FINAL SIGMA", "LUNATE SIGMA", "STIGMA", "SHO", "SAN"]);
    LetterNames.push(["T", "THORN",          "TE",                                            "THETA", "TAU"]);
    LetterNames.push(["U", "STRAIGHT U",     "YU", "IU", "UK"]);
    LetterNames.push(["V",                   "VE"]);
    LetterNames.push(["W"]);
    LetterNames.push(["X",                   "KSI",                                           "XI"]);
    LetterNames.push(["Y",                   "YERU", "YERI", "IZHITSA",                       "UPSILON"]);
    LetterNames.push(["Z", "EZH", "YOGH",    "ZHE", "ZE", "DZE", "ABKHASIAN DZE",             "ZETA"]);

    for (let LetterNum_ = 32; LetterNum_ <= 126; LetterNum_++)
    {
        AsciiCharConvBucket[LetterNum_] = [];
        AsciiCharDerivativies[LetterNum_] = [];
        AsciiCharDerivativiesIncl[LetterNum_] = [];
        AsciiCharDerivativiesExcl[LetterNum_] = [];
        let Bucket = AsciiCharConvBucket[LetterNum_];

        let LetterChar = "";
        let LetterCase = 0;
        let BucketNonStdPos = 0;

        switch (String.fromCharCode(LetterNum_))
        {
            case 'a': LetterChar = "A"; LetterCase = 1; break;
            case 'b': LetterChar = "B"; LetterCase = 1; break;
            case 'c': LetterChar = "C"; LetterCase = 1; break;
            case 'd': LetterChar = "D"; LetterCase = 1; break;
            case 'e': LetterChar = "E"; LetterCase = 1; break;
            case 'f': LetterChar = "F"; LetterCase = 1; break;
            case 'g': LetterChar = "G"; LetterCase = 1; break;
            case 'h': LetterChar = "H"; LetterCase = 1; break;
            case 'i': LetterChar = "I"; LetterCase = 1; break;
            case 'j': LetterChar = "J"; LetterCase = 1; break;
            case 'k': LetterChar = "K"; LetterCase = 1; break;
            case 'l': LetterChar = "L"; LetterCase = 1; break;
            case 'm': LetterChar = "M"; LetterCase = 1; break;
            case 'n': LetterChar = "N"; LetterCase = 1; break;
            case 'o': LetterChar = "O"; LetterCase = 1; break;
            case 'p': LetterChar = "P"; LetterCase = 1; break;
            case 'q': LetterChar = "Q"; LetterCase = 1; break;
            case 'r': LetterChar = "R"; LetterCase = 1; break;
            case 's': LetterChar = "S"; LetterCase = 1; break;
            case 't': LetterChar = "T"; LetterCase = 1; break;
            case 'u': LetterChar = "U"; LetterCase = 1; break;
            case 'v': LetterChar = "V"; LetterCase = 1; break;
            case 'w': LetterChar = "W"; LetterCase = 1; break;
            case 'x': LetterChar = "X"; LetterCase = 1; break;
            case 'y': LetterChar = "Y"; LetterCase = 1; break;
            case 'z': LetterChar = "Z"; LetterCase = 1; break;

            case 'A': LetterChar = "A"; LetterCase = 2; break;
            case 'B': LetterChar = "B"; LetterCase = 2; break;
            case 'C': LetterChar = "C"; LetterCase = 2; break;
            case 'D': LetterChar = "D"; LetterCase = 2; break;
            case 'E': LetterChar = "E"; LetterCase = 2; break;
            case 'F': LetterChar = "F"; LetterCase = 2; break;
            case 'G': LetterChar = "G"; LetterCase = 2; break;
            case 'H': LetterChar = "H"; LetterCase = 2; break;
            case 'I': LetterChar = "I"; LetterCase = 2; break;
            case 'J': LetterChar = "J"; LetterCase = 2; break;
            case 'K': LetterChar = "K"; LetterCase = 2; break;
            case 'L': LetterChar = "L"; LetterCase = 2; break;
            case 'M': LetterChar = "M"; LetterCase = 2; break;
            case 'N': LetterChar = "N"; LetterCase = 2; break;
            case 'O': LetterChar = "O"; LetterCase = 2; break;
            case 'P': LetterChar = "P"; LetterCase = 2; break;
            case 'Q': LetterChar = "Q"; LetterCase = 2; break;
            case 'R': LetterChar = "R"; LetterCase = 2; break;
            case 'S': LetterChar = "S"; LetterCase = 2; break;
            case 'T': LetterChar = "T"; LetterCase = 2; break;
            case 'U': LetterChar = "U"; LetterCase = 2; break;
            case 'V': LetterChar = "V"; LetterCase = 2; break;
            case 'W': LetterChar = "W"; LetterCase = 2; break;
            case 'X': LetterChar = "X"; LetterCase = 2; break;
            case 'Y': LetterChar = "Y"; LetterCase = 2; break;
            case 'Z': LetterChar = "Z"; LetterCase = 2; break;

            case '0': LetterChar = "ZERO";  LetterCase = 3; break;
            case '1': LetterChar = "ONE";   LetterCase = 3; break;
            case '2': LetterChar = "TWO";   LetterCase = 3; break;
            case '3': LetterChar = "THREE"; LetterCase = 3; break;
            case '4': LetterChar = "FOUR";  LetterCase = 3; break;
            case '5': LetterChar = "FIVE";  LetterCase = 3; break;
            case '6': LetterChar = "SIX";   LetterCase = 3; break;
            case '7': LetterChar = "SEVEN"; LetterCase = 3; break;
            case '8': LetterChar = "EIGHT"; LetterCase = 3; break;
            case '9': LetterChar = "NINE";  LetterCase = 3; break;

            default:
                LetterChar = String.fromCharCode(LetterNum_);
                LetterCase = 4;
                break;
        }


        if (LetterChar != "")
        {
            // *** Letters ***
            let LetterNum = LetterChars.indexOf(LetterChar);
            if (((LetterCase == 1) || (LetterCase == 2)) && (LetterNum >= 0))
            {
                let Search1 = [];
                switch (LetterCase)
                {
                    case 1:
                        Search1.push(" SMALL LETTER ");
                        Search1.push(" MODIFIER LETTER SMALL ");
                        Search1.push(" CYRILLIC SMALL ");
                        Search1.push(" GREEK SMALL ");
                        Search1.push(" SMALL CAPITAL ");
                        break;
                    case 2:
                        Search1.push(" CAPITAL LETTER ");
                        Search1.push(" MODIFIER LETTER CAPITAL ");
                        Search1.push(" CYRILLIC CAPITAL ");
                        Search1.push(" GREEK CAPITAL ");
                        break;
                }
                let Search2 = [];
                Search2.push(" TURNED @ ");
                Search2.push(" INVERTED @ ");
                Search2.push(" REVERSED @ ");
                Search2.push(" OPEN @ ");
                Search2.push(" CLOSED @ ");
                Search2.push(" SHORT @ ");
                Search2.push(" LONG @ ");
                Search2.push(" SCRIPT @ ");
                Search2.push(" BARRED @ ");
                Search2.push(" DOTTED @ ");
                for (let I = 0; I < Search1.length; I++)
                {
                    for (let II = 0; II < Search2.length; II++)
                    {
                        for (let LetterI = 0; LetterI < LetterNames[LetterNum].length; LetterI++)
                        {
                            Bucket.push([1, Search1[I], 1, Search2[II].replace("@", LetterNames[LetterNum][LetterI])]);
                        }
                    }
                }
                
                Search = [];
                let SearchCase = ""
                switch (LetterCase)
                {
                    case 1:
                        Search.push(" SMALL CAPITAL @ ");
                        SearchCase = "SMALL";
                        break;
                    case 2:
                        SearchCase = "CAPITAL";
                        break;
                }
                Search.push(" " + SearchCase + " LETTER @ ");
                Search.push(" MODIFIER LETTER " + SearchCase + " @ ");
                Search.push(" CYRILLIC " + SearchCase + " @ ");
                Search.push(" GREEK " + SearchCase + " @ ");

                Search.push(" DOUBLE-STRUCK " + SearchCase + " @ ");
                Search.push(" SCRIPT " + SearchCase + " @ ");
                Search.push(" BLACK-LETTER " + SearchCase + " @ ");
                Search.push(" FRAKTUR " + SearchCase + " @ ");
                Search.push(" BOLD " + SearchCase + " @ ");
                Search.push(" ITALIC " + SearchCase + " @ ");
                Search.push(" SANS-SERIF " + SearchCase + " @ ");
                Search.push(" MONOSPACE " + SearchCase + " @ ");
                for (let SearchI = 0; SearchI < Search.length; SearchI++)
                {
                    for (let LetterI = 0; LetterI < LetterNames[LetterNum].length; LetterI++)
                    {
                        Bucket.push([1, Search[SearchI].replace("@", LetterNames[LetterNum][LetterI])]);
                    }
                }
            }
            
            // *** Digits ***
            if (LetterCase == 3)
            {
                Bucket.push([1, " DIGIT " + LetterChar + " "]);
            }

            // *** Letter exceptions and special characters ***
            switch (LetterCase + LetterChar)
            {
                case "1A":
                    Bucket.push([3, 0x04D5, 3, 0xAA]);
                    break;
                case "1B":
                    Bucket.push([3, 0x03D0]);
                    break;
                case "1C":
                    Bucket.push([3, 0xA2]);
                    Bucket.push([3, 0x2104]); // Letterlike
                    break;
                case "1D":
                    Bucket.push([3, 0xF0, 3, 0x01F3, 3, 0x0238]);
                    Bucket.push([3, 0x01D6DB, 3, 0x01D715, 3, 0x01D74F, 3, 0x01D789, 3, 0x01D7C3, 3, 0x2202]); // Mathematical
                    break;
                case "1E":
                    Bucket.push([1, " LIGATURE ", 1, " ET "]);
                    Bucket.push([3, 0x03F5, 3, 0x03F6]);
                    Bucket.push([3, 0x2107, 3, 0x2108, 3, 0x212E]); // Letterlike
                    Bucket.push([3, 0x01D6DC, 3, 0x01D716, 3, 0x01D750, 3, 0x01D78A, 3, 0x01D7C4]); // Mathematical
                    break;
                case "1F":
                    Bucket.push([3, 0x83, 3, 0xFB00, 3, 0xFB01, 3, 0xFB02, 3, 0xFB03, 3, 0xFB04, 3, 0x02A9]);
                    Bucket.push([3, 0x214E]); // Letterlike
                    Bucket.push([3, 0x01D6DF, 3, 0x01D719, 3, 0x01D753, 3, 0x01D78D, 3, 0x01D7C7]); // Mathematical
                    break;
                case "1G":
                    Bucket.push([3, 0x0264]);
                    break;
                case "1H":
                    Bucket.push([4, 0x04A9]);
                    Bucket.push([3, 0x210E, 3, 0x210F]); // Letterlike
                    break;
                case "1I":
                    Bucket.push([3, 0x2139]); // Letterlike
                    break;
                case "1J":
                    Bucket.push([4, 0x01C8, 4, 0x01CB, 3, 0x03F3]);
                    break;
                case "1K":
                    Bucket.push([3, 0x03D7]);
                    Bucket.push([3, 0x01D6DE, 3, 0x01D718, 3, 0x01D752, 3, 0x01D78C, 3, 0x01D7C6]); // Mathematical
                    break;
                case "1L":
                    Bucket.push([3, 0x02AA, 3, 0x02AB]);
                    Bucket.push([3, 0x2114]); // Letterlike
                    break;
                case "1M":
                    Bucket.push([3, 0xB5]);
                    break;
                case "1O":
                    Bucket.push([3, 0xBA]);
                    Bucket.push([3, 0x2125, 3, 0x2126, 3, 0x2127]); // Letterlike
                    Bucket.push([3, 0x01D6E1, 3, 0x01D71B, 3, 0x01D755, 3, 0x01D78F, 3, 0x01D7C9]); // Mathematical
                    break;
                case "1Q":
                    Bucket.push([3, 0x0239]);
                    break;
                case "1R":
                    Bucket.push([3, 0x03F1, 3, 0x03FC]);
                    Bucket.push([3, 0x01D6E0, 3, 0x01D71A, 3, 0x01D754, 3, 0x01D78E, 3, 0x01D7C8]); // Mathematical
                    break;
                case "1S":
                    Bucket.push([3, 0x9A, 3, 0xFB05, 3, 0xFB06]);
                    Bucket.push([3, 0x01D6DD, 3, 0x01D717, 3, 0x01D751, 3, 0x01D78B, 3, 0x01D7C5]); // Mathematical
                    break;
                case "1V":
                    Bucket.push([3, 0x2123]); // Letterlike
                    break;
                case "1Z":
                    Bucket.push([3, 0x9E, 4, 0x01C5, 4, 0x01F2]);
                    break;

                case "2A":
                    Bucket.push([3, 0x04D4]);
                    Bucket.push([3, 0x212B]); // Letterlike
                    break;
                case "2C":
                    Bucket.push([3, 0xA9]);
                    Bucket.push([3, 0x2103]); // Letterlike
                    break;
                case "2D":
                    Bucket.push([3, 0xD0, 3, 0x01F1]);
                    Bucket.push([3, 0x01D6C1, 3, 0x01D6FB, 3, 0x01D735, 3, 0x01D76F, 3, 0x01D7A9, 3, 0x2207]); // Mathematical
                    break;
                case "2F":
                    Bucket.push([3, 0x2109, 3, 0x2132, 3, 0x213B]); // Letterlike
                    break;
                case "2H":
                    Bucket.push([4, 0x04A8]);
                    break;
                case "2I":
                    Bucket.push([3, 0x04C0]);
                    break;
                case "2K":
                    Bucket.push([3, 0x03D8]);
                    Bucket.push([3, 0x212A]); // Letterlike
                    break;
                case "2L":
                    Bucket.push([3, 0xA3]);
                    break;
                case "2N":
                    Bucket.push([3, 0x2116]); // Letterlike
                    break;
                case "2P":
                    Bucket.push([3, 0x2117]); // Letterlike
                    break;
                case "2Q":
                    Bucket.push([3, 0x024A]);
                    break;
                case "2R":
                    Bucket.push([3, 0xAE]);
                    Bucket.push([3, 0x211E, 3, 0x211F]); // Letterlike
                    break;
                case "2S":
                    Bucket.push([3, 0x8A]);
                    Bucket.push([3, 0x2140, 3, 0x2120]); // Letterlike
                    break;
                case "2T":
                    Bucket.push([3, 0x2121, 3, 0x2122]); // Letterlike
                    break;
                case "2Y":
                    Bucket.push([3, 0x9F, 3, 0xA5]);
                    break;
                case "2Z":
                    Bucket.push([3, 0x8E]);
                    break;

                case "4 ":
                    Bucket.push([1, " SPACE ", 2, " LETTER "]);
                    Bucket.push([3, 0x7F]);
                    break;
                case "4!":
                    Bucket.push([1, " EXCLAMATION ", 2, " LETTER ", 2, " QUESTION ", 2, " LESS ", 2, " GREATER "]);
                    Bucket.push([3, 0x01C3]);
                    break;
                case "4\"":
                    Bucket.push([1, " APOSTROPHE ", 1, " DOUBLE ", 2, " LETTER ", 2, " PRECEDED "]);
                    Bucket.push([1, " DOUBLE ", 1, " QUOTATION ", 2, " LETTER ", 2, " ANGLE "]);
                    Bucket.push([1, " MODIFIER LETTER ", 1, " DOUBLE "]);
                    Bucket.push([1, " HARD SIGN "]); // Cyrillic
                    Bucket.push([3, 0x84, 3, 0x93, 3, 0x94, 3, 0x02DD]);
                    break;
                case "4#":
                    Bucket.push([1, " NUMBER SIGN "]);
                    break;
                case "4$":
                    Bucket.push([1, " DOLLAR "]);
                    break;
                case "4%":
                    Bucket.push([1, " PERCENT "]);
                    break;
                case "4&":
                    Bucket.push([1, " AMPERSAND "]);
                    break;
                case "4\'":
                    Bucket.push([1, " ACUTE ACCENT ", 2, " LETTER ", 2, " DOUBLE "]);
                    Bucket.push([1, " MODIFIER LETTER ", 1, " ACUTE ACCENT ", 2, " DOUBLE "]);
                    Bucket.push([1, " APOSTROPHE ", 2, " LETTER ", 2, " DOUBLE ", 2, " PRECEDED "]);
                    Bucket.push([1, " SINGLE ", 1, " QUOTATION ", 2, " LETTER ", 2, " ANGLE "]);
                    Bucket.push([1, " SOFT SIGN "]); // Cyrillic
                    Bucket.push([1, " SEMISOFT SIGN "]); // Cyrillic
                    Bucket.push([3, 0x82, 3, 0x91, 3, 0x92, 3, 0x02B9, 3, 0x02BC]);
                    break;
                case "4(":
                    Bucket.push([1, " LEFT ",    1, " PARENTHESIS ", 2, " RIGHT ", 2, " CLOSING "]);
                    Bucket.push([1, " OPENING ", 1, " PARENTHESIS ", 2, " RIGHT ", 2, " CLOSING "]);
                    Bucket.push([1, " LEFT ",    1, " BRACKET ", 2, " RIGHT ", 2, " CLOSING ", 2, " SQUARE BRACKET ", 2, " CURLY BRACKET ", 2, " ANGLE BRACKET "]);
                    Bucket.push([1, " OPENING ", 1, " BRACKET ", 2, " RIGHT ", 2, " CLOSING ", 2, " SQUARE BRACKET ", 2, " CURLY BRACKET ", 2, " ANGLE BRACKET "]);
                    break;
                case "4)":
                    Bucket.push([1, " RIGHT ",   1, " PARENTHESIS ", 2, " LEFT ",  2, " OPENING "]);
                    Bucket.push([1, " CLOSING ", 1, " PARENTHESIS ", 2, " LEFT ",  2, " OPENING "]);
                    Bucket.push([1, " RIGHT ",   1, " BRACKET ", 2, " LEFT ",  2, " OPENING ", 2, " SQUARE BRACKET ", 2, " CURLY BRACKET ", 2, " ANGLE BRACKET "]);
                    Bucket.push([1, " CLOSING ", 1, " BRACKET ", 2, " LEFT ",  2, " OPENING ", 2, " SQUARE BRACKET ", 2, " CURLY BRACKET ", 2, " ANGLE BRACKET "]);
                    break;
                case "4*":
                    Bucket.push([1, " ASTERISK "]);
                    Bucket.push([1, " STAR "]);
                    Bucket.push([1, " MULTIPLICATION "]);
                    break;
                case "4+":
                    Bucket.push([1, " PLUS ",  2, " MINUS "]);
                    break;
                case "4,":
                    Bucket.push([1, " COMMA ",     2, " LETTER ", 2, " DIGIT ", 2, " QUOTATION ", 2, " PLUS ", 2, " MINUS "]);
                    Bucket.push([3, 0x02BB, 3, 0x02BD]);
                    break;
                case "4-":
                    Bucket.push([1, " MINUS ", 2, " PLUS "]);
                    Bucket.push([1, " HYPHEN "]);
                    Bucket.push([1, " DASH ", 2, " VERTICAL "]);
                    break;
                case "4.":
                    Bucket.push([1, " FULL STOP ", 2, " LETTER ", 2, " DIGIT ", 2, " NUMBER ", 2, " QUOTATION "]);
                    Bucket.push([1, " PERIOD ",    2, " LETTER ", 2, " DIGIT ", 2, " NUMBER ", 2, " QUOTATION "]);
                    break;
                case "4/":
                    Bucket.push([1, " SLASH ", 2, " LETTER ", 2, " BACKSLASH "]);
                    Bucket.push([1, " SOLIDUS ", 2, " LETTER ", 2, " REVERSE SOLIDUS "]);
                    Bucket.push([1, " DIVISION "]);
                    break;

                case "4:":
                    Bucket.push([1, " COLON "]);
                    break;
                case "4;":
                    Bucket.push([1, " SEMICOLON "]);
                    break;
                case "4<":
                    Bucket.push([1, " LEFT ",    1, " ANGLE BRACKET ", 2, " RIGHT ", 2, " CLOSING "]);
                    Bucket.push([1, " OPENING ", 1, " ANGLE BRACKET ", 2, " RIGHT ", 2, " CLOSING "]);
                    Bucket.push([1, " LESS-THAN ", 2, " GREATER-THAN ", 2, " BRACKET "]);
                    Bucket.push([3, 0x8B, 3, 0xAB, 3, 0x2039, 3, 0x02C2, 3, 0x02F1, 4, 0x2A9F]);
                    break;
                case "4=":
                    Bucket.push([1, " EQUALS SIGN ", 2, " PLUS ", 2, " MINUS "]);
                    break;
                case "4>":
                    Bucket.push([1, " RIGHT ",   1, " ANGLE BRACKET ", 2, " LEFT ",  2, " OPENING "]);
                    Bucket.push([1, " CLOSING ", 1, " ANGLE BRACKET ", 2, " LEFT ",  2, " OPENING "]);
                    Bucket.push([1, " GREATER-THAN ", 2, " LESS-THAN ", 2, " BRACKET "]);
                    Bucket.push([3, 0x9B, 3, 0xBB, 3, 0x203A, 3, 0x02C3, 3, 0x02F2, 4, 0x2AA0]);
                    break;
                case "4?":
                    Bucket.push([1, " QUESTION ", 2, " LETTER ", 2, " EXCLAMATION "]);
                    Bucket.push([3, 0x2426, 4, 0x2A7B, 4, 0x2A7C]);
                    break;
                case "4@":
                    Bucket.push([1, " COMMERCIAL AT "]);
                    break;

                case "4[":
                    Bucket.push([1, " LEFT ",    1, " SQUARE BRACKET ", 2, " RIGHT ", 2, " CLOSING "]);
                    Bucket.push([1, " OPENING ", 1, " SQUARE BRACKET ", 2, " RIGHT ", 2, " CLOSING "]);
                    break;
                case "4\\":
                    Bucket.push([1, " BACKSLASH ", 2, " LETTER "]);
                    Bucket.push([1, " REVERSE SOLIDUS ", 2, " LETTER "]);
                    Bucket.push([4, 0x01F10F]);
                    break;
                case "4]":
                    Bucket.push([1, " RIGHT ",   1, " SQUARE BRACKET ", 2, " LEFT ",  2, " OPENING "]);
                    Bucket.push([1, " CLOSING ", 1, " SQUARE BRACKET ", 2, " LEFT ",  2, " OPENING "]);
                    break;
                case "4^":
                    Bucket.push([1, " CIRCUMFLEX ACCENT ", 2, " PLUS ", 2, " MINUS "]);
                    Bucket.push([4, 0x2A36]);
                    break;
                case "4_":
                    Bucket.push([1, " UNDERSCORE "]);
                    Bucket.push([1, " LOW LINE "]);
                    break;
                case "4`":
                    Bucket.push([1, " GRAVE ACCENT ", 2, " LETTER ", 2, " DOUBLE "]);
                    Bucket.push([1, " MODIFIER LETTER ", 1, " GRAVE ACCENT ", 2, " DOUBLE "]);
                    break;

                case "4{":
                    Bucket.push([1, " LEFT ",    1, " CURLY BRACKET ", 2, " RIGHT ", 2, " CLOSING "]);
                    Bucket.push([1, " OPENING ", 1, " CURLY BRACKET ", 2, " RIGHT ", 2, " CLOSING "]);
                    break;
                case "4|":
                    Bucket.push([1, " VERTICAL LINE ", 2, " LETTER "]);
                    Bucket.push([1, " VERTICAL BAR ", 2, " LETTER "]);
                    Bucket.push([1, " BROKEN BAR ", 2, " LETTER "]);
                    Bucket.push([1, " DASH ", 1, " VERTICAL "]);
                    Bucket.push([3, 0x01C0, 3, 0x01C1, 3, 0x01C2, 3, 0x02C8, 3, 0x02CC]);
                    break;
                case "4}":
                    Bucket.push([1, " RIGHT ",   1, " CURLY BRACKET ", 2, " LEFT ",  2, " OPENING "]);
                    Bucket.push([1, " CLOSING ", 1, " CURLY BRACKET ", 2, " LEFT ",  2, " OPENING "]);
                    break;
                case "4~":
                    Bucket.push([1, " TILDE ", 2, " LETTER ", 2, " PLUS ", 2, " MINUS ", 2, " EQUALS "]);
                    Bucket.push([3, 0x98, 3, 0x02F7]);
                    break;
            }
        }
        AsciiCharConvBucket[LetterNum_] = Bucket;
    }
}

function GenerateAsciiFormulaView(Nr)
{
    const Bucket = AsciiCharConvBucket[Nr];
    document.getElementById("FormulaView").value = "";
    let CharSetList = "";
    for (let I = 0; I < AsciiCharDerivativies[Nr].length; I++)
    {
        if (I > 0)
        {
            CharSetList += "; ";
        }
        CharSetList += NumDecHexDisp(AsciiCharDerivativies[Nr][I]);
    }
    CharSetList = "{" + CharSetList + "}\n";
    let ListInclude = [];
    let ListExclude = [];
    for (let I = 0; I < Bucket.length; I++)
    {
        let BucketLen = 0;
        for (let II = 0; II < Bucket[I].length; II += 2)
        {
            switch (Bucket[I][II])
            {
                case 1:
                case 2:
                    if (BucketLen > 0)
                    {
                        document.getElementById("FormulaView").value += " ";
                    }
                    BucketLen++;
                    if (Bucket[I][II] == 1) document.getElementById("FormulaView").value += "+";
                    if (Bucket[I][II] == 2) document.getElementById("FormulaView").value += "-";
                    document.getElementById("FormulaView").value += ("[" + Bucket[I][II + 1] + "]");
                    break;
                case 3:
                    ListInclude.push(Bucket[I][II + 1]);
                    break;
                case 4:
                    ListExclude.push(Bucket[I][II + 1]);
                    break;
            }
        }
        if (BucketLen > 0)
        {
            document.getElementById("FormulaView").value += "\n";
        }
    }
    ListInclude.sort();
    ListExclude.sort();
    let ListIncludeTxt = "";
    let ListExcludeTxt = "";
    let TempBool;
    for (let I = 0; I < ListInclude.length; I++)
    {
        TempBool = false;
        if (AsciiCharDerivativiesIncl[Nr])
        {
            if (AsciiCharDerivativiesIncl[Nr].indexOf(ListInclude[I]) >= 0)
            {
                TempBool = true;
            }
        }
        if (TempBool)
        {
            ListIncludeTxt += ("+ " + NumDecHexDisp(ListInclude[I]) + " !\n");
        }
        else
        {
            ListIncludeTxt += ("+ " + NumDecHexDisp(ListInclude[I]) + "\n");
        }
    }
    for (let I = 0; I < ListExclude.length; I++)
    {
        TempBool = false;
        if (AsciiCharDerivativiesExcl[Nr])
        {
            if (AsciiCharDerivativiesExcl[Nr].indexOf(ListExclude[I]) >= 0)
            {
                TempBool = true;
            }
        }
        if (TempBool)
        {
            ListExcludeTxt += ("- " + NumDecHexDisp(ListExclude[I]) + " !\n");
        }
        else
        {
            ListExcludeTxt += ("- " + NumDecHexDisp(ListExclude[I]) + "\n");
        }
    }
    document.getElementById("FormulaView").value = CharSetList + ListIncludeTxt + ListExcludeTxt + document.getElementById("FormulaView").value;
}

function GenerateAsciiReplacement(Nr, Name1, Name2)
{
    if (Nr > 126)
    {
        let FindName = " " + Name1 + " | " + Name2 + " ";
        let ReplacementNumFound = 0;
        let ReplacementNumFoundX = 0;
        for (let ReplacementNum in AsciiCharConvBucket)
        {
            ReplacementNumFound = 0;
        
            let Bucket = AsciiCharConvBucket[ReplacementNum];
            let CharInclude = false;
            let CharExclude = false;
            for (let I = 0; I < Bucket.length; I++)
            {
                for (let II = 0; II < Bucket[I].length; II += 2)
                {
                    switch (Bucket[I][II])
                    {
                        case 3:
                            if (Bucket[I][II + 1] == Nr)
                            {
                                CharInclude = true;
                            }
                            break;
                        case 4:
                            if (Bucket[I][II + 1] == Nr)
                            {
                                CharExclude = true;
                            }
                            break;
                    }
                }
            }            
            
            for (let I = 0; I < Bucket.length; I++)
            {
                let Name1 = 0;
                let Name0 = 0;

                for (let II = 0; II < Bucket[I].length; II += 2)
                {
                    switch (Bucket[I][II])
                    {
                        case 1:
                            if (FindName.indexOf(Bucket[I][II + 1]) >= 0)
                            {
                                Name1++;
                            }
                            else
                            {
                                Name0++;
                            }
                            break;
                        case 2:
                            if (FindName.indexOf(Bucket[I][II + 1]) >= 0)
                            {
                                Name0++;
                            }
                            else
                            {
                                Name1++;
                            }
                            break;
                    }
                }

                if ((Name1 > 0) && (Name0 == 0))
                {
                    ReplacementNumFound = ReplacementNum;
                }
            }
            
            if (CharInclude || CharExclude)
            {
                if (CharInclude && CharExclude)
                {
                    alert(      NumDecHexDisp(ReplacementNum) + ": Include and exclude " + NumDecHexDisp(Nr) + " simultaneously");
                    console.log(NumDecHexDisp(ReplacementNum) + ": Include and exclude " + NumDecHexDisp(Nr) + " simultaneously");
                }
                else
                {
                    if (CharInclude)
                    {
                        if (ReplacementNumFound > 0)
                        {
                            AsciiCharDerivativiesIncl[ReplacementNum].push(Nr);
                            console.log(NumDecHexDisp(ReplacementNum) + ": + " + NumDecHexDisp(Nr) + " !");
                        }
                        ReplacementNumFound = ReplacementNum;
                    }
                    if (CharExclude)
                    {
                        if (ReplacementNumFound == 0)
                        {
                            AsciiCharDerivativiesExcl[ReplacementNum].push(Nr);
                            console.log(NumDecHexDisp(ReplacementNum) + ": - " + NumDecHexDisp(Nr) + " !");
                        }
                        ReplacementNumFound = 0;
                    }
                }
            }
            
            if (ReplacementNumFound > 0)
            {
                ReplacementNumFoundX = ReplacementNumFound;
                AsciiCharDerivativies[ReplacementNum].push(Nr);
            }
        }
        return IntToHex(ReplacementNumFoundX);
    }
    else
    {
        return IntToHex(0);
    }
}

