
for (var I = 0; I < 5; I++)
{
    document.getElementById("FontPreset" + I).value = FontPresetN[I];
}

Create();

document.getElementById("WriteBox").value = DataGetDefault(SettingsPrefix + "CurrentWriteBox", "");

SettingsGet();
SetFontStyle(-1)


FindChar(-1);

