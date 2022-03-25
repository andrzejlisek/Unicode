function HexCorr(N)
{
    return IntToHex(HexToInt(N));
}

function IntToHex(I)
{
    I = parseInt(I);
    if (I < 0)
    {
        return I;
    }
    var H = I.toString(16).toUpperCase();
    if ((I >= 0x00) && (I < 0x10))
    {
        H = "000" + H;
    }
    if ((I >= 0x10) && (I < 0x100))
    {
        H = "00" + H;
    }
    if ((I >= 0x100) && (I < 0x1000))
    {
        H = "0" + H;
    }
    if ((I >= 0x10000) && (I < 0x100000))
    {
        H = "0" + H;
    }
    return "0x" + H;
}

function HexToInt(H)
{
    if (H == "")
    {
        return -1;
    }
    var Num = 0;
    for (var I = 0; I < H.length; I++)
    {
        Num = Num << 4;
        switch (H[I])
        {
            case '1': Num +=  1; break;
            case '2': Num +=  2; break;
            case '3': Num +=  3; break;
            case '4': Num +=  4; break;
            case '5': Num +=  5; break;
            case '6': Num +=  6; break;
            case '7': Num +=  7; break;
            case '8': Num +=  8; break;
            case '9': Num +=  9; break;
            case 'a': Num += 10; break;
            case 'b': Num += 11; break;
            case 'c': Num += 12; break;
            case 'd': Num += 13; break;
            case 'e': Num += 14; break;
            case 'f': Num += 15; break;
            case 'A': Num += 10; break;
            case 'B': Num += 11; break;
            case 'C': Num += 12; break;
            case 'D': Num += 13; break;
            case 'E': Num += 14; break;
            case 'F': Num += 15; break;
        }
    }
    return Num;
}

function Generate()
{
    var RawBlock = document.getElementById("Input1").value.split('\n');
    var RawChar = document.getElementById("Input2").value.split('\n');
    var RawEmoji = (document.getElementById("Emoji1").value + "\n" + document.getElementById("Emoji2").value).split('\n');
    
    var CodeC = [];
    var CodeB = [];
    var CodeS = [];
    
    var BlockNum1 = [];
    var BlockNum2 = [];
    var BlockName = [];
    var BlockCount = 0;
    
    CodeB.push("function FillBlockNames(X)");
    CodeB.push("{");
    for (var I = 0; I < RawBlock.length; I++)
    {
        var RawLine = RawBlock[I];
        var T = RawLine.indexOf(';');
        var TX = RawLine.indexOf('..');
        if (RawLine.length > 0)
        {
            if ((T > TX) && (TX > 0) && (RawLine[0] != "#"))
            {
                var Num1 = RawLine.substr(0, TX);
                var Num2 = RawLine.substr(TX + 2, T - TX - 2);
                var Name = RawLine.substr(T + 1).trim();
                BlockNum1.push(HexToInt(Num1));
                BlockNum2.push(HexToInt(Num2));
                BlockName.push(Name);
                var CodeLine = " X[" + IntToHex(BlockCount) + "] = [" + HexCorr(Num1) + ", " + HexCorr(Num2) + ", \"" + Name + "\"];";
                CodeB.push(CodeLine);
                BlockCount++;
            }
        }
    }
    CodeB.push("}");
    
    CodeC.push("function FillCharNames(X)");
    CodeC.push("{");
    var Combine1 = [-2];
    var Combine2 = [-2];
    var CombineI = 0;
    var TestCX = [];
    for (var I = 0; I < RawChar.length; I++)
    {
        var RawLine = RawChar[I].split(';');
        if (RawLine.length > 14)
        {
            var BlockNameX = "";
            var CharNum = HexToInt(RawLine[0]);
            var Block1 = -1;
            var Block2 = -1;
            for (var II = 0; II < BlockCount; II++)
            {
                if ((BlockNum1[II] <= CharNum) && (BlockNum2[II] >= CharNum))
                {
                    Block1 = BlockNum1[II];
                    Block2 = BlockNum2[II];
                    BlockNameX = BlockName[II]; 
                }
            }
            var CodeU = HexToInt(RawLine[12]);
            var CodeL = HexToInt(RawLine[13]);
            var CodeT = HexToInt(RawLine[14]);
            var CodeComb = RawLine[2];
            
            // Emoji Modifier Fitzpatrick
            if ((CharNum >= 0x01F3FB) && (CharNum <= 0x01F3FF)) { CodeComb = "?x?x?"; }

            // Tags
            if ((CharNum >= 0x0E0000) && (CharNum <= 0x0E007F)) { CodeComb = "?x?x?"; }
            
            if ((CodeComb == "Mn") || (CodeComb == "Me") || (CodeComb == "Mc") || (CodeComb == "?x?x?"))
            {
                if ((Combine2[CombineI] + 1) < CharNum)
                {
                    CombineI++;
                    Combine1.push(CharNum);
                    Combine2.push(CharNum);
                }
                else
                {
                    Combine2[CombineI]++;
                }
            }
            var CodeLine = " X[" + IntToHex(CharNum) + "] = [\"" + BlockNameX + "\", \"" + RawLine[1] + "\", \"" + RawLine[10] + "\", " + IntToHex(CodeU) + ", " + IntToHex(CodeL) + ", " + IntToHex(CodeT) + ", " + IntToHex(Block1) + ", " + IntToHex(Block2) + "];";
            CodeC.push(CodeLine);
        }
    }
    CodeC.push("}");

    CodeC.push("");
    CodeC.push("function FillComplexSuffix(X)");
    CodeC.push("{");
    CodeC.push(" var I;");
    for (var I = 1; I <= CombineI; I++)
    {
        if (Combine1[I] != Combine2[I])
        {
            CodeC.push(" for (I = " + IntToHex(Combine1[I]) + "; I <= " + IntToHex(Combine2[I]) + "; I++) { X.push(I); }");
        }
        else
        {
            CodeC.push(" X.push(" + IntToHex(Combine1[I]) + ");");
        }
    }
    CodeC.push("}");
    
    var CodeInfoS = [];
    var MaxCodeLen = 0;
    for (var I = 0; I < RawEmoji.length; I++)
    {
        var RawLine = RawEmoji[I].split(';');
        if (RawLine.length == 3)
        {
            RawLine[0] = RawLine[0].trim();
            RawLine[1] = StrCorr(RawLine[1].trim());
            RawLine[2] = StrCorr(RawLine[2].split('#')[0].trim());
            if (RawLine[0].indexOf("#") < 0)
            {
                var CodeSeq = [];
                if ((RawLine[0].indexOf("..") < 0) && (RawLine[0].indexOf(" ") < 0))
                {
                    CodeSeq.push([HexToInt(RawLine[0])]);
                    if (MaxCodeLen < 1)
                    {
                        MaxCodeLen = 1;
                    }
                }
                if ((RawLine[0].indexOf("..") > 0) && (RawLine[0].indexOf(" ") < 0))
                {
                    var CodeX = RawLine[0].split(".");
                    var Code1 = HexToInt(CodeX[0]);
                    var Code2 = HexToInt(CodeX[2]);
                    /*while (Code1 <= Code2)
                    {
                        CodeSeq.push([Code1]);
                        Code1++;
                    }*/
                    CodeSeq.push([IntToHex(Code1)]);
                    if (MaxCodeLen < 1)
                    {
                        MaxCodeLen = 1;
                    }
                }
                if ((RawLine[0].indexOf("..") < 0) && (RawLine[0].indexOf(" ") > 0))
                {
                    var CodeX = RawLine[0].split(" ");
                    var CodeA = [];
                    for (var CodeSeqI = 0; CodeSeqI < CodeX.length; CodeSeqI++)
                    {
                        CodeA.push(HexCorr(CodeX[CodeSeqI]));
                    }
                    CodeSeq.push(CodeA);
                    if (MaxCodeLen < CodeA.length)
                    {
                        MaxCodeLen = CodeA.length;
                    }
                }
                if (CodeSeq.length > 0)
                {
                    for (var CodeSeqI = 0; CodeSeqI < CodeSeq.length; CodeSeqI++)
                    {
                        CodeInfoS.push([CodeSeq[CodeSeqI], RawLine[1], RawLine[2]]);
                    }
                }
            }
        }
    }

    CodeS.push("function FillComplexNames(X)");
    CodeS.push("{");
    var IDX = 0;
    for (var I = MaxCodeLen; I >= 1; I--)
    {
        for (var II = 0; II < CodeInfoS.length; II++)
        {
            if (CodeInfoS[II][0].length == I)
            {
                var CodeLine = " X[" + IDX + "] = [\"" + CodeInfoS[II][1] + "\", \"" + CodeInfoS[II][2] + "\"";
                CodeLine = CodeLine + ", \"\", -1, -1, -1, " + CodeInfoS[II][0].length + ", [" + CodeInfoS[II][0].join(", ") + "]];";
                CodeS.push(CodeLine);
                IDX++;
            }
        }
    }
    CodeS.push("}");
    
    document.getElementById("Output").value = CodeC.join("\n") + "\n" + "\n" + CodeB.join("\n") + "\n" + "\n" + CodeS.join("\n") + "\n";
}

function StrCorr(Str)
{
    var StrX = "";
    for (var I = 0; I < Str.length; I++)
    {
        if ("\\\"".indexOf(Str[I]) >= 0)
        {
            StrX = StrX + "\\";
        }
        StrX = StrX + Str[I];
    }
    return StrX;
}

function EmojiVX()
{
    var Ver = document.getElementById("EmojiV").value;
    var L1 = document.getElementById("Emoji1L");
    var L2 = document.getElementById("Emoji2L");
    L1.href = "https://unicode.org/Public/emoji/" + Ver + "/emoji-sequences.txt";
    L2.href = "https://unicode.org/Public/emoji/" + Ver + "/emoji-zwj-sequences.txt";
}
EmojiVX();

