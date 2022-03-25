// Change number to decimal code
function NumToDec(N)
{
    return "" + N + "";
}

// Change number to hexadecimal code
function NumToHex(N)
{
    if (N < 0)
    {
        var N_ = Math.floor((0 - N) / 256);
        if (N_ > 0)
        {
            return NumToHex(N_) + "__";
        }
        else
        {
            return "__";
        }
    }

    var X = N.toString(16).toUpperCase();
    if (X.length == 0)
    {
        X = "00";
    }
    if ((X.length == 1) || (X.length == 3) || (X.length == 5))
    {
        X = '0' + X;
    }
    return X;
}

// Change number to character
function NumToChar(T)
{
    if ((T <= 0xD7FF) || ((T >= 0xE000) && (T <= 0xFFFF)))
    {
        return String.fromCharCode(T);
    }
    else
    {
        T = T - 65536;
        var V1 = T >> 10;
        var V2 = T & 1023;
        return String.fromCharCode(V1 + 0xD800, V2 + 0xDC00);
    }
}

// Get code of specified type for specified char
function GetCharCode(Char, Type)
{
    var S = "&nbsp;";
    var N1 = -1;
    var N2 = -1;
    var N3 = -1;
    var N4 = -1;
    var N5 = -1;
    var N6 = -1;
    var N0 = "";
    switch (Type)
    {
        case 0: // Hex
            return NumToHex(Char);
        case 1: // Dec
            return NumToDec(Char);
        case 2: // UTF-8
            {
                if ((Char >= 0x00) && (Char <= 0x7F))
                {
                    N1 = ((Char) & 127);
                    return NumToHex(N1);
                }
                if ((Char >= 0x80) && (Char <= 0x7FF))
                {
                    N1 = ((Char >> 6) & 31) + 0xC0;
                    N2 = ((Char) & 63) + 0x80;
                    return NumToHex(N1) + S + NumToHex(N2);
                }
                if ((Char >= 0x800) && (Char <= 0xFFFF))
                {
                    N1 = ((Char >> 12) & 15) + 0xE0;
                    N2 = ((Char >> 6) & 63) + 0x80;
                    N3 = ((Char) & 63) + 0x80;
                    return NumToHex(N1) + S + NumToHex(N2) + S + NumToHex(N3);
                }
                if ((Char >= 0x10000) && (Char <= 0x1FFFFF))
                {
                    N1 = ((Char >> 18) & 7) + 0xF0;
                    N2 = ((Char >> 12) & 63) + 0x80;
                    N3 = ((Char >> 6) & 63) + 0x80;
                    N4 = ((Char) & 63) + 0x80;
                    return NumToHex(N1) + S + NumToHex(N2) + S + NumToHex(N3) + S + NumToHex(N4);
                }
                if ((Char >= 0x200000) && (Char <= 0x3FFFFFF))
                {
                    N1 = ((Char >> 24) & 3) + 0xF8;
                    N2 = ((Char >> 18) & 63) + 0x80;
                    N3 = ((Char >> 12) & 63) + 0x80;
                    N4 = ((Char >> 6) & 63) + 0x80;
                    N5 = ((Char) & 63) + 0x80;
                    return NumToHex(N1) + S + NumToHex(N2) + S + NumToHex(N3) + S + NumToHex(N4) + S + NumToHex(N5);
                }
                if ((Char >= 0x4000000) && (Char <= 0x7FFFFFFF))
                {
                    N1 = ((Char >> 30) & 1) + 0xFC;
                    N2 = ((Char >> 24) & 63) + 0x80;
                    N2 = ((Char >> 18) & 63) + 0x80;
                    N3 = ((Char >> 12) & 63) + 0x80;
                    N4 = ((Char >> 6) & 63) + 0x80;
                    N5 = ((Char) & 63) + 0x80;
                    return NumToHex(N1) + S + NumToHex(N2) + S + NumToHex(N3) + S + NumToHex(N4) + S + NumToHex(N5) + S + NumToHex(N6);
                }
                return "?";
            }
        case 3: // UTF-16LE
        case 4: // UTF-16BE
            {
                if (Char > 0x10FFFF)
                {
                    return "?";
                }
                if (((Char >= 0x0000) && (Char <= 0xD7FF)) || ((Char >= 0xE000) && (Char <= 0xFFFF)))
                {
                    N1 = (Char) & 255;
                    N2 = (Char >> 8) & 255;
                    if (Type == 3)
                    {
                        return NumToHex(N1) + S + NumToHex(N2);
                    }
                    else
                    {
                        return NumToHex(N2) + S + NumToHex(N1);
                    }
                }
                else
                {
                    if (Char >= 0x10000)
                    {
                        N0 = Char - 0x10000;
                        N5 = ((N0 >> 10) & 1023) + 0xD800;
                        N6 = ((N0) & 1023) + 0xDC00;
                        N1 = (N5) & 255;
                        N2 = (N5 >> 8) & 255;
                        N3 = (N6) & 255;
                        N4 = (N6 >> 8) & 255;
                        
                        if (Type == 3)
                        {
                            return NumToHex(N1) + S + NumToHex(N2) + S + NumToHex(N3) + S + NumToHex(N4);
                        }
                        else
                        {
                            return NumToHex(N2) + S + NumToHex(N1) + S + NumToHex(N4) + S + NumToHex(N3);
                        }
                    }
                    else
                    {
                        return "?";
                    }
                }
            }
    }
}

// Convert UTF code of hexadecimal number serie into character list
function CodeToChars(RawData, Code)
{
    // Convert text into value sequence
    var RawDataNum = [];
    var RawState = false;
    for (var I = 0; I < RawData.length; I++)
    {
        var C = "" + RawData[I] + "";
        var CI = -1;
        var Valid = true;
        switch (C)
        {
            case '0': CI = 0; break;
            case '1': CI = 1; break;
            case '2': CI = 2; break;
            case '3': CI = 3; break;
            case '4': CI = 4; break;
            case '5': CI = 5; break;
            case '6': CI = 6; break;
            case '7': CI = 7; break;
            case '8': CI = 8; break;
            case '9': CI = 9; break;
            case 'a': CI = 10; break;
            case 'b': CI = 11; break;
            case 'c': CI = 12; break;
            case 'd': CI = 13; break;
            case 'e': CI = 14; break;
            case 'f': CI = 15; break;
            case 'A': CI = 10; break;
            case 'B': CI = 11; break;
            case 'C': CI = 12; break;
            case 'D': CI = 13; break;
            case 'E': CI = 14; break;
            case 'F': CI = 15; break;
            default: Valid = false;
        }
        if (Valid)
        {
            if (RawState)
            {
                RawDataNum[RawDataNum.length - 1] += CI;
                RawState = false;
            }
            else
            {
                RawDataNum.push(CI << 4);
                RawState = true;
            }
        }
    }
    if (RawState)
    {
        return [];
    }
    var RawDataNumL = RawDataNum.length;

    var Chars = [];
    var Good = true;
    switch (Code)
    {
        case 1: // UTF-8
            {
                var AdditionalChar = 0;
                for (var I = 0; I < RawDataNumL; I++)
                {
                    if (AdditionalChar == 0)
                    {
                        if (RawDataNum[I] < 128)
                        {
                            Chars.push(RawDataNum[I]);
                        }
                        else
                        {
                            // 110_____
                            if ((RawDataNum[I] >= 0xC0) && (RawDataNum[I] <= 0xDF))
                            {
                                AdditionalChar = 1;
                                Chars.push(RawDataNum[I] & 0x1F);
                            }

                            // 1110____
                            if ((RawDataNum[I] >= 0xE0) && (RawDataNum[I] <= 0xEF))
                            {
                                AdditionalChar = 2;
                                Chars.push(RawDataNum[I] & 0x0F);
                            }

                            // 11110___
                            if ((RawDataNum[I] >= 0xF0) && (RawDataNum[I] <= 0xF7))
                            {
                                AdditionalChar = 3;
                                Chars.push(RawDataNum[I] & 0x07);
                            }

                            // 111110__
                            if ((RawDataNum[I] >= 0xF8) && (RawDataNum[I] <= 0xFB))
                            {
                                AdditionalChar = 4;
                                Chars.push(RawDataNum[I] & 0x03);
                            }

                            // 1111110_
                            if ((RawDataNum[I] >= 0xFC) && (RawDataNum[I] <= 0xFD))
                            {
                                AdditionalChar = 5;
                                Chars.push(RawDataNum[I] & 0x01);
                            }
                        }
                    }
                    else
                    {
                        if ((RawDataNum[I] >= 0x80) && (RawDataNum[I] <= 0xBF))
                        {
                            AdditionalChar--;
                            var TempChar = Chars[Chars.length - 1];
                            TempChar = TempChar << 6;
                            TempChar = TempChar + (RawDataNum[I] & 0x3F);
                            Chars[Chars.length - 1] = TempChar;
                        }
                        else
                        {
                            AdditionalChar = 0;
                            I--;
                        }
                    }
                }
            }
            break;
        case 2: // UTF-16LE
        case 3: // UTF-16BE
            {
                if ((RawDataNumL % 2) == 0)
                {
                    var TempNum0 = 0;
                    var TempNum = 0;
                    for (var I = 0; I < (RawDataNumL / 2); I++)
                    {
                        TempNum0 = TempNum;
                        if (Code == 2)
                        {
                            TempNum = RawDataNum[I * 2 + 1] * 256 + RawDataNum[I * 2 + 0];
                        }
                        if (Code == 3)
                        {
                            TempNum = RawDataNum[I * 2 + 0] * 256 + RawDataNum[I * 2 + 1];
                        }
                        
                        if ((TempNum <= 0xD7FF) || (TempNum >= 0xE000))
                        {
                            Chars.push(TempNum);
                        }
                        if ((TempNum0 >= 0xD800) && (TempNum0 <= 0xDBFF) && (TempNum >= 0xDC00) && (TempNum <= 0xDFFF))
                        {
                            var NumExt = (((TempNum0 & 1023) + 64) << 10) + (TempNum & 1023)
                            Chars.push(NumExt);
                        }
                    }
                }
                else
                {
                    Good = false;
                }
            }
            break;
    }
    if (Good)
    {
        return Chars;
    }
    else
    {
        return [];
    }
}

function TextToChars(RawText)
{
    var Chars = [];
    for (var I = 0; I < RawText.length; I++)
    {
        var Key = RawText.codePointAt(I);
        Chars.push(Key);
        if (Key >= 65536)
        {
            I++;
        }
    }
    return Chars;
}

