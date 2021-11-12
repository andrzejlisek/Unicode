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

var FindCharStateText = DataGetDefault(SettingsPrefix + "FindCharStateText", "");
var FindCharStateMode = DataGetIDefault(SettingsPrefix + "FindCharStateMode", "");

var FontPresetN = ["Serif", "Sans", "Cursive", "Fantasy", "Mono"];
var FontPresetF = ["serif", "sans-serif", "cursive", "fantasy", "monospace"];

var XFontName = "";




var CurrentCode = [5, -1, -1, -1, -1, 0, -1, -1, -1, -1];







CurrentCode[0] = DataGetIDefault(SettingsPrefix + "CurrentCode0", 5);
CurrentCode[1] = DataGetIDefault(SettingsPrefix + "CurrentCode1", -1);
CurrentCode[2] = DataGetIDefault(SettingsPrefix + "CurrentCode2", -1);
CurrentCode[3] = DataGetIDefault(SettingsPrefix + "CurrentCode3", -1);
CurrentCode[4] = DataGetIDefault(SettingsPrefix + "CurrentCode4", -1);
CurrentCode[5] = DataGetIDefault(SettingsPrefix + "CurrentCode5", 32);
CurrentCode[6] = DataGetIDefault(SettingsPrefix + "CurrentCode6", -1);
CurrentCode[7] = DataGetIDefault(SettingsPrefix + "CurrentCode7", -1);
CurrentCode[8] = DataGetIDefault(SettingsPrefix + "CurrentCode8", -1);
CurrentCode[9] = DataGetIDefault(SettingsPrefix + "CurrentCode9", -1);

function CurrentCodeGet()
{
    return CurrentCode[CurrentCode[0]];
}

function CurrentCodeSet(C)
{
    CurrentCode[CurrentCode[0]] = C;
}


function CurrentFullCode(Hex)
{
    var C = "";
    for (var I = 1; I <= 9; I++)
    {
        if (CurrentCode[I] >= 0)
        {
            if (C != "")
            {
                C = C + "|";
            }
            if (I == CurrentCode[0])
            {
                C = C + "<b>";
            }
            if (Hex)
            {
                C = C + NumToHex(CurrentCode[I]);
            }
            else
            {
                C = C + NumToDec(CurrentCode[I]);
            }
            if (I == CurrentCode[0])
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


function CurrentSave()
{
    DataSetI(SettingsPrefix + "CurrentCode0", CurrentCode[0]);
    DataSetI(SettingsPrefix + "CurrentCode1", CurrentCode[1]);
    DataSetI(SettingsPrefix + "CurrentCode2", CurrentCode[2]);
    DataSetI(SettingsPrefix + "CurrentCode3", CurrentCode[3]);
    DataSetI(SettingsPrefix + "CurrentCode4", CurrentCode[4]);
    DataSetI(SettingsPrefix + "CurrentCode5", CurrentCode[5]);
    DataSetI(SettingsPrefix + "CurrentCode6", CurrentCode[6]);
    DataSetI(SettingsPrefix + "CurrentCode7", CurrentCode[7]);
    DataSetI(SettingsPrefix + "CurrentCode8", CurrentCode[8]);
    DataSetI(SettingsPrefix + "CurrentCode9", CurrentCode[9]);
}


function CurrentSaveWB()
{
    DataSet(SettingsPrefix + "CurrentWriteBox", document.getElementById("WriteBox").value);
}


function CurrentSetSlot(N)
{
    CurrentCode[0] = N;
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
    document.getElementById("xSET_FontB0").value = document.getElementById("xSET_FontB").value;
    document.getElementById("xSET_FontI0").value = document.getElementById("xSET_FontI").value;
    document.getElementById("xSET_FontU0").value = document.getElementById("xSET_FontU").value;
    document.getElementById("xSET_FontS0").value = document.getElementById("xSET_FontS").value;
    document.getElementById("xSET_FontN0").value = document.getElementById("xSET_FontN").value;

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
    
    for (var I = 1; I <= 9; I++)
    {
        var Temp = NumToHex(CurrentCode[I]);
        if (CurrentCode[0] == I)
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
                    UniTable.rows[I + 1].cells[II + 1].innerHTML = NumToHtml((C - (C & 255)) + (I << 4) + II, true);
                }
                else
                {
                    UniTable.rows[I + 1].cells[II + 1].className = Style0;
                    UniTable.rows[I + 1].cells[II + 1].innerHTML = NumToHtml((C - (C & 255)) + (I << 4) + II, false);
                }
            }
            else
            {
                UniTable.rows[I + 1].cells[II + 1].className = Style0;
                UniTable.rows[I + 1].cells[II + 1].innerHTML = NumToHtml(((0 - C) - ((0 - C) & 255)) + (I << 4) + II, false);
            }
        }
    }

    var ObjView = document.getElementById("CharView");

    ObjView.style.fontFamily = XFontName;
    ObjView.style.fontSize = SET_FontSizeX + "pt";
    ObjView.innerHTML = NumToHtml(C, false);

    var EOL = "<br />";
    var X = "";
    X += "Hex: " + CurrentFullCode(true) + EOL;
    X += "Dec: " + CurrentFullCode(false) + EOL;
    if (C >= 0)
    {
        if (C in CharNames)
        {
            var N = CharNames[C];
            var Block1 = N[6];
            var Block2 = N[7];
            if ((Block1 >= 0) && (Block2 >= 0))
            {
                X += "Block: " + TextToHtml(N[0]) + " (";
                X += "<a onclick=\"return DispCharPage(" + Block1 + ")\" href=\"#\">" + NumToHex(Block1) + "</a>";
                X += " - ";
                X += "<a onclick=\"return DispCharPage(" + Block2 + ")\" href=\"#\">" + NumToHex(Block2) + "</a>";
                X += ")";
                X += EOL;
            }
            if (N[2] != "")
            {
                X += "Name: " + TextToHtml(N[1]) + EOL;
                X += "Other name: " + TextToHtml(N[2]);
            }
            else
            {
                X += "Name: " + TextToHtml(N[1]);
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
        }
    }
    else
    {
        document.getElementById("CaseU").style["display"] = "none";
        document.getElementById("CaseL").style["display"] = "none";
        document.getElementById("CaseT").style["display"] = "none";
    }
    document.getElementById("CharCode1").value = NumToHex(C);
    document.getElementById("CharCode2").value = NumToHex(C);
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

// Change character number to HTML character display
function NumToHtml(T, Sel)
{
    var X = "";
    var I;
    
    for (I = 1; I <= 9; I++)
    {
        var C_ = CurrentCode[I];
        if (CurrentCode[0] == I)
        {
            C_ = T;
        }
        if (C_ >= 0)
        {
            if (SET_HtmlAsEntity)
            {
                X = X + "&#" + C_ + ";";
            }
            else
            {
                X = X + NumToChar(C_);
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


    I = SET_MarginTop;
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
    return Format1 + X + Format2;
}

// Zamiana numeru na znak
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

// Nowa komorka tabeli znakow
function NewCell(TblR, N)
{
    var TblC = TblR.insertCell(N);
    TblC.align = "center";
    TblC.vAlign = "center";
    return TblC;
}

// Nazwy znakow
var CharNames;

// Generowanie tabeli
function Create()
{
    CharNames = new Array();
    FillCharTable(CharNames);

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

    HtmlAsEntityOptBtn();
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

// Wyswietlanie wskazanej strony
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

// Powiekszenie
function ZoomI()
{
    SET_FontSize = document.getElementById("xSET_FontSize").value;
    SET_FontSize++;
    SettingsSave();
    document.getElementById("xSET_FontSize").value = SET_FontSize;
    DisplayCurrent();
}

// Pomniejszenie
function ZoomO()
{
    SET_FontSize = document.getElementById("xSET_FontSize").value;
    SET_FontSize--;
    SettingsSave();
    document.getElementById("xSET_FontSize").value = SET_FontSize;
    DisplayCurrent();
}

// Powiekszenie
function ZoomIX()
{
    SET_FontSizeX = document.getElementById("xSET_FontSizeX").value;
    SET_FontSizeX++;
    SettingsSave();
    document.getElementById("xSET_FontSizeX").value = SET_FontSizeX;
    DisplayCurrent();
}

// Pomniejszenie
function ZoomOX()
{
    SET_FontSizeX = document.getElementById("xSET_FontSizeX").value;
    SET_FontSizeX--;
    SettingsSave();
    document.getElementById("xSET_FontSizeX").value = SET_FontSizeX;
    DisplayCurrent();
}


function CharInfoPage(C)
{
    if (C >= 0)
    {
        if (CurrentCodeGet() < 0)
        {
            var C_ = 0 - CurrentCodeGet();
            C_ = C_ - (C_ % 256);
            CurrentCodeSet(C + C_);
        }
        DispCharPage(C + CurrentCodeGet() - (CurrentCodeGet() % 256));
    }
    else
    {
        DispCharPage(0 - (CurrentCodeGet() - (CurrentCodeGet() % 256)) - 1);
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
    return X;
}


function DispTextCode(N)
{
    var X = "";
    if (N == 1)
    {
        X = document.getElementById("CharCode1").value;
    }
    if (N == 2)
    {
        X = document.getElementById("CharCode2").value;
    }
    
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

// Dojscie do strony z podanym znakiem
function DispCharPage(T)
{
    CurrentCodeSet(T);
    DisplayCurrent();
    return false;
}

// Szukanie znaku
function FindChar(FindMode)
{
    // Pobieranie obiektu tabeli
    var Tbl = document.getElementById("SearchTable");

    // Usuniecie zawartosci tabeli
    var RowCount = Tbl.rows.length;
    while (RowCount > 0)
    {
        Tbl.deleteRow(0);
        RowCount--;
    }


    // Pobieranie frazy wyszukiwania
    var SearchPhrase = "";
    if (FindMode >= 0)
    {
        // Sprawdzanie, czy to jest tylko czyszczenie
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

    // Naglowek tabeli
    InsertHeaderToList(Tbl, 0);

    var I = 1;

    if (FindMode == 1)
    {
        var II = 1;
        for (I = 0; I < SearchPhrase.length; I++)
        {
            var Key = SearchPhrase.codePointAt(I);
            InsertCharToList(Tbl, II, Key);
            if (Key >= 65536)
            {
                I++;
            }
            II++;
        }
        I = II - 1;
    }

    // Przeszukiwanie tablicy znakow Unicode
    if (FindMode == 2)
    {
        if (false)
        {
            TestChar = [];
            for (var Key in CharNames)
            {
                for (var II = 0; II <= 2; II++)            
                {
                    var TestName = CharNames[Key][II];
                    for (var III = 0; III < TestName.length; III++)
                    {
                        if (TestChar.indexOf(TestName[III]) < 0)
                        {
                            TestChar.push(TestName[III]);
                        }
                    }
                }
            }
            TestChar.sort();        
            alert("[" + TestChar.join("|") + "]");
        }


        var CharNot = "~!";
        var SearchPhraseArray = SearchPhrase.toUpperCase().split(" ");
        var SearchPhraseArrayT = [];
        var SearchPhraseArrayL = SearchPhraseArray.length;
        for (var II = 0; II < SearchPhraseArrayL; II++)
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
        
        for (var Key in CharNames)
        {
            var CharNameItem = CharNames[Key];
            var Match = 0;
            
            CharNameItemI = (CharNot[0] + CharNameItem[0] + CharNot[0] + CharNameItem[1] + CharNot[0] + CharNameItem[2] + CharNot[0]).toUpperCase();
            for (var II = 0; II < SearchPhraseArrayL; II++)
            {
                if ((SearchPhraseArrayT[II] == 0))
                {
                    Match++;
                }
                if ((SearchPhraseArrayT[II] == 1) && (CharNameItemI.indexOf(SearchPhraseArray[II]) >= 0))
                {
                    Match++;
                }
                if ((SearchPhraseArrayT[II] == 2) && (CharNameItemI.indexOf(SearchPhraseArray[II]) < 0))
                {
                    Match++;
                }
            }
            
            if ((Match == SearchPhraseArrayL) & (Match > 0))
            {
                InsertCharToList(Tbl, I, parseInt(Key));
                I++;
            }
        }
        I--;
    }
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
    TblRow.cells[0].align = "center";
    TblRow.cells[1].align = "center";
    TblRow.cells[2].align = "center";
    TblRow.cells[3].align = "center";
    TblRow.cells[4].align = "center";
    TblRow.cells[5].align = "center";
    TblRow.cells[0].vAlign = "center";
    TblRow.cells[1].vAlign = "center";
    TblRow.cells[2].vAlign = "center";
    TblRow.cells[3].vAlign = "center";
    TblRow.cells[4].vAlign = "center";
    TblRow.cells[5].vAlign = "center";
    TblRow.cells[0].className = "head";
    TblRow.cells[1].className = "head";
    TblRow.cells[2].className = "head";
    TblRow.cells[3].className = "head";
    TblRow.cells[4].className = "head";
    TblRow.cells[5].className = "head";
    TblRow.cells[0].innerHTML = "Hex";
    TblRow.cells[1].innerHTML = "Dec";
    TblRow.cells[2].innerHTML = "Char";
    TblRow.cells[3].innerHTML = "Block";
    TblRow.cells[4].innerHTML = "Name";
    TblRow.cells[5].innerHTML = "Other name";
}

function InsertCharToList(Tbl, I, Key)
{
    var CharData;
    if (Key in CharNames)
    {
        CharData = CharNames[Key];
    }
    else
    {
        CharData = ["", "", "", -1, -1, -1];
    }
    var TblRow = Tbl.insertRow(I);
    TblRow.insertCell(0);
    TblRow.insertCell(1);
    TblRow.insertCell(2);
    TblRow.insertCell(3);
    TblRow.insertCell(4);
    TblRow.insertCell(5);
    TblRow.cells[0].align = "center";
    TblRow.cells[1].align = "center";
    TblRow.cells[2].align = "center";
    TblRow.cells[3].align = "center";
    TblRow.cells[4].align = "center";
    TblRow.cells[5].align = "center";
    TblRow.cells[0].vAlign = "center";
    TblRow.cells[1].vAlign = "center";
    TblRow.cells[2].vAlign = "center";
    TblRow.cells[3].vAlign = "center";
    TblRow.cells[4].vAlign = "center";
    TblRow.cells[5].vAlign = "center";
    TblRow.cells[0].innerHTML = "<span onClick=\"DispCharPage(" + Key + ");\" href=\"#\">" + NumToHex(Key) + "</span>";
    TblRow.cells[1].innerHTML = "<span onClick=\"DispCharPage(" + Key + ");\" href=\"#\">" + Key + "</span>";
    TblRow.cells[2].innerHTML = "<span onClick=\"DispCharPage(" + Key + ");\" href=\"#\">" + NumToHtml(Key, false) + "</span>";
    TblRow.cells[3].innerHTML = "<span onClick=\"DispCharPage(" + Key + ");\" href=\"#\">" + (CharData[0] != "" ? TextToHtml(CharData[0]) : "&nbsp;") + "</span>";
    TblRow.cells[4].innerHTML = "<span onClick=\"DispCharPage(" + Key + ");\" href=\"#\">" + (CharData[1] != "" ? TextToHtml(CharData[1]) : "&nbsp;") + "</span>";
    TblRow.cells[5].innerHTML = "<span onClick=\"DispCharPage(" + Key + ");\" href=\"#\">" + (CharData[2] != "" ? TextToHtml(CharData[2]) : "&nbsp;") + "</span>";
    TblRow.cells[0].onclick = new Function("DispCharPage(" + Key + ");");
    TblRow.cells[1].onclick = new Function("DispCharPage(" + Key + ");");
    TblRow.cells[2].onclick = new Function("DispCharPage(" + Key + ");");
    TblRow.cells[3].onclick = new Function("DispCharPage(" + Key + ");");
    TblRow.cells[4].onclick = new Function("DispCharPage(" + Key + ");");
    TblRow.cells[5].onclick = new Function("DispCharPage(" + Key + ");");
    TblRow.cells[2].style.fontFamily = XFontName;
}

// Wstawienie tekstu w polu tekstowym
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
            var N = parseInt(TblRow.cells[1].innerText);
            TblRow.cells[2].innerHTML = "<span onClick=\"DispCharPage(" + N + ");\">" + NumToHtml(N, false) + "</span>";
            TblRow.cells[2].style.fontFamily = XFontName;
        }
    }
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
    var WriteBox = document.getElementById("WriteBox");

    var C = "";
    
    if (Math.abs(X) == 1)
    {
        C = "\n";
    }
    
    if ((Math.abs(X) == 2) || (Math.abs(X) == 3))
    {
        C = "";
        for (var I = 1; I <= 9; I++)
        {
            var C_ = CurrentCode[I];
            if (C_ >= 0)
            {
                C = C + NumToChar(C_);
            }
        }
    
    }
    if (Math.abs(X) == 3)
    {
        C = SET_Prefix + C + SET_Suffix;
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

