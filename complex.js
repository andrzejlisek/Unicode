



// Key to differ simple and complex characters
var ComplexKey = 0x200000;
var ComplexMemo = 0x400000;
var ComplexSlots = 8;

var ComplexSuffixCodes = [];
var ComplexJoinerCodes = [];

function FillComplexCodes()
{
    // Zero-width joiner
    ComplexJoinerCodes.push(0x200D);
}


var ComplexMemoItems = 0;

function ComplexMemoClear()
{
    ComplexMemoItems = 0;
}

function ComplexMemoCreate(Key)
{
    if ((Key < 0) || (Key >= ComplexMemo))
    {
        return Key;
    }
    else
    {
        var CharData = GetCharData(Key);
        var ItemId = ComplexKey + ComplexMemoItems;
        ComplexMemoInfo = [CharData[0], CharData[1], CharData[2], -1, -1, -1, 0, GetCharByKey(Key)];
        ComplexMemoInfo[6] = ComplexMemoInfo[7].length;
        ComplexNames[ItemId] = ComplexMemoInfo;
        ComplexMemoItems++;
        return ComplexMemo + ComplexMemoItems - 1;
    }
}

function ComplexMemoAppend(Key, KeyAppend)
{
	if ((Key - ComplexKey) in ComplexNames)
	{
	    var AppendInfo = GetCharData(KeyAppend)
	    var AppendCodes = GetCharByKey(KeyAppend);
	    //ComplexNames[Key - ComplexKey][0] = ComplexNames[Key - ComplexKey][0] + "\n" + AppendInfo[0];
	    //ComplexNames[Key - ComplexKey][1] = ComplexNames[Key - ComplexKey][1] + "\n" + AppendInfo[1];
	    //ComplexNames[Key - ComplexKey][2] = ComplexNames[Key - ComplexKey][2] + "\n" + AppendInfo[2];
	    ComplexNames[Key - ComplexKey][0] = "";
	    ComplexNames[Key - ComplexKey][1] = "";
	    ComplexNames[Key - ComplexKey][2] = "";
	    ComplexNames[Key - ComplexKey][3] = -1;
	    ComplexNames[Key - ComplexKey][4] = -1;
	    ComplexNames[Key - ComplexKey][5] = -1;
	    for (var I = 0; I < AppendCodes.length; I++)
	    {
	        ComplexNames[Key - ComplexKey][6] = ComplexNames[Key - ComplexKey][6] + 1;
	        ComplexNames[Key - ComplexKey][7].push(AppendCodes[I]);
	    }
	}
}

function GetCharData(Key)
{
    var CharData;
    if (Key < ComplexKey)
    {
		if (Key in CharNames)
		{
		    return CharNames[Key];
		}
    }
    else
    {
    	if ((Key - ComplexKey) in ComplexNames)
    	{
		    return ComplexNames[Key - ComplexKey];
    	}
    }
    return ["", "", "", -1, -1, -1];
}

function GetCharByKey(Key)
{
	if (Key < 0)
	{
		return [];
	}
	if (Key < ComplexKey)
	{
		return [Key];
	}
	if (Key >= ComplexKey)
	{
    	if ((Key - ComplexKey) in ComplexNames)
    	{
    	    var T = [];
    	    for (var I = 0; I < ComplexNames[Key - ComplexKey][7].length; I++)
    	    {
    	        T.push(ComplexNames[Key - ComplexKey][7][I]);
    	    }
		    return T;
    	}
	}
	return [];
}


function CharNumToHex(Key)
{
	var CharList = GetCharByKey(Key);
	var Num = "";
	for (var i = 0; i < CharList.length; i++)
	{
		if (i > 0)
		{
			Num = Num + "<br>";
		}
		Num = Num + NumToHex(CharList[i]);
	}
    return Num;
}

function CharNumToDec(Key)
{
	var CharList = GetCharByKey(Key);
	var Num = "";
	for (var i = 0; i < CharList.length; i++)
	{
		if (i > 0)
		{
			Num = Num + "<br>";
		}
		Num = Num + "" + CharList[i] + "";
	}
    return Num;
}



function FindComplex(CharList, CharType)
{
	var DummyTail = 10;
    for (var I = 0; I < DummyTail; I++)
    {
        CharList.push(0);
    }
    
    // Convert by defined complex characters
    for (var I = 0; I < CharList.length; I++)
    {
        CharType[I] = 1;
        for (var II = 0; II < ComplexNamesL; II++)
        {
            var ComplexNames_ = ComplexNames[II];
            var CplxMatch = true;
            for (var III = 0; III < ComplexNames_[6]; III++)
            {
                if (CharList[I + III] != ComplexNames_[7][III])
                {
                    CplxMatch = false;
                    break;
                }
            }
            if (CplxMatch)
            {
                CharList.splice(I, ComplexNames_[6], ComplexKey + II);
                CharType.splice(I, ComplexNames_[6], 2);
                break;
            }
        }
    }
    
    for (var I = 0; I < DummyTail; I++)
    {
        CharList.pop();
    }
    
    ComplexMemoClear();
    for (var I = 1; I < CharList.length; I++)
    {
        if (ComplexSuffixCodes.indexOf(CharList[I]) >= 0)
        {
            CharList[I - 1] = ComplexMemoCreate(CharList[I - 1]);
            CharType[I - 1] = 2;
            ComplexMemoAppend(CharList[I - 1], CharList[I]);
            CharList.splice(I, 1);
            CharType.splice(I, 1);
            I--;
        }
    }
    
    for (var I = 1; I < (CharList.length - 1); I++)
    {
        if (ComplexJoinerCodes.indexOf(CharList[I]) >= 0)
        {
            CharList[I - 1] = ComplexMemoCreate(CharList[I - 1]);
            CharType[I - 1] = 2;
            ComplexMemoAppend(CharList[I - 1], CharList[I]);
            ComplexMemoAppend(CharList[I - 1], CharList[I + 1]);
            CharList.splice(I, 2);
            CharType.splice(I, 2);
            I = I - 2;
        }
    }
    
    // Insert elementary characters as ingredients of complex character
    for (var I = 0; I < CharList.length; I++)
    {
        if (CharType[I] == 2)
        {
            var CharListTemp = GetCharByKey(CharList[I]);
            for (var II = 0; II < CharListTemp.length; II++)
            {
                CharList.splice(I + 1, 0, CharListTemp[II]);
                CharType.splice(I + 1, 0, 3);
                I++;
            }
        }
    }
}



function ComplexEmojiBtn()
{
    if (SET_EmojiTF)
    {
        document.getElementById("xSET_Emoji1F").value = "[Txt]";
    }
    else
    {
        document.getElementById("xSET_Emoji1F").value = "Txt";
    }
    if (SET_EmojiT0)
    {
        document.getElementById("xSET_Emoji10").value = "[Std]";
    }
    else
    {
        document.getElementById("xSET_Emoji10").value = "Std";
    }
    if (SET_EmojiTG)
    {
        document.getElementById("xSET_Emoji1G").value = "[Img]";
    }
    else
    {
        document.getElementById("xSET_Emoji1G").value = "Img";
    }
    if (SET_EmojiT1)
    {
        document.getElementById("xSET_Emoji11").value = "[CJK1]";
    }
    else
    {
        document.getElementById("xSET_Emoji11").value = "CJK1";
    }
    if (SET_EmojiT2)
    {
        document.getElementById("xSET_Emoji12").value = "[CJK2]";
    }
    else
    {
        document.getElementById("xSET_Emoji12").value = "CJK2";
    }
    if (SET_EmojiT3)
    {
        document.getElementById("xSET_Emoji13").value = "[CJK3]";
    }
    else
    {
        document.getElementById("xSET_Emoji13").value = "CJK3";
    }
    switch (SET_EmojiTV)
    {
        case 0: document.getElementById("xSET_Emoji1Z").value = "Layout: H"; break;
        case 1: document.getElementById("xSET_Emoji1Z").value = "Layout: H+S"; break;
        case 2: document.getElementById("xSET_Emoji1Z").value = "Layout: V"; break;
    }

    if (SET_EmojiPF)
    {
        document.getElementById("xSET_Emoji2F").value = "[Txt]";
    }
    else
    {
        document.getElementById("xSET_Emoji2F").value = "Txt";
    }
    if (SET_EmojiP0)
    {
        document.getElementById("xSET_Emoji20").value = "[Std]";
    }
    else
    {
        document.getElementById("xSET_Emoji20").value = "Std";
    }
    if (SET_EmojiPG)
    {
        document.getElementById("xSET_Emoji2G").value = "[Img]";
    }
    else
    {
        document.getElementById("xSET_Emoji2G").value = "Img";
    }
    if (SET_EmojiP1)
    {
        document.getElementById("xSET_Emoji21").value = "[CJK1]";
    }
    else
    {
        document.getElementById("xSET_Emoji21").value = "CJK1";
    }
    if (SET_EmojiP2)
    {
        document.getElementById("xSET_Emoji22").value = "[CJK2]";
    }
    else
    {
        document.getElementById("xSET_Emoji22").value = "CJK2";
    }
    if (SET_EmojiP3)
    {
        document.getElementById("xSET_Emoji23").value = "[CJK3]";
    }
    else
    {
        document.getElementById("xSET_Emoji23").value = "CJK3";
    }
    switch (SET_EmojiPV)
    {
        case 0: document.getElementById("xSET_Emoji2Z").value = "Layout: H"; break;
        case 1: document.getElementById("xSET_Emoji2Z").value = "Layout: H+S"; break;
        case 2: document.getElementById("xSET_Emoji2Z").value = "Layout: V"; break;
    }
}

function ComplexEmojiOpt(Disp, Mode)
{
    var OptX = 0;
    switch ((Disp * 100) + Mode)
    {
        case 100: SET_EmojiT0 = 1 - SET_EmojiT0; break;
        case 101: SET_EmojiT1 = 1 - SET_EmojiT1; OptX = 2; break;
        case 102: SET_EmojiT2 = 1 - SET_EmojiT2; OptX = 2; break;
        case 103: SET_EmojiT3 = 1 - SET_EmojiT3; OptX = 2; break;
        case 115: SET_EmojiTF = 1 - SET_EmojiTF; OptX = 1; break;
        case 116: SET_EmojiTG = 1 - SET_EmojiTG; OptX = 1; break;
        case 120: SET_EmojiTV++; if (SET_EmojiTV == 3) { SET_EmojiTV = 0; } break;
        case 200: SET_EmojiP0 = 1 - SET_EmojiP0; break;
        case 201: SET_EmojiP1 = 1 - SET_EmojiP1; OptX = 2; break;
        case 202: SET_EmojiP2 = 1 - SET_EmojiP2; OptX = 2; break;
        case 203: SET_EmojiP3 = 1 - SET_EmojiP3; OptX = 2; break;
        case 215: SET_EmojiPF = 1 - SET_EmojiPF; OptX = 1; break;
        case 216: SET_EmojiPG = 1 - SET_EmojiPG; OptX = 1; break;
        case 220: SET_EmojiPV++; if (SET_EmojiPV == 3) { SET_EmojiPV = 0; } break;
    }
    if ((!SET_EmojiT1) && (!SET_EmojiT2) && (!SET_EmojiT3) && (!SET_EmojiTF) && (!SET_EmojiTG)) { SET_EmojiT0 = 1; }
    if ((!SET_EmojiP1) && (!SET_EmojiP2) && (!SET_EmojiP3) && (!SET_EmojiPF) && (!SET_EmojiPG)) { SET_EmojiP0 = 1; }
    if (OptX == 1)
    {
        if (SET_EmojiTF || SET_EmojiTG)
        {
            SET_EmojiT1 = 0;
            SET_EmojiT2 = 0;
            SET_EmojiT3 = 0;
        }
        if (SET_EmojiPF || SET_EmojiPG)
        {
            SET_EmojiP1 = 0;
            SET_EmojiP2 = 0;
            SET_EmojiP3 = 0;
        }
    }
    if (OptX == 2)
    {
        if (SET_EmojiT1 || SET_EmojiT2 || SET_EmojiT3)
        {
            SET_EmojiTF = 0;
            SET_EmojiTG = 0;
        }
        if (SET_EmojiP1 || SET_EmojiP2 || SET_EmojiP3)
        {
            SET_EmojiPF = 0;
            SET_EmojiPG = 0;
        }
    }
    ComplexEmojiBtn();
    SettingsSave();
    Repaint();
    DisplayCurrent();
}


function CurrentCodeOptimize()
{
    while ((CurrentCodeGetIdx(CurrentCodeMin) == (-1)) && (CurrentCodeMin < CurrentCodeMax))
    {
        CurrentCodeMin++;
    }
    while ((CurrentCodeGetIdx(CurrentCodeMax) == (-1)) && (CurrentCodeMax > CurrentCodeMin))
    {
        CurrentCodeMax--;
    }

    var Middle = CurrentCodeMin + CurrentCodeMax;
    if ((Math.abs(Middle) % 2) > 0)
    {
        Middle++;
    }
    Middle = Middle / 2;
    var XMin = CurrentCodeMin;
    var XMax = CurrentCodeMax;
    if (Middle > 0)
    {
        for (var I = XMin; I <= XMax; I++)
        {
            CurrentCodeSetIdx(I - Middle, CurrentCodeGetIdx(I));
        }
        for (var I = XMax - Middle + 1; I <= XMax; I++)
        {
            CurrentCodeSetIdx(I, -1);
        }
    }
    if (Middle < 0)
    {
        for (var I = XMax; I >= XMin; I--)
        {
            CurrentCodeSetIdx(I - Middle, CurrentCodeGetIdx(I));
        }
        for (var I = XMin - Middle - 1; I >= XMin; I--)
        {
            CurrentCodeSetIdx(I, -1);
        }
    }
    CurrentCodeMin = XMin - Middle;
    CurrentCodeMax = XMax - Middle;
    CurrentCodeO -= Middle;
    CurrentCodeI -= Middle;
}


function CurrentCodeGetIdx(Idx)
{
    var Idx0 = 0;
    if (Idx >= 0)
    {
        Idx0 = Idx * 2;
    }
    else
    {
        Idx0 = ((0 - Idx) * 2) - 1;
    }
    if (Idx0 >= CurrentCodeL)
    {
        return -1;
    }
    else
    {
        return CurrentCode[Idx0];
    }
}

function CurrentCodeSetIdx(Idx, C)
{
    if (CurrentCodeMin > Idx)
    {
        CurrentCodeMin = Idx;
    }
    if (CurrentCodeMax < Idx)
    {
        CurrentCodeMax = Idx;
    }
    var Idx0 = 0;
    if (Idx >= 0)
    {
        Idx0 = Idx * 2;
    }
    else
    {
        Idx0 = ((0 - Idx) * 2) - 1;
    }
    while (Idx0 >= CurrentCodeL)
    {
        CurrentCode.push(-1);
        CurrentCodeL++;
    }

	if (C < ComplexKey)
	{
	    CurrentCode[Idx0] = C;
    }
    else
    {
		var CharList = GetCharByKey(C);
	
	    for (var I = 0; I < CharList.length; I++)
	    {
		    CurrentCodeSetIdx(Idx + I, CharList[I]);
	    }
    }
}


function CurrentCodeGet()
{
    return CurrentCodeGetIdx(CurrentCodeI);
}

function CurrentCodeSet(C)
{
    CurrentCodeSetIdx(CurrentCodeI, C);
    CurrentCodeOptimize();
}


function CurrentCodeMinPos()
{
    if (CurrentCodeI < CurrentCodeMin)
    {
        return CurrentCodeI;
    }
    else
    {
        return CurrentCodeMin;
    }
}

function CurrentCodeMaxPos()
{
    if (CurrentCodeI > CurrentCodeMax)
    {
        return CurrentCodeI;
    }
    else
    {
        return CurrentCodeMax;
    }
}

