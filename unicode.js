var SettingsPrefix = "Unicode_";

var SET_HtmlAsEntity = DataGetIDefault(SettingsPrefix + "SET_HtmlAsEntity", 1);

var SET_FontName = DataGetDefault(SettingsPrefix + "SET_FontName", "monospace");
var SET_FontSize = DataGetIDefault(SettingsPrefix + "SET_FontSize", 20);
var SET_FontSizeX = DataGetIDefault(SettingsPrefix + "SET_FontSizeX", 300);

var SET_Prefix = DataGetDefault(SettingsPrefix + "SET_Prefix", "");
var SET_Suffix = DataGetDefault(SettingsPrefix + "SET_Suffix", "");
var SET_MarginTop = DataGetIDefault(SettingsPrefix + "SET_MarginTop", 0);
var SET_MarginBot = DataGetIDefault(SettingsPrefix + "SET_MarginBot", 0);

var SET_FontB = DataGetIDefault(SettingsPrefix + "SET_FontB", 0);
var SET_FontI = DataGetIDefault(SettingsPrefix + "SET_FontI", 0);
var SET_FontU = DataGetIDefault(SettingsPrefix + "SET_FontU", 0);
var SET_FontS = DataGetIDefault(SettingsPrefix + "SET_FontS", 0);
var SET_DisplayMode = DataGetIDefault(SettingsPrefix + "SET_DisplayMode", 0);

var SET_WriteBoxRows = DataGetIDefault(SettingsPrefix + "SET_WriteBoxRows", 5);
var SET_WriteBoxCols = DataGetIDefault(SettingsPrefix + "SET_WriteBoxCols", 10);
var SET_WriteBoxFontSize = DataGetIDefault(SettingsPrefix + "SET_WriteBoxFontSize", 20);

var SET_AutoClearSlots = DataGetIDefault(SettingsPrefix + "SET_AutoClearSlots", 1);

var FindCharStateText = DataGetDefault(SettingsPrefix + "FindCharStateText", "");
var FindCharStateMode = DataGetIDefault(SettingsPrefix + "FindCharStateMode", 0);

var FontPresetN = ["Serif", "Sans", "Cursive", "Fantasy", "Mono"];
var FontPresetF = ["serif", "sans-serif", "cursive", "fantasy", "monospace"];

var XFontName = "";

var SET_DisplayCode = [];
SET_DisplayCode[0] = DataGetIDefault(SettingsPrefix + "SET_DisplayCode0", 1); // Hex
SET_DisplayCode[1] = DataGetIDefault(SettingsPrefix + "SET_DisplayCode1", 1); // Dec
SET_DisplayCode[2] = DataGetIDefault(SettingsPrefix + "SET_DisplayCode2", 0); // UTF-8
SET_DisplayCode[3] = DataGetIDefault(SettingsPrefix + "SET_DisplayCode3", 0); // UTF-16LE
SET_DisplayCode[4] = DataGetIDefault(SettingsPrefix + "SET_DisplayCode4", 0); // UTF-16BE
SET_DisplayCode[5] = DataGetIDefault(SettingsPrefix + "SET_DisplayCode5", 1); // Block
SET_DisplayCode[6] = DataGetIDefault(SettingsPrefix + "SET_DisplayCode6", 1); // Name
SET_DisplayCode[7] = DataGetIDefault(SettingsPrefix + "SET_DisplayCode7", 1); // Other name


SET_EmojiT0 = DataGetIDefault(SettingsPrefix + "SET_EmojiT0", 1);
SET_EmojiT1 = DataGetIDefault(SettingsPrefix + "SET_EmojiT1", 0);
SET_EmojiT2 = DataGetIDefault(SettingsPrefix + "SET_EmojiT2", 0);
SET_EmojiT3 = DataGetIDefault(SettingsPrefix + "SET_EmojiT3", 0);
SET_EmojiTF = DataGetIDefault(SettingsPrefix + "SET_EmojiTF", 0);
SET_EmojiTG = DataGetIDefault(SettingsPrefix + "SET_EmojiTG", 0);
SET_EmojiTV = DataGetIDefault(SettingsPrefix + "SET_EmojiTV", 2);

SET_EmojiP0 = DataGetIDefault(SettingsPrefix + "SET_EmojiP0", 1);
SET_EmojiP1 = DataGetIDefault(SettingsPrefix + "SET_EmojiP1", 0);
SET_EmojiP2 = DataGetIDefault(SettingsPrefix + "SET_EmojiP2", 0);
SET_EmojiP3 = DataGetIDefault(SettingsPrefix + "SET_EmojiP3", 0);
SET_EmojiPF = DataGetIDefault(SettingsPrefix + "SET_EmojiPF", 0);
SET_EmojiPG = DataGetIDefault(SettingsPrefix + "SET_EmojiPG", 0);
SET_EmojiPV = DataGetIDefault(SettingsPrefix + "SET_EmojiPV", 0);

SET_ModuleArrangeConf = DataGetIDefault(SettingsPrefix + "SET_ModuleArrangeConf", 0);
SET_ModuleArrangeLayout = DataGetDefault(SettingsPrefix + "SET_ModuleArrangeLayout", "01234567");


var DisplayCodeName = ["Hex", "Dec", "UTF-8", "UTF-16LE", "UTF-16BE"];
var DisplayCodeSep = ["|", "|", "&nbsp;", "&nbsp;", "&nbsp;"];

var CurrentCode = [];
var CurrentCodeO = 0;
var CurrentCodeI = 0;
var CurrentCodeL = 0;
var CurrentCodeMin = 0;
var CurrentCodeMax = 0;

function CharInfoDisplayCodeSet(N)
{
    if (N >= 0)
    {
        if (SET_DisplayCode[N])
        {
            SET_DisplayCode[N] = 0;
            DataSetI(SettingsPrefix + "SET_DisplayCode" + N, 0);
        }
        else
        {
            SET_DisplayCode[N] = 1;
            DataSetI(SettingsPrefix + "SET_DisplayCode" + N, 1);
        }
    }
    
    var BtnNames = [];
    BtnNames[0] = "Hex";
    BtnNames[1] = "Dec";
    BtnNames[2] = "UTF-8";
    BtnNames[3] = "UTF-16LE";
    BtnNames[4] = "UTF-16BE";
    BtnNames[5] = "Block";
    BtnNames[6] = "Name";
    BtnNames[7] = "Other name";
    for (var I = 0; I <= 7; I++)
    {
        if (SET_DisplayCode[I])
        {
            BtnNames[I] = "[" + BtnNames[I] + "]";
        }
        document.getElementById("DispCode" + I).value = BtnNames[I];
    }
    
    if (N >= 0)
    {
        DisplayCurrent();
    }
}


function CurrentFullCode(Type)
{
    var C = "";
    for (var I = CurrentCodeMin; I <= CurrentCodeMax; I++)
    {
        if (CurrentCodeGetIdx(I) >= 0)
        {
            if (C != "")
            {
                C = C + DisplayCodeSep[Type];
            }
            if (I == CurrentCodeI)
            {
                C = C + "<b>";
            }
            C = C + GetCharCode(CurrentCodeGetIdx(I), Type);
            if (I == CurrentCodeI)
            {
                C = C + "</b>";
            }
        }
    }
    if (C == "")
    {
        C = "none";
    }
    return C;
}

function CurrentSaveWB()
{
    DataSet(SettingsPrefix + "CurrentWriteBox", document.getElementById("WriteBox").value);
}

function CurrentSetSlot(N)
{
    if (N == -1)
    {
        CurrentCodeO++;
    }
    if (N == -2)
    {
        CurrentCodeO--;
    }
    if (N == -3)
    {
    	for (var I = CurrentCodeMin; I <= CurrentCodeMax; I++)
    	{
    	    if (I != CurrentCodeI)
    	    {
                CurrentCodeSetIdx(I, -1);
            }
        }
        CurrentCodeOptimize();
    }
    if (N > 0)
    {
        CurrentCodeI = N - 1 + CurrentCodeO;
    }
    Repaint();
    DisplayCurrent();
}



// Change integer value to be within specified bounds
function Limit(Val, ValMin, ValMax)
{
    if (isNaN(Val))
    {
        Val = 0;
    }
    if (Val < ValMin) { return ValMin; }
    if (Val > ValMax) { return ValMax; }
    return Math.floor(Val);
}


function SettingsGet()
{
    document.getElementById("xSET_FontName").value = SET_FontName;
    document.getElementById("xSET_FontSize").value = SET_FontSize;
    document.getElementById("xSET_FontSizeX").value = SET_FontSizeX;

    document.getElementById("xSET_Prefix").value = SET_Prefix;
    document.getElementById("xSET_Suffix").value = SET_Suffix;
    document.getElementById("xSET_MarginTop").value = SET_MarginTop;
    document.getElementById("xSET_MarginBot").value = SET_MarginBot;
}

function SettingsSet()
{
    SET_FontName = document.getElementById("xSET_FontName").value;
    SET_FontSize = Limit(document.getElementById("xSET_FontSize").value, 1, 1000000);
    SET_FontSizeX = Limit(document.getElementById("xSET_FontSizeX").value, 1, 1000000);

    SET_Prefix = document.getElementById("xSET_Prefix").value;
    SET_Suffix = document.getElementById("xSET_Suffix").value;
    SET_MarginTop = Limit(document.getElementById("xSET_MarginTop").value, 0, 1000000);
    SET_MarginBot = Limit(document.getElementById("xSET_MarginBot").value, 0, 1000000);

    SettingsSave();
    FontPrepare();
    SettingsGet();
}


function SetFontStyle(Mode)
{
    SettingsSet();
    switch (Mode)
    {
        case 1: SET_FontB = 1 - SET_FontB; break;
        case 2: SET_FontI = 1 - SET_FontI; break;
        case 3: SET_FontU = 1 - SET_FontU; break;
        case 4: SET_FontS = 1 - SET_FontS; break;
        case 5: SET_DisplayMode = 1 - SET_DisplayMode; break;
    }
    
    DataSetI(SettingsPrefix + "SET_FontB", SET_FontB);
    DataSetI(SettingsPrefix + "SET_FontI", SET_FontI);
    DataSetI(SettingsPrefix + "SET_FontU", SET_FontU);
    DataSetI(SettingsPrefix + "SET_FontS", SET_FontS);
    DataSetI(SettingsPrefix + "SET_DisplayMode", SET_DisplayMode);
    
    if (SET_FontB)
    {
        document.getElementById("xSET_FontB").value = "[Bold]";
    }
    else
    {
        document.getElementById("xSET_FontB").value = "Bold";
    }
    if (SET_FontI)
    {
        document.getElementById("xSET_FontI").value = "[Italic]";
    }
    else
    {
        document.getElementById("xSET_FontI").value = "Italic";
    }
    if (SET_FontU)
    {
        document.getElementById("xSET_FontU").value = "[Under]";
    }
    else
    {
        document.getElementById("xSET_FontU").value = "Under";
    }
    if (SET_FontS)
    {
        document.getElementById("xSET_FontS").value = "[Strike]";
    }
    else
    {
        document.getElementById("xSET_FontS").value = "Strike";
    }
    if (SET_DisplayMode == 0)
    {
        document.getElementById("xSET_FontN").value = "Positive";
    }
    if (SET_DisplayMode == 1)
    {
        document.getElementById("xSET_FontN").value = "Negative";
    }

    Repaint();
    if (Mode >= 0)
    {
        DisplayCurrent();
    }
}

function FontPreset(N)
{
    SET_FontName = FontPresetF[N];
    SettingsSave();
    document.getElementById("xSET_FontName").value = SET_FontName;
    SetFontStyle(0);
}

var FontPrepared = null;

var WebFontFaceI = 0;
var WebFontFaceName = "";
var WebFontFaceLoadC = 0;
var WebFontFaceLoadI = 0;

var WebFontObj = [];

function WebFontLoad1(Face)
{
    document.fonts.add(Face);
    
    WebFontFaceLoadI++;
    if (WebFontFaceLoadI < WebFontFaceLoadC)
    {
        WebFontLoad();
    }
    else
    {
        XFontName = WebFontFaceName;
        DisplayCurrent();
    }
}

function WebFontLoad0(Error)
{
    alert(WebFontFaceLoadI + ":" + Error);

    WebFontFaceLoadI++;
    if (WebFontFaceLoadI < WebFontFaceLoadC)
    {
        WebFontLoad();
    }
    else
    {
        XFontName = WebFontFaceName;
        DisplayCurrent();
    }
}

function WebFontLoad()
{
    WebFontObj[WebFontFaceLoadI].load().then(function(Face) { WebFontLoad1(Face); }).catch(function(Error) { WebFontLoad0(Error); })
}

function FontPrepare()
{
    if (FontPrepared != SET_FontName)
    {
        FontPrepared = SET_FontName;
        WebFontFaceI++;
        WebFontFaceName = "WebFont" + WebFontFaceI;

        XFontName = "";
        if (SET_FontName.indexOf('|') < 0)
        {
            XFontName = SET_FontName;
            DisplayCurrent();
        }
        else
        {
            var WebFontUrl = SET_FontName.split('|');
            if ((WebFontUrl.length % 2) == 0)
            {
                WebFontObj = [];
                for (var I = 0; I < WebFontUrl.length; I += 2)
                {
                    if (WebFontUrl[I + 1] != "")
                    {
                        var WebFontFormat = WebFontUrl[I].split('?');
                        var WebFontObj_;
                        if (WebFontFormat[0] != "")
                        {
                            WebFontObj_ = new FontFace(WebFontFaceName, "url(" + WebFontUrl[I + 1] + ") format('" + WebFontFormat[0] + "')");
                        }
                        else
                        {
                            WebFontObj_ = new FontFace(WebFontFaceName, "url(" + WebFontUrl[I + 1] + ")");
                        }
                        if (WebFontFormat.length > 1)
                        {
                            WebFontObj_.unicodeRange = WebFontFormat[1];
                        }
                        WebFontObj.push(WebFontObj_);
                    }
                }
            }
            
            WebFontFaceLoadC = WebFontObj.length;
            WebFontFaceLoadI = 0;
            WebFontLoad();
        }
    }
    else
    {
        DisplayCurrent();
    }
}

function AddEvent(Obj, EvtName, EvtHandler)
{
    if (Obj.addEventListener)
    {
        // all browsers except IE before version 9
        Obj.addEventListener(EvtName, EvtHandler, false);
    }
    else
    {
        if (Obj.attachEvent)
        {
            // IE before version 9
            Obj.attachEvent(EvtName, EvtHandler);
        }
    }
}



function DisplayCurrent()
{
    CurrentSave();
    
    for (var I = 1; I <= ComplexSlots; I++)
    {
        var I_ = I - 1 + CurrentCodeO;
        var Temp = NumToHex(CurrentCodeGetIdx(I_));
        //if ((I_ < CurrentCodeMin) || (I_ > CurrentCodeMax))
        //{
        //    Temp = "#" + Temp + "#";
        //}
        if (CurrentCodeI == I_)
        {
            Temp = "[" + Temp + "]";
        }
        document.getElementById("Slot" + I).value = Temp;
    }
    
    var C = CurrentCodeGet();
    var UniTable = document.getElementById("UniTable");
    var TblC;
    var Style0 = "dispchar";
    var Style1 = "dispcharsel";
    var StyleH0 = "head";
    var StyleH1 = "headsel";
    if (SET_DisplayMode == 1)
    {
        Style0 = "dispcharsel";
        Style1 = "dispchar";
        StyleH0 = "headsel";
        StyleH1 = "head";
    }
    
    for (var I = 0; I < 18; I++)
    {
        for (var II = 0; II < 18; II++)
        {
            UniTable.rows[I].cells[II].style.fontFamily = XFontName;
            UniTable.rows[I].cells[II].style.fontSize = SET_FontSize + "pt";
        }
    }
    
    UniTable.rows[0].cells[0].className = StyleH0;
    UniTable.rows[0].cells[17].className = StyleH0;
    UniTable.rows[17].cells[0].className = StyleH0;
    UniTable.rows[17].cells[17].className = StyleH0;
    for (var I = 0; I < 16; I++)
    {
        if ((C >= 0) && ((C & 15) == I))
        {
            UniTable.rows[0].cells[I + 1].className = StyleH1;
            UniTable.rows[17].cells[I + 1].className = StyleH1;
        }
        else
        {
            UniTable.rows[0].cells[I + 1].className = StyleH0;
            UniTable.rows[17].cells[I + 1].className = StyleH0;
        }

        if ((C >= 0) && ((C & 240) == (I << 4)))
        {
            UniTable.rows[I + 1].cells[0].className = StyleH1;
            UniTable.rows[I + 1].cells[17].className = StyleH1;
        }
        else
        {
            UniTable.rows[I + 1].cells[0].className = StyleH0;
            UniTable.rows[I + 1].cells[17].className = StyleH0;
        }

        for (var II = 0; II < 16; II++)
        {
            if (C >= 0)
            {
                if (((C & 15) == II) && ((C & 240) == (I << 4)))
                {
                    UniTable.rows[I + 1].cells[II + 1].className = Style1;
                    UniTable.rows[I + 1].cells[II + 1].innerHTML = NumToHtml((C - (C & 255)) + (I << 4) + II, true, 1, -1);
                }
                else
                {
                    UniTable.rows[I + 1].cells[II + 1].className = Style0;
                    UniTable.rows[I + 1].cells[II + 1].innerHTML = NumToHtml((C - (C & 255)) + (I << 4) + II, false, 1, -1);
                }
            }
            else
            {
                UniTable.rows[I + 1].cells[II + 1].className = Style0;
                UniTable.rows[I + 1].cells[II + 1].innerHTML = NumToHtml(((0 - C) - ((0 - C) & 255)) + (I << 4) + II, false, 1, -1);
            }
        }
    }

    var ObjView = document.getElementById("CharView");

    ObjView.style.fontFamily = XFontName;
    ObjView.style.fontSize = SET_FontSizeX + "pt";
    ObjView.innerHTML = NumToHtml(C, false, 2, -1);

    var EOL = "<br />";
    var X = "";
    for (var I = 0; I < 5; I++)
    {
        if (SET_DisplayCode[I] == 1)
        {
            if (X != "")
            {
                X = X + EOL;
            }
            X += DisplayCodeName[I] + ": " + CurrentFullCode(I);
        }
    }
    if (C >= 0)
    {
        if (C in CharNames)
        {
            var N = CharNames[C];
            var Block1 = N[6];
            var Block2 = N[7];
            if (SET_DisplayCode[5] && (Block1 >= 0) && (Block2 >= 0))
            {
                if (X != "")
                {
                    X = X + EOL;
                }
                X += "Block: " + TextToHtml(N[0]) + " (";
                X += "<a onclick=\"return DispCharPage(" + Block1 + ")\" href=\"#\">" + NumToHex(Block1) + "</a>";
                X += " - ";
                X += "<a onclick=\"return DispCharPage(" + Block2 + ")\" href=\"#\">" + NumToHex(Block2) + "</a>";
                X += ")";
            }
            if (SET_DisplayCode[6] && (N[1] != ""))
            {
                if (X != "")
                {
                    X = X + EOL;
                }
                X += "Name: " + TextToHtml(N[1]);
            }
            if (SET_DisplayCode[7] && (N[2] != ""))
            {
                if (X != "")
                {
                    X = X + EOL;
                }
                X += "Other name: " + TextToHtml(N[2]);
            }

            if (CharNames[C][3] >= 0)
            {
                document.getElementById("CaseU").style["display"] = "inline";
            }
            else
            {
                document.getElementById("CaseU").style["display"] = "none";
            }
            if (CharNames[C][4] >= 0)
            {
                document.getElementById("CaseL").style["display"] = "inline";
            }
            else
            {
                document.getElementById("CaseL").style["display"] = "none";
            }
            if (CharNames[C][5] >= 0)
            {
                document.getElementById("CaseT").style["display"] = "inline";
            }
            else
            {
                document.getElementById("CaseT").style["display"] = "none";
            }
        }
        else
        {
            document.getElementById("CaseU").style["display"] = "none";
            document.getElementById("CaseL").style["display"] = "none";
            document.getElementById("CaseT").style["display"] = "none";
            if (SET_DisplayCode[5])
            {
                for (var I = 0; I < BlockNamesL; I++)
                {
                    if ((BlockNames[I][0] <= C) && (BlockNames[I][1] >= C))
                    {
                        var Block1 = BlockNames[I][0];
                        var Block2 = BlockNames[I][1];
                        if (X != "")
                        {
                            X = X + EOL;
                        }
                        X += "Block: " + TextToHtml(BlockNames[I][2]) + " (";
                        X += "<a onclick=\"return DispCharPage(" + Block1 + ")\" href=\"#\">" + NumToHex(Block1) + "</a>";
                        X += " - ";
                        X += "<a onclick=\"return DispCharPage(" + Block2 + ")\" href=\"#\">" + NumToHex(Block2) + "</a>";
                        X += ")";
                        break;
                    }
                }
            }
        }
    }
    else
    {
        document.getElementById("CaseU").style["display"] = "none";
        document.getElementById("CaseL").style["display"] = "none";
        document.getElementById("CaseT").style["display"] = "none";
    }
    document.getElementById("CharCode").value = NumToHex(C);
    document.getElementById("CharInfo").innerHTML = X;
}

function SetCase(Mode)
{
    if (CurrentCodeGet() in CharNames)
    {
        var Code = CharNames[CurrentCodeGet()][3 + Mode];
        if (Code >= 0)
        {
            DispCharPage(Code);
        }
    }
}


function NumToHtmlLines(X)
{
    var I = SET_MarginTop;
    while (I > 0)
    {
        X = "&nbsp<br />" + X;
        I--;
    }
    I = SET_MarginBot;
    while (I > 0)
    {
        X = X + "<br />&nbsp";
        I--;
    }
    return X;
}

// Change character number to HTML character display
function NumToHtml(T, Sel, Slots, EmojiMode)
{
    var Emoji0 = true;
    var Emoji1 = false;
    var Emoji2 = false;
    var Emoji3 = false;
    var EmojiF = false;
    var EmojiG = false;
    var EmojiV = 1;

    if (Slots == 1)
    {
        Emoji0 = SET_EmojiT0;
        Emoji1 = SET_EmojiT1;
        Emoji2 = SET_EmojiT2;
        Emoji3 = SET_EmojiT3;
        EmojiF = SET_EmojiTF;
        EmojiG = SET_EmojiTG;
        EmojiV = SET_EmojiTV;
    }
    if (Slots == 2)
    {
        Emoji0 = SET_EmojiP0;
        Emoji1 = SET_EmojiP1;
        Emoji2 = SET_EmojiP2;
        Emoji3 = SET_EmojiP3;
        EmojiF = SET_EmojiPF;
        EmojiG = SET_EmojiPG;
        EmojiV = SET_EmojiPV;
    }


    var X = "";
    var I;

    if (EmojiMode < 0)
    {
        var X = "";
        var X_ = [];
        if (Slots > 0)
        {
            var S0 = "";
            if (EmojiV == 2)
            {
                S0 = "<br>";
                X_[0] = (EmojiF ? NumToHtmlLines(NumToHtml(T, Sel, Slots, 15)) : "");
                X_[1] = (Emoji0 ? NumToHtmlLines(NumToHtml(T, Sel, Slots,  0)) : "");
                X_[2] = (EmojiG ? NumToHtmlLines(NumToHtml(T, Sel, Slots, 16)) : "");
                X_[3] = (Emoji1 ? NumToHtmlLines(NumToHtml(T, Sel, Slots,  1)) : "");
                X_[4] = (Emoji2 ? NumToHtmlLines(NumToHtml(T, Sel, Slots,  2)) : "");
                X_[5] = (Emoji3 ? NumToHtmlLines(NumToHtml(T, Sel, Slots,  3)) : "");
            }
            else
            {
                if (EmojiV == 1)
                {
                    if (SET_HtmlAsEntity)
                    {
                        S0 = "&#" + "32" + ";";
                    }
                    else
                    {
                        S0 = NumToChar(32);
                    }
                }
                X_[0] = (EmojiF ? NumToHtml(T, Sel, Slots, 15) : "");
                X_[1] = (Emoji0 ? NumToHtml(T, Sel, Slots,  0) : "");
                X_[2] = (EmojiG ? NumToHtml(T, Sel, Slots, 16) : "");
                X_[3] = (Emoji1 ? NumToHtml(T, Sel, Slots,  1) : "");
                X_[4] = (Emoji2 ? NumToHtml(T, Sel, Slots,  2) : "");
                X_[5] = (Emoji3 ? NumToHtml(T, Sel, Slots,  3) : "");
            }
            var WasChar = false;
            for (var I = 0; I < 6; I++)
            {
                if (X_[I] != "")
                {
                    if (WasChar)
                    {
                        X = X + S0;
                    }
                    WasChar = true;
                }
                X = X + X_[I];
            }
            if (EmojiV != 2)
            {
                X = NumToHtmlLines(X);
            }
        }
        else
        {
            X = NumToHtmlLines(NumToHtml(T, Sel, Slots, 0));
        }
        return X;
    }

    if (EmojiMode == 0)
    {
        var Imin = CurrentCodeMinPos();
        var Imax = CurrentCodeMaxPos();
        for (I = Imin; I <= Imax; I++)
        {
            var C_ = (Slots > 0) ? CurrentCodeGetIdx(I) : -1;
            if (CurrentCodeI == I)
            {
                C_ = T;
            }
		    var CharList = GetCharByKey(C_);
		    for (var II = 0; II < CharList.length; II++)
		    {
                if (SET_HtmlAsEntity)
                {
                    X = X + "&#" + CharList[II] + ";";
                }
                else
                {
                    X = X + NumToChar(CharList[II]);
                }
		    }
        }
    }
    else
    {
	    var CharList = GetCharByKey(T);
	    if (EmojiMode == 1)
	    {
	        CharList.push(0xFE00);
	    }
	    if (EmojiMode == 2)
	    {
	        CharList.push(0xFE01);
	    }
	    if (EmojiMode == 3)
	    {
	        CharList.push(0xFE02);
	    }
	    if (EmojiMode == 15)
	    {
	        CharList.push(0xFE0E);
	    }
	    if (EmojiMode == 16)
	    {
	        CharList.push(0xFE0F);
	    }
	    for (var II = 0; II < CharList.length; II++)
	    {
            if (SET_HtmlAsEntity)
            {
                X = X + "&#" + CharList[II] + ";";
            }
            else
            {
                X = X + NumToChar(CharList[II]);
            }
	    }
    }
    
    var Format1 = "";
    var Format2 = "";

    if (SET_FontB)
    {
        Format1 = "<strong>" + Format1;
        Format2 = Format2 + "</strong>";
    }
    if (SET_FontI)
    {
        Format1 = "<em>" + Format1;
        Format2 = Format2 + "</em>";
    }
    if (SET_FontU)
    {
        Format1 = "<u>" + Format1;
        Format2 = Format2 + "</u>";
    }
    if (SET_FontS)
    {
        Format1 = "<strike>" + Format1;
        Format2 = Format2 + "</strike>";
    }

    if (((SET_DisplayMode) && (!Sel)) || ((!SET_DisplayMode) && (Sel)))
    {
        X = "<span class=\"dispcharselx\">" + TextToHtmlSp(SET_Prefix) + "</span><span class=\"dispcharsel\">" + X + "</span><span class=\"dispcharselx\">" + TextToHtmlSp(SET_Suffix) + "</span>";
    }
    else
    {
        X = "<span class=\"dispcharx\">" + TextToHtmlSp(SET_Prefix) + "</span><span class=\"dispchar\">" + X + "</span><span class=\"dispcharx\">" + TextToHtmlSp(SET_Suffix) + "</span>";
    }


    return Format1 + X + Format2;
}



// New cell in character table
function NewCell(TblR, N)
{
    var TblC = TblR.insertCell(N);
    TblC.align = "center";
    TblC.vAlign = "center";
    return TblC;
}

// Character names
var CharNames = [];

// Block names
var BlockNames = [];
var BlockNamesL = 0;

// Complex names
var ComplexNames = [];
var ComplexNamesL = 0;

// Generation table and initializing other elements
function Create()
{
    CurrentLoad();
    FillCharNames(CharNames);
    FillBlockNames(BlockNames);
    BlockNamesL = BlockNames.length;
    FillComplexNames(ComplexNames);
    FillComplexCodes();
    FillComplexSuffix(ComplexSuffixCodes);
    ComplexNamesL = ComplexNames.length;

    var Tbl = document.getElementById("UniTable");
    var TblR = Tbl.insertRow(0);
    var TblC = NewCell(TblR, 0);
    TblC.className = "head";
    TblC.innerHTML = "&nbsp;";
    TblC.onclick = new Function("CharInfoPage(-1);");
    for (var I = 0; I < 16; I++)
    {
        TblC = NewCell(TblR, -1);
        TblC.className = "head";
        TblC.innerHTML = "_" + I.toString(16).toUpperCase();
        TblC.onclick = new Function("CharInfoPage(-1);");
    }
    TblC = NewCell(TblR, -1);
    TblC.className = "head";
    TblC.innerHTML = "&nbsp;";
    TblC.onclick = new Function("CharInfoPage(-1);");

    for (var I = 0; I < 16; I++)
    {
        TblR = Tbl.insertRow(-1);
        TblC = NewCell(TblR, 0);
        TblC.className = "head";
        TblC.innerHTML = I.toString(16).toUpperCase() + "_";
        TblC.onclick = new Function("CharInfoPage(-1);");
        for (var J = 0; J < 16; J++)
        {
            TblC = NewCell(TblR, -1);
            TblC.innerHTML = "X";
            TblC.onclick = new Function("CharInfoPage(" + (I * 16 + J) + ");");
        }
        TblC = NewCell(TblR, 17);
        TblC.className = "head";
        TblC.innerHTML = I.toString(16).toUpperCase() + "_";
        TblC.onclick = new Function("CharInfoPage(-1);");
    }

    var TblR = Tbl.insertRow(17);
    var TblC = NewCell(TblR, 0);
    TblC.className = "head";
    TblC.innerHTML = "&nbsp;";
    TblC.onclick = new Function("CharInfoPage(-1);");
    for(var I=0; I<16; I++)
    {
        TblC = NewCell(TblR, -1);
        TblC.className = "head";
        TblC.innerHTML = "_" + I.toString(16).toUpperCase();
        TblC.onclick = new Function("CharInfoPage(-1);");
    }
    TblC = NewCell(TblR, -1);
    TblC.className = "head";
    TblC.innerHTML = "&nbsp;";
    TblC.onclick = new Function("CharInfoPage(-1);");

    ModuleInit();
    ComplexEmojiBtn();
    HtmlAsEntityOptBtn();
    AutoClearSlotsBtn();
    CharInfoDisplayCodeSet(-1);
}

// Previous page/plane
function PagePrev(X)
{
    var C = CurrentCodeGet();
    if (C < 0)
    {
        if ((X == 1) || (X == 2))
        {
            C = (0 - C) - ((0 - C) & 255) + 255;
        }
        else
        {
            if (X == 3) { C += 256; }
            if (X == 4) { C += 4096; }
            if (X == 5) { C += 65536; }

            if (C >= 0)
            {
                C = -1;
            }
        }
    }
    else
    {
        if (X == 1) { C -= 1; }
        if (X == 2) { C -= 16; }
        if (X == 3) { C -= 256; }
        if (X == 4) { C -= 4096; }
        if (X == 5) { C -= 65536; }

        if (C < 0)
        {
            C = 0;
        }
    }

    CurrentCodeSet(C);
    DisplayCurrent();
}

// Next page/plane
function PageNext(X)
{
    var C = CurrentCodeGet();
    if (C < 0)
    {
        if ((X == 1) || (X == 2))
        {
            C = (0 - C) - ((0 - C) & 255);
        }
        else
        {
            if (X == 3) { C -= 256; }
            if (X == 4) { C -= 4096; }
            if (X == 5) { C -= 65536; }
        }

        if (C < (0 - (1 + (255 * 256) + (16 * 65536))))
        {
            C = 0 - (1 + (255 * 256) + (16 * 65536));
        }
    }
    else
    {
        if (X == 1) { C += 1; }
        if (X == 2) { C += 16; }
        if (X == 3) { C += 256; }
        if (X == 4) { C += 4096; }
        if (X == 5) { C += 65536; }

        if (C >= (255 + (255 * 256) + (16 * 65536)))
        {
            C = (255 + (255 * 256) + (16 * 65536));
        }
    }

    CurrentCodeSet(C);
    DisplayCurrent();
}

// Displaying current page
function PageDisp()
{
    SettingsSet();
    DisplayCurrent();
}


function Zoom0()
{
    SET_FontSize = document.getElementById("xSET_FontSize").value;
    SET_FontSizeX = document.getElementById("xSET_FontSizeX").value;
    SettingsSave();
    DisplayCurrent();
}


function CharInfoPage(C)
{
    if (C >= 0)
    {
        if (CurrentCodeGet() < 0)
        {
            let C_ = 0 - CurrentCodeGet();
            C_ = C_ - (C_ % 256);
            CurrentCodeSet(C + C_);
        }
        DispCharPage(C + CurrentCodeGet() - (CurrentCodeGet() % 256));
    }
    else
    {
        let PageVal = (CurrentCodeGet() - (CurrentCodeGet() % 256));
        if (PageVal >= 0)
        {
            DispCharPage(0 - PageVal - 1);
        }
    }
}

function ReplaceAll(X, F, T)
{
    return X.split(F).join(T);
}

function TextToHtml(X)
{
    X = ReplaceAll(X, "&", "&amp;");
    X = ReplaceAll(X, "\"", "&quot;");
    X = ReplaceAll(X, "\'", "&apos;");
    X = ReplaceAll(X, "<", "&lt;");
    X = ReplaceAll(X, ">", "&gt;");
    X = ReplaceAll(X, "\n", "<br>");
    return X;
}

function TextToHtmlSp(X)
{
    X = ReplaceAll(X, "&", "&amp;");
    X = ReplaceAll(X, "\"", "&quot;");
    X = ReplaceAll(X, "\'", "&apos;");
    X = ReplaceAll(X, "<", "&lt;");
    X = ReplaceAll(X, ">", "&gt;");
    X = ReplaceAll(X, " ", "&nbsp;");
    X = ReplaceAll(X, "\n", "<br>");
    return X;
}


function DispTextCode()
{
    var X = document.getElementById("CharCode").value;
    
    var ValidCode = true;
    var NegaCode1 = false;
    var NegaCode2 = false;
    var NewNum = 0;
    for (var I = 0; I < X.length; I++)
    {
        NewNum = NewNum * 16;
        switch (X[I])
        {
            default: ValidCode = false; break;
            case "_":
            case "*":
            case "-":
                if (I < (X.length - 2)) { ValidCode = false; }
                if (I == (X.length - 2)) { NegaCode1 = true; }
                if (I == (X.length - 1)) { NegaCode2 = true; }
                break;
            case "0": NewNum += 0; break;
            case "1": NewNum += 1; break;
            case "2": NewNum += 2; break;
            case "3": NewNum += 3; break;
            case "4": NewNum += 4; break;
            case "5": NewNum += 5; break;
            case "6": NewNum += 6; break;
            case "7": NewNum += 7; break;
            case "8": NewNum += 8; break;
            case "9": NewNum += 9; break;
            case "A": NewNum += 10; break;
            case "a": NewNum += 10; break;
            case "B": NewNum += 11; break;
            case "b": NewNum += 11; break;
            case "C": NewNum += 12; break;
            case "c": NewNum += 12; break;
            case "D": NewNum += 13; break;
            case "d": NewNum += 13; break;
            case "E": NewNum += 14; break;
            case "e": NewNum += 14; break;
            case "F": NewNum += 15; break;
            case "f": NewNum += 15; break;
        }
    }
    if ((NegaCode1 != NegaCode2) || (X.length == 0))
    {
        ValidCode = false;
    }
    if (ValidCode)
    {
        if ((NewNum > 0x10FFFF))
        {
            ValidCode = false;
        }
    }
    if (ValidCode)
    {
        if (NegaCode1)
        {
            NewNum = NewNum - (NewNum & 255) + 1;
            NewNum = 0 - NewNum;
        }
        DispCharPage(NewNum);
    }
    else
    {
        DispCharPage(CurrentCodeGet());
    }
}


function DispCharPageS(T)
{
    if (SET_AutoClearSlots)
    {
        CurrentSetSlot(-3);
    }
    return DispCharPage(T);
}


// Getting page with specified character number
function DispCharPage(T)
{
    CurrentCodeSet(T);
    DisplayCurrent();
    return false;
}

var SearchTableItemsCode = [];
var SearchTableItemsType = [];
var SearchTableItemsMark = ["", "&nbsp;", "+", "-", "-"];

// Searching for characters
function FindChar(FindMode)
{
    // Getting character list object
    var Tbl = document.getElementById("SearchTable");

    // Clearing the table
    var RowCount = Tbl.rows.length;
    while (RowCount > 0)
    {
        Tbl.deleteRow(0);
        RowCount--;
    }


    // Aquiring search phrase
    var SearchPhrase = "";
    if (FindMode >= 0)
    {
        // If there is clear only
        if (FindMode == 0)
        {
            document.getElementById("FormCharFind").value = "";
            DataSet(SettingsPrefix + "FindCharStateText", "");
            DataSetI(SettingsPrefix + "FindCharStateMode", 0);
            return;
        }

        SearchPhrase = document.getElementById("FormCharFind").value;
        FindCharStateText = SearchPhrase;
        FindCharStateMode = FindMode;
        DataSet(SettingsPrefix + "FindCharStateText", FindCharStateText);
        DataSetI(SettingsPrefix + "FindCharStateMode", FindCharStateMode);
    }
    else
    {
        SearchPhrase = FindCharStateText;
        FindMode = FindCharStateMode;
        document.getElementById("FormCharFind").value = SearchPhrase;
    }
    if ((SearchPhrase.length == 0) || (FindMode == 0))
    {
        return;
    }
    
    // Find result process mode
    let FindModeResult = 0;

    // Character list header
    InsertHeaderToList(Tbl, 0);

    var I = 1;
    var CharList = [];
    let CharNot = "~!";
    let SearchPhraseBucket = [];

    // Split text into chars
    if (FindMode == 1)
    {
        CharList = TextToChars(SearchPhrase);
    }

    // Parse hex code
    if ((FindMode == 3) || (FindMode == 4) || (FindMode == 5))
    {
        CharList = CodeToChars(SearchPhrase, FindMode - 2);
    }

    if ((FindMode == 1) || (FindMode == 3) || (FindMode == 4) || (FindMode == 5))
    {
        var CharType = [];
        
        if (CharList.length != 1)
        {
        	FindComplex(CharList, CharType);
        	FindModeResult = 1;
        }
        else
        {
            FindModeResult = AsciiCharFindCreate(parseInt(CharList[0]), SearchPhraseBucket);
            if (FindModeResult == 1)
            {
                for (let I = 3; I < SearchPhraseBucket[0].length; I++)
                {
                    CharList.push(SearchPhraseBucket[0][I]);
                    CharType.push(1);
                }
                for (let I = 0; I < 10; I++)
                {
                    CharType.push(1);
                }
                SearchPhraseBucket = [];
            }
        }        
    }

    if (FindMode == 2)
    {
        let SearchPhraseArray = [];
        let SearchPhraseQ = false;
        let SearchPhraseItem = "";
        let SearchPhraseArrayT = [];
        for (let II = 0; II < SearchPhrase.length; II++)
        {
            let C = SearchPhrase.toUpperCase().charAt(II);
            if (C == "\"")
            {
                SearchPhraseQ = !SearchPhraseQ;
            }
            else
            {
                if ((C == " ") && (!SearchPhraseQ))
                {
                    if (SearchPhraseItem != "")
                    {
                        SearchPhraseArray.push(SearchPhraseItem);
                        SearchPhraseItem = "";
                    }
                }
                else
                {
                    SearchPhraseItem = SearchPhraseItem + C;
                }
            }
        }
        if (SearchPhraseItem != "")
        {
            SearchPhraseArray.push(SearchPhraseItem);
            SearchPhraseItem = "";
        }
        
        for (var II = 0; II < SearchPhraseArray.length; II++)
        {
            if (SearchPhraseArray[II].length > 0)
            {
                if (CharNot.indexOf(SearchPhraseArray[II].substr(0, 1)) >= 0)
                {
                    if (SearchPhraseArray[II].length > 1)
                    {
                        SearchPhraseArrayT[II] = 2;
                        SearchPhraseArray[II] = SearchPhraseArray[II].substr(1);
                    }
                    else
                    {
                        SearchPhraseArrayT[II] = 0;
                    }
                }
                else
                {
                    SearchPhraseArrayT[II] = 1;
                }
            }
            else
            {
                SearchPhraseArrayT[II] = 0;
            }
        }
        
        SearchPhraseBucket.push(SearchPhraseArray);
        SearchPhraseBucket.push(SearchPhraseArrayT);
        SearchPhraseBucket.push(SearchPhraseArray.length);
        
        FindModeResult = 3;
    }

    // Process list directly
    if (FindModeResult == 1)
    {
        var II = 1;
        for (I = 0; I < CharList.length; I++)
        {
            SearchTableItemsCode[II] = CharList[I];
            SearchTableItemsType[II] = CharType[I];
            var Key = CharList[I];
            InsertCharToList(Tbl, II, Key);
            II++;
        }
        I = II - 1;
    }

    // Search Unicode character list
    if ((FindModeResult == 2) || (FindModeResult == 3))
    {
        let SearchPhraseBucketL = SearchPhraseBucket.length;

        if (FindModeResult == 2)
        {
            AsciiCharList = [SearchPhrase, CharList[0]];
        }
        else
        {
            AsciiCharList = [SearchPhrase, -1];
        }

        let CodeInclude = [];
        let CodeExclude = [];
        for (let BucketI = 0; BucketI < SearchPhraseBucketL; BucketI += 3)        
        {
            for (var II = 0; II < SearchPhraseBucket[BucketI + 2]; II++)
            {
                if (SearchPhraseBucket[BucketI + 1][II] == 3)
                {
                    CodeInclude.push((SearchPhraseBucket[BucketI + 0][II]));
                }
                if (SearchPhraseBucket[BucketI + 1][II] == 4)
                {
                    CodeExclude.push((SearchPhraseBucket[BucketI + 0][II]));
                }
            }
        }

        for (var Key in CharNames)
        {
            let ItemMatched = false;
            var CharNameItem = CharNames[Key];
            var CharNameItemI = (CharNot[0] + " " + CharNameItem[0] + " " + CharNot[0] + " " + CharNameItem[1] + " " + CharNot[0] + " " + CharNameItem[2] + " " + CharNot[0]).toUpperCase();

            for (let BucketI = 0; BucketI < SearchPhraseBucketL; BucketI += 3)        
            {
                var Match0 = 0;
                var Match1 = 0;
                
                if (CodeInclude.indexOf(CharNumToHex(parseInt(Key))) >= 0)
                {
                    Match0 = 1;
                    Match1 = 1;
                }
                else
                {
                    if (CodeExclude.indexOf(CharNumToHex(parseInt(Key))) < 0)
                    {
                        for (var II = 0; II < SearchPhraseBucket[BucketI + 2]; II++)
                        {
                            if (SearchPhraseBucket[BucketI + 1][II] == 1)
                            {
                                Match0++;
                                if (CharNameItemI.indexOf(SearchPhraseBucket[BucketI + 0][II]) >= 0)
                                {
                                    Match1++;
                                }
                            }
                            if (SearchPhraseBucket[BucketI + 1][II] == 2)
                            {
                                Match0++;
                                if (CharNameItemI.indexOf(SearchPhraseBucket[BucketI + 0][II]) < 0)
                                {
                                    Match1++;
                                }
                            }
                        }
                    }
                }
                
                if ((Match1 == Match0) & (Match0 > 0))
                {
                    ItemMatched = true;
                    BucketI = SearchPhraseBucketL;
                }
            }
            
            if (ItemMatched)
            {
                AsciiCharList.push(parseInt(Key));

                SearchTableItemsCode[I] = parseInt(Key);
                SearchTableItemsType[I] = 1;
                InsertCharToList(Tbl, I, parseInt(Key));
                I++;
            }
        }

        if (FindModeResult == 2)
        {
            AsciiCharMapCreate();
        }
        
        if (FindModeResult == 3)
        {
            for (var Key in ComplexNames)
            {
                var ComplexNameItem = ComplexNames[Key];
                var Match = 0;
                
                var ComplexNameItemI = (CharNot[0] + ComplexNameItem[0] + CharNot[0] + ComplexNameItem[1] + CharNot[0] + ComplexNameItem[2] + CharNot[0]).toUpperCase();
                for (var II = 0; II < SearchPhraseBucket[2]; II++)
                {
                    if ((SearchPhraseBucket[1][II] == 0))
                    {
                        Match++;
                    }
                    if ((SearchPhraseBucket[1][II] == 1) && (ComplexNameItemI.indexOf(SearchPhraseBucket[0][II]) >= 0))
                    {
                        Match++;
                    }
                    if ((SearchPhraseBucket[1][II] == 2) && (ComplexNameItemI.indexOf(SearchPhraseBucket[0][II]) < 0))
                    {
                        Match++;
                    }
                }
                
                if ((Match == SearchPhraseBucket[2]) & (Match > 0))
                {
                    SearchTableItemsCode[I] = parseInt(Key) + ComplexKey;
                    SearchTableItemsType[I] = 2;
                    InsertCharToList(Tbl, I, parseInt(Key) + ComplexKey);
                    I++;
                    for (var III = 0; III < ComplexNameItem[6]; III++)
                    {
                        SearchTableItemsCode[I] = ComplexNameItem[7][III];
                        SearchTableItemsType[I] = 3;
                        InsertCharToList(Tbl, I, ComplexNameItem[7][III]);
                        I++;
                    }
                }
            }
        }        
        I--;
    }

    SearchTableItemsCode[I + 1] = 0;
    SearchTableItemsType[I + 1] = 0;
    InsertHeaderToList(Tbl, I + 1);
}

function InsertHeaderToList(Tbl, I)
{
    var TblRow = Tbl.insertRow(I);
    TblRow.insertCell(0);
    TblRow.insertCell(1);
    TblRow.insertCell(2);
    TblRow.insertCell(3);
    TblRow.insertCell(4);
    TblRow.insertCell(5);
    TblRow.insertCell(6);
    TblRow.insertCell(7);
    TblRow.cells[0].align = "center";
    TblRow.cells[1].align = "center";
    TblRow.cells[2].align = "center";
    TblRow.cells[3].align = "center";
    TblRow.cells[4].align = "center";
    TblRow.cells[5].align = "center";
    TblRow.cells[6].align = "center";
    TblRow.cells[7].align = "center";
    TblRow.cells[0].vAlign = "center";
    TblRow.cells[1].vAlign = "center";
    TblRow.cells[2].vAlign = "center";
    TblRow.cells[3].vAlign = "center";
    TblRow.cells[4].vAlign = "center";
    TblRow.cells[5].vAlign = "center";
    TblRow.cells[6].vAlign = "center";
    TblRow.cells[7].vAlign = "center";
    TblRow.cells[0].className = "head";
    TblRow.cells[1].className = "head";
    TblRow.cells[2].className = "head";
    TblRow.cells[3].className = "head";
    TblRow.cells[4].className = "head";
    TblRow.cells[5].className = "head";
    TblRow.cells[6].className = "head";
    TblRow.cells[7].className = "head";
    TblRow.cells[0].innerHTML = "&nbsp;#&nbsp;";
    TblRow.cells[1].innerHTML = "Hex";
    TblRow.cells[2].innerHTML = "Dec";
    TblRow.cells[3].innerHTML = "Char";
    TblRow.cells[4].innerHTML = "Block";
    TblRow.cells[5].innerHTML = "Name";
    TblRow.cells[6].innerHTML = "Other name";
    TblRow.cells[7].innerHTML = "&nbsp;#&nbsp;";
}

function InsertCharToList(Tbl, I, Key)
{
    var CharData = GetCharData(Key);
    var TblRow = Tbl.insertRow(I);
    var II;
    TblRow.insertCell(0);
    TblRow.insertCell(1);
    TblRow.insertCell(2);
    TblRow.insertCell(3);
    TblRow.insertCell(4);
    TblRow.insertCell(5);
    TblRow.insertCell(6);
    TblRow.insertCell(7);
    TblRow.cells[0].align = "center";
    TblRow.cells[1].align = "center";
    TblRow.cells[2].align = "center";
    TblRow.cells[3].align = "center";
    TblRow.cells[4].align = "center";
    TblRow.cells[5].align = "center";
    TblRow.cells[6].align = "center";
    TblRow.cells[7].align = "center";
    TblRow.cells[0].vAlign = "center";
    TblRow.cells[1].vAlign = "center";
    TblRow.cells[2].vAlign = "center";
    TblRow.cells[3].vAlign = "center";
    TblRow.cells[4].vAlign = "center";
    TblRow.cells[5].vAlign = "center";
    TblRow.cells[6].vAlign = "center";
    TblRow.cells[7].vAlign = "center";
    TblRow.cells[0].innerHTML = "<span onClick=\"RowExpandCollapse(" + I + ");\" href=\"#\">X</span>";
    TblRow.cells[1].innerHTML = "<span onClick=\"DispCharPageS(" + Key + ");\" href=\"#\">" + CharNumToHex(Key) + "</span>";
    TblRow.cells[2].innerHTML = "<span onClick=\"DispCharPageS(" + Key + ");\" href=\"#\">" + CharNumToDec(Key) + "</span>";
    TblRow.cells[3].innerHTML = "<span onClick=\"DispCharPageS(" + Key + ");\" href=\"#\">" + NumToHtml(Key, false, 0, -1) + "</span>";
    TblRow.cells[4].innerHTML = "<span onClick=\"DispCharPageS(" + Key + ");\" href=\"#\">" + (CharData[0] != "" ? TextToHtml(CharData[0]) : "&nbsp;") + "</span>";
    TblRow.cells[5].innerHTML = "<span onClick=\"DispCharPageS(" + Key + ");\" href=\"#\">" + (CharData[1] != "" ? TextToHtml(CharData[1]) : "&nbsp;") + "</span>";
    TblRow.cells[6].innerHTML = "<span onClick=\"DispCharPageS(" + Key + ");\" href=\"#\">" + (CharData[2] != "" ? TextToHtml(CharData[2]) : "&nbsp;") + "</span>";
    TblRow.cells[7].innerHTML = "<span onClick=\"RowExpandCollapse(" + I + ");\" href=\"#\">X</span>";
    TblRow.cells[0].innerHTML = SearchTableItemsMark[SearchTableItemsType[I]];
    TblRow.cells[7].innerHTML = SearchTableItemsMark[SearchTableItemsType[I]];
    TblRow.cells[0].onclick = new Function("RowExpandCollapse(" + I + ");");
    TblRow.cells[1].onclick = new Function("DispCharPageS(" + Key + ");");
    TblRow.cells[2].onclick = new Function("DispCharPageS(" + Key + ");");
    TblRow.cells[3].onclick = new Function("DispCharPageS(" + Key + ");");
    TblRow.cells[4].onclick = new Function("DispCharPageS(" + Key + ");");
    TblRow.cells[5].onclick = new Function("DispCharPageS(" + Key + ");");
    TblRow.cells[6].onclick = new Function("DispCharPageS(" + Key + ");");
    TblRow.cells[7].onclick = new Function("RowExpandCollapse(" + I + ");");
    TblRow.cells[3].style.fontFamily = XFontName;
    switch (SearchTableItemsType[I])
    {
        case 1:
        case 2:
            TblRow.style.display = "";
            TblRow.style.display = "";
            break;
        case 3:
            II = I;
            while (SearchTableItemsType[II] == 3)
            {
                Tbl.rows[II].cells[0].style.display = "none";
                Tbl.rows[II].cells[7].style.display = "none";
                II--;
            }
            II++;
            Tbl.rows[II].cells[0].style.display = "";
            Tbl.rows[II].cells[7].style.display = "";
            Tbl.rows[II].cells[0].rowSpan = (I - II + 1);
            Tbl.rows[II].cells[7].rowSpan = (I - II + 1);
            TblRow.style.display = "none";
            break;
    }
}


function RowExpandCollapse(N)
{
    var Tbl = document.getElementById("SearchTable");
    var I = N + 1;
    switch (SearchTableItemsType[N])
    {
        case 2:
            SearchTableItemsType[N] = 4;
            Tbl.rows[N].style.display = "none";
            while (SearchTableItemsType[I] == 3)
            {
                Tbl.rows[I].style.display = "";
                I++;
            }
            break;
        case 3:
            while (SearchTableItemsType[N] == 3)
            {
                N--;
            }
            I = N + 1;
            Tbl.rows[N].style.display = "";
            SearchTableItemsType[N] = 2;
            while (SearchTableItemsType[I] == 3)
            {
                Tbl.rows[I].style.display = "none";
                I++;
            }
            break;
        case 4:
            SearchTableItemsType[N] = 2;
            while (SearchTableItemsType[I] == 3)
            {
                Tbl.rows[I].style.display = "none";
                I++;
            }
            break;
    }
}


// Inserting the text in the text box
function InsertAtCursor(myField, myValue)
{
    //IE support
    if (document.selection)
    {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0')
    {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = endPos + myValue.length;
    }
    else
    {
        myField.value += myValue;
    }
}

function Repaint()
{
    var WriteBox = document.getElementById("WriteBox");
    WriteBox.style.fontFamily = XFontName;
    WriteBox.style.fontSize = SET_WriteBoxFontSize + "pt";
    if (SET_FontB)
    {
        WriteBox.style["font-weight"] = "bold";
    }
    else
    {
        WriteBox.style["font-weight"] = "normal";
    }
    if (SET_FontI)
    {
        WriteBox.style["font-style"] = "italic";
    }
    else
    {
        WriteBox.style["font-style"] = "normal";
    }
    if (SET_FontU)
    {
        if (SET_FontS)
        {
            WriteBox.style["text-decoration"] = "underline line-through";
        }
        else
        {
            WriteBox.style["text-decoration"] = "underline";
        }
    }
    else
    {
        if (SET_FontS)
        {
            WriteBox.style["text-decoration"] = "line-through";
        }
        else
        {
            WriteBox.style["text-decoration"] = "none";
        }
    }
    WriteBox.rows = SET_WriteBoxRows;
    WriteBox.cols = SET_WriteBoxCols;



    var Tbl = document.getElementById("SearchTable");
    var RowCount = Tbl.rows.length;
    if (RowCount > 2)
    {
        for (var I = 1; I < (RowCount - 1); I++)
        {
            var TblRow = Tbl.rows[I];
            TblRow.cells[3].innerHTML = "<span onClick=\"DispCharPage(" + SearchTableItemsCode[I] + ");\">" + NumToHtml(SearchTableItemsCode[I], false, 0, -1) + "</span>";
            TblRow.cells[3].style.fontFamily = XFontName;
        }
    }
}

function AutoClearSlotsBtn()
{
    document.getElementById("xSET_AutoClearSlots1").value = "Yes";
    document.getElementById("xSET_AutoClearSlots0").value = "No";
    if (SET_AutoClearSlots == 1)
    {
        document.getElementById("xSET_AutoClearSlots1").value = "[Yes]";
    }
    if (SET_AutoClearSlots == 0)
    {
        document.getElementById("xSET_AutoClearSlots0").value = "[No]";
    }
}

function AutoClearSlotsOpt(X)
{
    SET_AutoClearSlots = X;
    SettingsSave();
    AutoClearSlotsBtn();
}


function HtmlAsEntityOptBtn()
{
    document.getElementById("xSET_HtmlAsEntity1").value = "Entity";
    document.getElementById("xSET_HtmlAsEntity0").value = "Raw";
    if (SET_HtmlAsEntity == 1)
    {
        document.getElementById("xSET_HtmlAsEntity1").value = "[Entity]";
    }
    if (SET_HtmlAsEntity == 0)
    {
        document.getElementById("xSET_HtmlAsEntity0").value = "[Raw]";
    }
}

// Change HTML display mode
function HtmlAsEntityOpt(X)
{
    SET_HtmlAsEntity = X;
    HtmlAsEntityOptBtn();
    SettingsSave();
    Repaint();
    DisplayCurrent();
}

// Clear text box
function WriteBoxClear()
{
    document.getElementById("WriteBox").value = "";
    CurrentSaveWB();
}

// Write character into text box
function WriteBoxChar(X)
{
    let WriteBox = document.getElementById("WriteBox");

    let C = "";
    
    if (Math.abs(X) == 1)
    {
        C = "\n";
    }
    
    if ((Math.abs(X) == 2) || (Math.abs(X) == 3))
    {
        C = "";
        for (let I = CurrentCodeMin; I <= CurrentCodeMax; I++)
        {
            let C_ = CurrentCodeGetIdx(I);
            if (C_ >= 0)
            {
                if (AsciiNonPrint.indexOf(C_) < 0)
                {
                    C = C + NumToChar(C_);
                }
                else
                {
                    C = C + NumToChar(AsciiCharDefault);
                }
            }
        }
    }
    if (Math.abs(X) == 3)
    {
        C = SET_Prefix + C + SET_Suffix;
    }

    if ((Math.abs(X) >= 4) && (Math.abs(X) <= 6))
    {
        let PageSep = 0;
        if (Math.abs(X) == 4) PageSep = 16;
        if (Math.abs(X) == 5) PageSep = 32;
        if (Math.abs(X) == 6) PageSep = 64;
        let CX = "";
        let PageOffset = CurrentCodeGet() >> 8;
        PageOffset = PageOffset << 8;
        for (let PageI = 0; PageI <= 255; PageI++)
        {
            C = "";
            for (let I = CurrentCodeMin; I <= CurrentCodeMax; I++)
            {
                let C_ = CurrentCodeGetIdx(I);
                if (I == CurrentCodeI)
                {
                    C_ = PageOffset + PageI;
                }
                if (C_ >= 0)
                {
                    if (AsciiNonPrint.indexOf(C_) < 0)
                    {
                        C = C + NumToChar(C_);
                    }
                    else
                    {
                        C = C + NumToChar(AsciiCharDefault);
                    }
                }
            }
            CX = CX + SET_Prefix + C + SET_Suffix;
            if ((PageI > 0) && ((PageI % PageSep) == (PageSep - 1)))
            {
                CX = CX + "\n";
            }
        }
    
        C = CX;
    
        //C = SET_Prefix + CurrentCodeI + SET_Suffix;
    }

    if (X < 0)
    {
        WriteBox.value = C + WriteBox.value;
    }
    if (X > 0)
    {
        WriteBox.value = WriteBox.value + C;
    }
    CurrentSaveWB();
}

// Change text box size
function WriteBoxSize(X)
{
    SET_WriteBoxFontSize = document.getElementById("xSET_WriteBoxFontSize").value;
    var N = 1;
    if (X < 0)
    {
        N = -1;
        X = 0 - X;
    }
    if (X == 0) { SET_WriteBoxRows--; }
    if (X == 1) { SET_WriteBoxRows++; }
    if (X == 2) { SET_WriteBoxCols--; }
    if (X == 3) { SET_WriteBoxCols++; }
    if (X == 4) { SET_WriteBoxFontSize--; }
    if (X == 5) { SET_WriteBoxFontSize++; }
    SettingsSave();
    var WriteBox = document.getElementById("WriteBox");
    WriteBox.rows = SET_WriteBoxRows;
    WriteBox.cols = SET_WriteBoxCols;
    WriteBox.style.fontSize = SET_WriteBoxFontSize + "pt";
    document.getElementById("xSET_WriteBoxFontSize").value = SET_WriteBoxFontSize;
}

// Copy font code from text box to "Font family" field
function WriteBoxToFont()
{
    var X = document.getElementById("WriteBox").value.split('\n');
    var F = "";
    for (var I = 0; I < X.length; I++)
    {
        F = F + X[I].trim();
    }

    SET_FontName = F;
    SettingsSave();
    document.getElementById("xSET_FontName").value = SET_FontName;
    SetFontStyle(0);
}

