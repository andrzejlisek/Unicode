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
    
    var CodeC = [];
    var CodeB = [];
    
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
                var CodeLine = " X[" + BlockCount + "] = [" + HexToInt(Num1) + ", " + HexToInt(Num2) + ", \"" + Name + "\"];";
                CodeB.push(CodeLine);
                BlockCount++;
            }
        }
    }
    CodeB.push("}");
    
    CodeC.push("function FillCharNames(X)");
    CodeC.push("{");
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
            var CodeLine = " X[" + CharNum + "] = [\"" + BlockNameX + "\", \"" + RawLine[1] + "\", \"" + RawLine[10] + "\", " + CodeU + ", " + CodeL + ", " + CodeT + ", " + Block1 + ", " + Block2 + "];";
            CodeC.push(CodeLine);
        }
    }
    CodeC.push("}");
    document.getElementById("Output").value = CodeC.join("\n") + "\n" + "\n" + CodeB.join("\n") + "\n";
}

