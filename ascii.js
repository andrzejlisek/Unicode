let AsciiCharList = [];
let AsciiCharMap = {};
let AsciiConvMap = {};
let AsciiCharMapPart = 0;
let AsciiCharDefault = 63;
let AsciiNonPrint = [0x09, 0x0A, 0x0C, 0x0D];

function AsciiConvert(MapOnly)
{
    var WriteBox = document.getElementById("WriteBox");

    let TxtI = document.getElementById("WriteBox").value;
    let TxtO = ""
    
    let BuildToConfirm = true;
    let BuildAnswer = false;
    
    // All standard ASCII characters
    let Chars = [];
    Chars[0] = " !\"#$%&\'()*+,-./";
    Chars[6] = "0123456789";
    Chars[1] = ":;<=>?@";
    Chars[5] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    Chars[2] = "[\\]^_`";
    Chars[4] = "abcdefghijklmnopqrstuvwxyz";
    Chars[3] = "{|}~";
    let CharsL = Chars.length;

    let Txt_ = TextToChars(TxtI);

    let TxtL = Txt_.length;
    for (let I = 0; I < TxtL; I++)
    {
        let N = Txt_[I];
        if (N <= 126)
        {
            TxtO = TxtO + NumToChar(N);
        }
        else
        {
            let N0 = MapOnly ? N : AsciiCharDefault;
            if (AsciiConvMap[N])
            {
                N0 = AsciiConvMap[N];
            }
            else
            {
                if (AsciiCharMapPart < CharsL)
                {
                    if (BuildToConfirm)
                    {
                        if (confirm("ANSII map is not fully built and this conversion may take a few minutes. Do you want to continue? If no, the conversion can be repeated. If the browser suggest to break script, do not break and wait until text is converted."))
                        {
                            BuildAnswer = true;
                        }
                        BuildToConfirm = false;
                    }
                    
                    // Create map for every character of specified part
                    if (BuildAnswer)
                    {
                        let Text_ = FindCharStateText;
                        let Mode_ = FindCharStateMode;
                        for (let I = 0; I < Chars[AsciiCharMapPart].length; I++)
                        {
                            document.getElementById("FormCharFind").value = Chars[AsciiCharMapPart][I];
                            FindChar(1);
                        }
                        document.getElementById("FormCharFind").value = Text_;
                        FindChar(Mode_);
                        
                        AsciiCharMapPart++;
                        I--;
                        N0 = -1;
                    }
                }
            }
            if (N0 >= 0)
            {
                TxtO = TxtO + NumToChar(N0);
            }
        }
    }

    // Test can be performed only if the full map is created
    if (AsciiCharMapPart == CharsL)
    {
        let ErrorMessage = "";
        
        // Test 1:
        // - Every array should consist of at least one element
        // - The first element should be the same as index number
        // - Every element other than first element should be outide from 32..126
        for (let I = 32; I <= 126; I++)
        {
            if (!AsciiCharMap[I])
            {
                ErrorMessage = ErrorMessage + "\n" + I + " array is incorrect";
            }
            else
            {
                if (AsciiCharMap[I].length < 3)
                {
                    ErrorMessage = ErrorMessage + "\n" + I + " array is blank";
                }
            }
        }
        if (ErrorMessage != "")
        {
            alert("Test 1 failed:" + ErrorMessage);
            return;
        }
        
        // Test 2:
        // - The element within array should not be repeated with other array
        for (let I1 = 32; I1 <= 126; I1++)
        {
            for (let I2 = 32; I2 <= 126; I2++)
            {
                if (I1 != I2)
                {
                    for (let II1 = 3; II1 < AsciiCharMap[I1].length; II1++)
                    {
                        for (let II2 = 3; II2 < AsciiCharMap[I2].length; II2++)
                        {
                            if (AsciiCharMap[I1][II1] == AsciiCharMap[I2][II2])
                            {
                                ErrorMessage = ErrorMessage + "\nElement " + AsciiCharMap[I1][II1] + "=0x" + CharNumToHex(AsciiCharMap[I1][II1]) + " is in array " + I1 + "=0x" + CharNumToHex(I1) + " " + AsciiCharMap[I1][0] + " and " + I2 + "=0x" + CharNumToHex(I2) + " " + AsciiCharMap[I2][0];
                            }
                        }
                    }
                }
            }
        }
        if (ErrorMessage != "")
        {
            alert("Test 2 failed:" + ErrorMessage);
            return;
        }
    }

    document.getElementById("WriteBox").value = TxtO;
    CurrentSaveWB();
}



function AsciiCharFindCreate(LetterNum_, Bucket)
{
    if (AsciiCharMap[LetterNum_])
    {
        Bucket.push(AsciiCharMap[LetterNum_]);
        return 1;
    }
    else
    {
        let LetterChar = "";
        let LetterCase = 0;
        let BucketNonStdPos = 0;

        // The ASCII character
        Bucket.push([CharNumToHex(LetterNum_)]);
        Bucket.push([3]);
        Bucket.push(1);

        if ((LetterNum_ >= 32) && (LetterNum_ <= 126))
        {
            switch (String.fromCharCode(LetterNum_))
            {
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

                case '0': LetterChar = "ZERO"; LetterCase = 3; break;
                case '1': LetterChar = "ONE"; LetterCase = 3; break;
                case '2': LetterChar = "TWO"; LetterCase = 3; break;
                case '3': LetterChar = "THREE"; LetterCase = 3; break;
                case '4': LetterChar = "FOUR"; LetterCase = 3; break;
                case '5': LetterChar = "FIVE"; LetterCase = 3; break;
                case '6': LetterChar = "SIX"; LetterCase = 3; break;
                case '7': LetterChar = "SEVEN"; LetterCase = 3; break;
                case '8': LetterChar = "EIGHT"; LetterCase = 3; break;
                case '9': LetterChar = "NINE"; LetterCase = 3; break;
                
                default:
                    LetterChar = String.fromCharCode(LetterNum_);
                    LetterCase = 4;
                    break;
            }
            
            if (LetterChar != "")
            {
                // Letters
                let LetterChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let LetterNum = LetterChars.indexOf(LetterChar);
                if (((LetterCase == 1) || (LetterCase == 2)) && (LetterNum >= 0))
                {
                    let LetterNames = [];
                    //                Latin
                    //                                     Cyrillic (partially)
                    //                                                          Greek
                    LetterNames.push(["A", "AE",           "YA", "IA",          "ALPHA"]);
                    LetterNames.push(["B",                 "BE",                "BETA"]);
                    LetterNames.push(["C",                 "TSE"]);
                    LetterNames.push(["D",                 "DE", "DJE",         "DELTA"]);
                    LetterNames.push(["E",                 "IE", "SCHWA",       "EPSILON", "ETA"]);
                    LetterNames.push(["F",                 "EF",                "PHI"]);
                    LetterNames.push(["G",                 "GHE", "GJE",        "GAMMA"]);
                    LetterNames.push(["H", "HENG",         "HA",                "CHI"]);
                    LetterNames.push(["I",                 "II", "YI",          "IOTA"]);
                    LetterNames.push(["J",                 "JE"]);
                    LetterNames.push(["K", "KRA",          "KA", "KJE",         "KAPPA"]);
                    LetterNames.push(["L",                 "EL",                "LAMBDA"]);
                    LetterNames.push(["M",                 "EM",                "MU"]);
                    LetterNames.push(["N", "ENG",          "EN",                "NU"]);
                    LetterNames.push(["O", "OE", "OU",     "IO",                "OMICRON", "OMEGA"]);
                    LetterNames.push(["P",                 "PE",                "PI", "PSI"]);
                    LetterNames.push(["Q"]);
                    LetterNames.push(["R",                 "ER",                "RHO"]);
                    LetterNames.push(["S", "ESH",          "ES",                "SIGMA"]);
                    LetterNames.push(["T",                 "TE",                "THETA", "TAU"]);
                    LetterNames.push(["U",                 "YU", "IU"]);
                    LetterNames.push(["V",                 "VE"]);
                    LetterNames.push(["W"]);
                    LetterNames.push(["X",                                      "XI"]);
                    LetterNames.push(["Y",                 "YERU", "YERI",      "UPSILON"]);
                    LetterNames.push(["Z", "EZH", "YOGH",  "ZHE", "ZE", "DZE",  "ZETA"]);
                    let Search0_1 = "???";
                    let Search0_2 = "???";
                    let Search = ["TURNED", "INVERTED", "REVERSED", "DOTLESS", "OPEN", "CLOSED", "SHORT", "LONG", "SCRIPT", "BASHKIR", "STRAIGHT", "BARRED", "AFRICAN", "ABKHASIAN"];
                    switch (LetterCase)
                    {
                        case 1:
                            Search0_1 = [" SMALL LETTER ", " SMALL CAPITAL ", " MODIFIER LETTER SMALL "];
                            Search0_2 = ["LETTER", "CAPITAL", "SMALL"];
                            break;
                        case 2:
                            Search0_1 = [" CAPITAL LETTER "];
                            Search0_2 = ["LETTER"];
                            break;
                    }

                    
                    for (let II = 0; II < Search0_1.length; II++)
                    {
                        Search.push(Search0_2[II]);
                        for (let SearchI = 0; SearchI < Search.length; SearchI++)
                        {
                            for (let LetterI = 0; LetterI < LetterNames[LetterNum].length; LetterI++)
                            {
                                Bucket.push([Search0_1[II], " " + Search[SearchI] + " " + LetterNames[LetterNum][LetterI] + " "]);
                                Bucket.push([1, 1]);
                                Bucket.push(2);
                            }
                        }
                        Search.pop();
                    }
                }

                BucketNonStdPos = Bucket.length;
                
                // Digits
                if (LetterCase == 3)
                {
                    Bucket.push([" DIGIT " + LetterChar + " "]);
                    Bucket.push([1]);
                    Bucket.push(1);
                }

                // Letter exceptions and special characters
                switch (LetterCase + LetterChar)
                {
                    case "1A":
                        Bucket.push(["04D5", "AA"]);
                        Bucket.push([3, 3]);
                        Bucket.push(2);
                        break;
                    case "1C":
                        Bucket.push(["A2"]);
                        Bucket.push([3]);
                        Bucket.push(1);
                        break;
                    case "1D":
                        Bucket.push(["2202", "01C4", "01C5", "01C6", "01F1", "01F2", "01F3", "0238"]);
                        Bucket.push([3, 4, 4, 3, 4, 4, 3, 3]);
                        Bucket.push(8);
                        break;
                    case "1E":
                        Bucket.push([" LIGATURE ", " ET "]);
                        Bucket.push([1, 1]);
                        Bucket.push(2);
                        break;
                    case "1F":
                        Bucket.push(["83", "FB00", "FB01", "FB02", "FB03", "FB04", "02A9"]);
                        Bucket.push([3, 3, 3, 3, 3, 3, 3]);
                        Bucket.push(7);
                        break;
                    case "1G":
                        Bucket.push(["0264"]);
                        Bucket.push([3]);
                        Bucket.push(1);
                        break;
                    case "1H":
                        Bucket.push(["210E", "210F", "04A9"]);
                        Bucket.push([3, 3, 4]);
                        Bucket.push(3);
                        break;
                    case "1J":
                        Bucket.push(["01C7", "01C8", "01C9", "01CA", "01CB", "01CC"]);
                        Bucket.push([4, 4, 4, 4, 4, 4]);
                        Bucket.push(6);
                        break;
                    case "1L":
                        Bucket.push(["01C7", "01C8", "01C9", "02AA", "02AB"]);
                        Bucket.push([4, 4, 3, 3, 3]);
                        Bucket.push(5);
                        break;
                    case "1M":
                        Bucket.push(["FE58", "B5"]);
                        Bucket.push([4, 3]);
                        Bucket.push(2);
                        break;
                    case "1N":
                        Bucket.push(["01CA", "01CB", "01CC"]);
                        Bucket.push([4, 4, 3]);
                        Bucket.push(3);
                        break;
                    case "1O":
                        Bucket.push(["BA"]);
                        Bucket.push([3]);
                        Bucket.push(1);
                        break;
                    case "1Q":
                        Bucket.push(["0239"]);
                        Bucket.push([3]);
                        Bucket.push(1);
                        break;
                    case "1S":
                        Bucket.push(["9A", "FB05", "FB06", "03C2"]);
                        Bucket.push([3, 3, 3, 3]);
                        Bucket.push(4);
                        break;
                    case "1Z":
                        Bucket.push(["9E", "01C4", "01C5", "01C6", "01F1", "01F2", "01F3"]);
                        Bucket.push([3, 4, 4, 4, 4, 4, 4]);
                        Bucket.push(7);
                        break;
                    case "2A":
                        Bucket.push(["04D4"]);
                        Bucket.push([3]);
                        Bucket.push(1);
                        break;
                    case "2C":
                        Bucket.push(["A9"]);
                        Bucket.push([3]);
                        Bucket.push(1);
                        break;
                    case "2D":
                        Bucket.push(["01C4", "01C5", "01C6", "01F1", "01F2", "01F3"]);
                        Bucket.push([3, 3, 4, 3, 3, 4]);
                        Bucket.push(6);
                        break;
                    case "2H":
                        Bucket.push(["04A8"]);
                        Bucket.push([4]);
                        Bucket.push(1);
                        break;
                    case "2J":
                        Bucket.push(["01C7", "01C8", "01C9", "01CA", "01CB", "01CC"]);
                        Bucket.push([4, 4, 4, 4, 4, 4]);
                        Bucket.push(6);
                        break;
                    case "2L":
                        Bucket.push(["01C7", "01C8", "01C9", "A3"]);
                        Bucket.push([3, 3, 4, 3]);
                        Bucket.push(4);
                        break;
                    case "2N":
                        Bucket.push(["01CA", "01CB", "01CC"]);
                        Bucket.push([3, 3, 4]);
                        Bucket.push(3);
                        break;
                    case "2Q":
                        Bucket.push(["024A"]);
                        Bucket.push([3]);
                        Bucket.push(1);
                        break;
                    case "2R":
                        Bucket.push(["AE"]);
                        Bucket.push([3]);
                        Bucket.push(1);
                        break;
                    case "2S":
                        Bucket.push(["8A"]);
                        Bucket.push([3]);
                        Bucket.push(1);
                        break;
                    case "2Y":
                        Bucket.push(["9F", "A5"]);
                        Bucket.push([3, 3]);
                        Bucket.push(2);
                        break;
                    case "2Z":
                        Bucket.push(["8E", "01C4", "01C5", "01C6", "01F1", "01F2", "01F3"]);
                        Bucket.push([3, 4, 4, 4, 4, 4, 4]);
                        Bucket.push(7);
                        break;
                    case "4`":
                        Bucket.push([" LETTER ", " GRAVE ACCENT ", " DOUBLE "]);
                        Bucket.push([2, 1, 2]);
                        Bucket.push(3);
                        Bucket.push([" MODIFIER LETTER ", " GRAVE ACCENT ", " DOUBLE "]);
                        Bucket.push([1, 1, 2]);
                        Bucket.push(3);
                        break;
                    case "4\'":
                        Bucket.push([" LETTER ", " ACUTE ACCENT ", " DOUBLE "]);
                        Bucket.push([2, 1, 2]);
                        Bucket.push(3);
                        Bucket.push([" MODIFIER LETTER ", " ACUTE ACCENT ", " DOUBLE "]);
                        Bucket.push([1, 1, 2]);
                        Bucket.push(3);
                        Bucket.push([" LETTER ", " APOSTROPHE ", " DOUBLE ", " PRECEDED "]);
                        Bucket.push([2, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" LETTER ", " SINGLE ", " QUOTATION ", " ANGLE "]);
                        Bucket.push([2, 1, 1, 2]);
                        Bucket.push(4);
                        Bucket.push(["82", "91", "92", "02B9", "02BC"]);
                        Bucket.push([3, 3, 3, 3, 3]);
                        Bucket.push(5);
                        break;
                    case "4\"":
                        Bucket.push([" LETTER ", " APOSTROPHE ", " DOUBLE ", " PRECEDED "]);
                        Bucket.push([2, 1, 1, 2]);
                        Bucket.push(4);
                        Bucket.push([" LETTER ", " DOUBLE ", " QUOTATION ", " ANGLE "]);
                        Bucket.push([2, 1, 1, 2]);
                        Bucket.push(4);
                        Bucket.push([" MODIFIER LETTER ", " DOUBLE "]);
                        Bucket.push([1, 1]);
                        Bucket.push(2);
                        Bucket.push(["84", "93", "94", "02DD"]);
                        Bucket.push([3, 3, 3, 3]);
                        Bucket.push(4);
                        break;
                    case "4/":
                        Bucket.push([" LETTER ", " SLASH ", " BACKSLASH "]);
                        Bucket.push([2, 1, 2]);
                        Bucket.push(3);
                        Bucket.push([" LETTER ", " SOLIDUS ", " REVERSE SOLIDUS "]);
                        Bucket.push([2, 1, 2]);
                        Bucket.push(3);
                        break;
                    case "4\\":
                        Bucket.push([" LETTER ", " BACKSLASH ", "01F10F"]);
                        Bucket.push([2, 1, 4]);
                        Bucket.push(3);
                        Bucket.push([" LETTER ", " REVERSE SOLIDUS "]);
                        Bucket.push([2, 1]);
                        Bucket.push(2);
                        break;
                    case "4~":
                        Bucket.push([" LETTER ", " TILDE ", " PLUS ", " MINUS ", " EQUALS ", "98", "02F7"]);
                        Bucket.push([2, 1, 2, 2, 2, 3, 3]);
                        Bucket.push(7);
                        break;
                    case "4!":
                        Bucket.push([" LETTER ", " EXCLAMATION ", " QUESTION ", " LESS ", " GREATER ", "01C3"]);
                        Bucket.push([2, 1, 2, 2, 2, 3]);
                        Bucket.push(6);
                        break;
                    case "4?":
                        Bucket.push(["2426", "2A7B", "2A7C", " LETTER ", " EXCLAMATION ", " QUESTION "]);
                        Bucket.push([3, 4, 4, 2, 2, 1]);
                        Bucket.push(6);
                        break;
                    case "4 ":
                        Bucket.push([" LETTER ", " SPACE ", "7F"]);
                        Bucket.push([2, 1, 3]);
                        Bucket.push(3);
                        break;
                    case "4(":
                        Bucket.push([" LEFT ",    " PARENTHESIS ", " RIGHT ", " CLOSING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" OPENING ", " PARENTHESIS ", " RIGHT ", " CLOSING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" LEFT ",    " BRACKET ", " RIGHT ", " CLOSING ", " SQUARE BRACKET ", " CURLY BRACKET ", " ANGLE BRACKET "]);
                        Bucket.push([1, 1, 2, 2, 2, 2, 2]);
                        Bucket.push(7);
                        Bucket.push([" OPENING ", " BRACKET ", " RIGHT ", " CLOSING ", " SQUARE BRACKET ", " CURLY BRACKET ", " ANGLE BRACKET "]);
                        Bucket.push([1, 1, 2, 2, 2, 2, 2]);
                        Bucket.push(7);
                        break;
                    case "4)":
                        Bucket.push([" RIGHT ",   " PARENTHESIS ", " LEFT ", " OPENING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" CLOSING ", " PARENTHESIS ", " LEFT ", " OPENING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" RIGHT ",   " BRACKET ", " LEFT ", " OPENING ", " SQUARE BRACKET ", " CURLY BRACKET ", " ANGLE BRACKET "]);
                        Bucket.push([1, 1, 2, 2, 2, 2, 2]);
                        Bucket.push(7);
                        Bucket.push([" CLOSING ", " BRACKET ", " LEFT ", " OPENING ", " SQUARE BRACKET ", " CURLY BRACKET ", " ANGLE BRACKET "]);
                        Bucket.push([1, 1, 2, 2, 2, 2, 2]);
                        Bucket.push(7);
                        break;
                    case "4[":
                        Bucket.push([" LEFT ",    " SQUARE BRACKET ", " RIGHT ", " CLOSING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" OPENING ", " SQUARE BRACKET ", " RIGHT ", " CLOSING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        break;
                    case "4]":
                        Bucket.push([" RIGHT ",   " SQUARE BRACKET ", " LEFT ", " OPENING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" CLOSING ", " SQUARE BRACKET ", " LEFT ", " OPENING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        break;
                    case "4{":
                        Bucket.push([" LEFT ",    " CURLY BRACKET ", " RIGHT ", " CLOSING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" OPENING ", " CURLY BRACKET ", " RIGHT ", " CLOSING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        break;
                    case "4}":
                        Bucket.push([" RIGHT ",   " CURLY BRACKET ", " LEFT ", " OPENING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" CLOSING ", " CURLY BRACKET ", " LEFT ", " OPENING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        break;
                    case "4<":
                        Bucket.push([" LEFT ",    " ANGLE BRACKET ", " RIGHT ", " CLOSING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" OPENING ", " ANGLE BRACKET ", " RIGHT ", " CLOSING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push(["8B", "2039", "02C2", "2A9F", "02F1", " LESS-THAN ", " GREATER-THAN ", " BRACKET "]);
                        Bucket.push([3, 3, 3, 4, 3, 1, 2, 2]);
                        Bucket.push(8);
                        break;
                    case "4>":
                        Bucket.push([" RIGHT ",   " ANGLE BRACKET ", " LEFT ",  " OPENING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push([" CLOSING ", " ANGLE BRACKET ", " LEFT ",  " OPENING "]);
                        Bucket.push([1, 1, 2, 2]);
                        Bucket.push(4);
                        Bucket.push(["9B", "203A", "02C3", "2AA0", "02F2", " GREATER-THAN ", " LESS-THAN ", " BRACKET "]);
                        Bucket.push([3, 3, 3, 4, 3, 1, 2, 2]);
                        Bucket.push(8);
                        break;
                    case "4@":
                        Bucket.push([" COMMERCIAL AT "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        break;
                    case "4#":
                        Bucket.push([" NUMBER SIGN "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        break;
                    case "4$":
                        Bucket.push([" DOLLAR "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        break;
                    case "4%":
                        Bucket.push([" PERCENT "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        break;
                    case "4^":
                        Bucket.push([" CIRCUMFLEX ACCENT ", " PLUS ", " MINUS "]);
                        Bucket.push([1, 2, 2]);
                        Bucket.push(3);
                        break;
                    case "4&":
                        Bucket.push([" AMPERSAND "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        break;
                    case "4*":
                        Bucket.push([" ASTERISK "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        Bucket.push([" STAR "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        break;
                    case "4+":
                        Bucket.push([" PLUS ", " MINUS ", "02D6"]);
                        Bucket.push([1, 2, 3]);
                        Bucket.push(3);
                        break;
                    case "4-":
                        Bucket.push([" MINUS ", " PLUS ", "02D7"]);
                        Bucket.push([1, 2, 3]);
                        Bucket.push(3);
                        Bucket.push([" HYPHEN "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        Bucket.push([" DASH ", " VERTICAL "]);
                        Bucket.push([1, 2]);
                        Bucket.push(2);
                        break;
                    case "4|":
                        Bucket.push([" LETTER ", " VERTICAL LINE "]);
                        Bucket.push([2, 1]);
                        Bucket.push(2);
                        Bucket.push([" LETTER ", " VERTICAL BAR "]);
                        Bucket.push([2, 1]);
                        Bucket.push(2);
                        Bucket.push([" LETTER ", " BROKEN BAR "]);
                        Bucket.push([2, 1]);
                        Bucket.push(2);
                        Bucket.push([" DASH ", " VERTICAL ", "01C0", "01C1", "01C2", "02C8", "02CC"]);
                        Bucket.push([1, 1, 3, 3, 3, 3, 3]);
                        Bucket.push(7);
                        break;
                    case "4_":
                        Bucket.push([" UNDERSCORE "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        Bucket.push([" LOW LINE "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        break;
                    case "4=":
                        Bucket.push([" EQUALS SIGN ", " PLUS ", " MINUS "]);
                        Bucket.push([1, 2, 2]);
                        Bucket.push(3);
                        break;
                    case "4;":
                        Bucket.push([" SEMICOLON "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        break;
                    case "4:":
                        Bucket.push([" COLON "]);
                        Bucket.push([1]);
                        Bucket.push(1);
                        break;
                    case "4,":
                        Bucket.push([" COMMA ",     " LETTER ", " DIGIT ", " QUOTATION ", " PLUS ", " MINUS ", "02BB", "02BD"]);
                        Bucket.push([1, 2, 2, 2, 2, 2, 3, 3]);
                        Bucket.push(8);
                        break;
                    case "4.":
                        Bucket.push([" FULL STOP ", " LETTER ", " DIGIT ", " NUMBER ", " QUOTATION "]);
                        Bucket.push([1, 2, 2, 2, 2]);
                        Bucket.push(5);
                        Bucket.push([" PERIOD ",    " LETTER ", " DIGIT ", " NUMBER ", " QUOTATION "]);
                        Bucket.push([1, 2, 2, 2, 2]);
                        Bucket.push(5);
                        break;
                }
            }
        }
        
        // Test bucket consistency
        let BucketError = "";
        for (let BucketI = 0; BucketI < Bucket.length; BucketI += 3)
        {
            let N0 = Bucket[BucketI + 0].length;
            let N1 = Bucket[BucketI + 1].length;
            let N2 = Bucket[BucketI + 2];
            if ((N0 != N1) || (N0 != N2))
            {
                BucketError = BucketError + "\n" + (BucketI / 3) + " - values not equal " + N0 + "," + N1 + "," + N2;
            }
            else
            {
                for (let BucketII = 0; BucketII < N2; BucketII++)
                {
                    let StrTemp = Bucket[BucketI + 0][BucketII];
                    switch (Bucket[BucketI + 1][BucketII])
                    {
                        case 1:
                        case 2:
                            if (StrTemp.length < 2)
                            {
                                BucketError = BucketError + "\n" + (BucketI / 3) + " - incorrect space surround [1] " + StrTemp;
                            }
                            else
                            {
                                if (StrTemp.length != (StrTemp.trim().length + 2))
                                {
                                    BucketError = BucketError + "\n" + (BucketI / 3) + " - incorrect space surround [2] " + StrTemp;
                                }
                                if (StrTemp.charAt(0) != " ")
                                {
                                    BucketError = BucketError + "\n" + (BucketI / 3) + " - incorrect space surround [3] " + StrTemp;
                                }
                                if (StrTemp.charAt(StrTemp.length - 1) != " ")
                                {
                                    BucketError = BucketError + "\n" + (BucketI / 3) + " - incorrect space surround [4] " + StrTemp;
                                }
                                if (StrTemp.indexOf("  ") >= 0)
                                {
                                    BucketError = BucketError + "\n" + (BucketI / 3) + " - incorrect space surround [5] " + StrTemp;
                                }
                            }
                            break;
                        case 3:
                        case 4:
                            if ((StrTemp.length != 2) && (StrTemp.length != 4) && (StrTemp.length != 6))
                            {
                                BucketError = BucketError + "\n" + (BucketI / 3) + " - incorrect hex number [1] " + StrTemp;
                            }
                            else
                            {
                                for (let II = 0; II < StrTemp.length; II++)
                                {
                                    if ("0123456789ABCDEF".indexOf(StrTemp.charAt(II)) < 0)
                                    {
                                        BucketError = BucketError + "\n" + (BucketI / 3) + " - incorrect hex number [2] " + StrTemp;
                                    }
                                }
                            }
                            break;
                        default:
                            BucketError = BucketError + "\n" + (BucketI / 3) + " - incorrect element type " + Bucket[BucketI + 1][BucketII];
                            break;
                    }
                }
            }
        }
        if (BucketError != "")
        {
            alert("Bucket error in " + LetterNum_ + " " + String.fromCharCode(LetterNum_) + BucketError);
        }
        
        // Display bucket information
        if (false)
        {
            let BucketInclude = [];
            let BucketExclude = [];
            let BucketVariants = [];
            for (let BucketI = BucketNonStdPos; BucketI < Bucket.length; BucketI += 3)
            {
                let VariantInclude = [];
                let VariantExclude = [];
                for (let BucketII = 0; BucketII < Bucket[BucketI + 2]; BucketII++)
                {
                    switch (Bucket[BucketI + 1][BucketII])
                    {
                        case 1:
                            VariantInclude.push(Bucket[BucketI + 0][BucketII]);
                            break;
                        case 2:
                            VariantExclude.push(Bucket[BucketI + 0][BucketII]);
                            break;
                        case 3:
                            BucketInclude.push(Bucket[BucketI + 0][BucketII]);
                            break;
                        case 4:
                            BucketExclude.push(Bucket[BucketI + 0][BucketII]);
                            break;
                    }
                }
                VariantInclude.sort();
                VariantExclude.sort();
                BucketVariants.push(VariantInclude);
                BucketVariants.push(VariantExclude);
            }
            BucketInclude.sort(HexCompare);
            BucketExclude.sort(HexCompare);

            let CharPrint = String.fromCharCode(LetterNum_);

            if (BucketInclude.length > 0)
            {
                console.log(CharPrint + " Number includes: " + BucketInclude.join(", "));
            }
            if (BucketExclude.length > 0)
            {
                console.log(CharPrint + " Number excludes: " + BucketExclude.join(", "));
            }
            
            let VariantI = 1;
            for (let I = 0; I < BucketVariants.length; I += 2)
            {
                let VIn = (BucketVariants[I + 0].length > 0) ? ("\"" + BucketVariants[I + 0].join("\", \"") + "\"") : "";
                let VEx = (BucketVariants[I + 1].length > 0) ? ("\"" + BucketVariants[I + 1].join("\", \"") + "\"") : "";
                if ((VIn != "") || (VEx != ""))
                {
                    if (VIn != "")
                    {
                        console.log(CharPrint + " Variant " + VariantI + " name includes: " + VIn);
                    }
                    if (VEx != "")
                    {
                        console.log(CharPrint + " Variant " + VariantI + " name excludes: " + VEx);
                    }
                    VariantI++;
                }
            }
        }
        
        return 2;
    }
}

function AsciiCharMapCreate()
{
    let CharNo = AsciiCharList[1];
    
    if (CharNo < 32) return;
    if (CharNo > 126) return;

    let ErrorMessage = "";

    AsciiCharMap[CharNo] = [];
    for (let I = 0; I < AsciiCharList.length; I++)
    {
        AsciiCharMap[CharNo].push(AsciiCharList[I]);
        if (AsciiConvMap[AsciiCharList[I]])
        {
            if (AsciiConvMap[AsciiCharList[I]] != CharNo)
            {
                let I0 = AsciiCharList[I];
                let I1 = AsciiConvMap[AsciiCharList[I]];
                let I2 = CharNo;
                ErrorMessage = ErrorMessage + "\nElement " + I0 + "=0x" + CharNumToHex(I0) + " is in array " + I1 + "=0x" + CharNumToHex(I1) + " " + AsciiCharMap[I1][0] + " and " + I2 + "=0x" + CharNumToHex(I2) + " " + AsciiCharMap[I2][0];
            }
        }
        AsciiConvMap[AsciiCharList[I]] = CharNo;
    }
    
    if (AsciiCharMap[CharNo][2] != CharNo)
    {
        ErrorMessage = ErrorMessage + "\n" + I + " array has first element other than index";
    }
    else
    {
        let CharNo_ = CharNo;
        if (!AsciiCharMap[CharNo])
        {
            ErrorMessage = ErrorMessage + "\n" + CharNo + " array is incorrect";
        }
        else
        {
            if (AsciiCharMap[CharNo].length < 3)
            {
                ErrorMessage = ErrorMessage + "\n" + CharNo + " array is blank";
            }
            else
            {
                for (let II = 3; II < AsciiCharMap[CharNo].length; II++)
                {
                    if (AsciiCharMap[CharNo][II] <= CharNo_)
                    {
                        ErrorMessage = ErrorMessage + "\n" + CharNo + " array has the inordered element " + AsciiCharMap[CharNo][II];
                    }
                    if ((AsciiCharMap[CharNo][II] >= 32) && (AsciiCharMap[CharNo][II] <= 126))
                    {
                        ErrorMessage = ErrorMessage + "\n" + CharNo + " array has the element " + AsciiCharMap[CharNo][II];
                    }
                    CharNo_ = AsciiCharMap[CharNo][II];
                }
            }
        }
    }
    
    if (ErrorMessage != "")
    {
        AsciiCharMap[CharNo] = [];
        alert("Test failed:" + ErrorMessage);
    }
    let CharDisp = AsciiCharMap[CharNo][0];
    switch (CharDisp)
    {
        case "\"":
        case "\'":
        case "\\":
            CharDisp = "\\" + CharDisp;
            break;
    }
    let AsciiCharMapInfo = "derivative[\'" + CharDisp + "\'] = {";
    if (AsciiCharMap[CharNo].length > 0)
    {
        AsciiCharMapInfo += "0x";
        AsciiCharMapInfo += CharNumToHex(AsciiCharMap[CharNo][2]);
        for (let I = 3; I < AsciiCharMap[CharNo].length; I++)
        {
            AsciiCharMapInfo += ", 0x";
            AsciiCharMapInfo += CharNumToHex(AsciiCharMap[CharNo][I]);
        }
    }
    AsciiCharMapInfo += "};";
    console.log(AsciiCharMapInfo);
}

