function SettingsSave()
{
    DataSetI(SettingsPrefix + "SET_HtmlAsEntity", SET_HtmlAsEntity);
    DataSet(SettingsPrefix + "SET_FontName", SET_FontName);
    DataSetI(SettingsPrefix + "SET_FontSize", SET_FontSize);
    DataSetI(SettingsPrefix + "SET_FontSizeX", SET_FontSizeX);
    DataSet(SettingsPrefix + "SET_Prefix", SET_Prefix);
    DataSet(SettingsPrefix + "SET_Suffix", SET_Suffix);
    DataSetI(SettingsPrefix + "SET_MarginTop", SET_MarginTop);
    DataSetI(SettingsPrefix + "SET_MarginBot", SET_MarginBot);
    DataSetI(SettingsPrefix + "SET_FontB", SET_FontB);
    DataSetI(SettingsPrefix + "SET_FontI", SET_FontI);
    DataSetI(SettingsPrefix + "SET_FontU", SET_FontU);
    DataSetI(SettingsPrefix + "SET_FontS", SET_FontS);
    DataSetI(SettingsPrefix + "SET_DisplayMode", SET_DisplayMode);
    DataSetI(SettingsPrefix + "SET_WriteBoxRows", SET_WriteBoxRows);
    DataSetI(SettingsPrefix + "SET_WriteBoxCols", SET_WriteBoxCols);
    DataSetI(SettingsPrefix + "SET_WriteBoxFontSize", SET_WriteBoxFontSize);
}



for (var I = 0; I < 5; I++)
{
    document.getElementById("FontPreset" + I).value = FontPresetN[I];
}

Create();

document.getElementById("WriteBox").value = DataGetDefault(SettingsPrefix + "CurrentWriteBox", "");

SettingsGet();
SetFontStyle(-1)


FindChar(-1);

