function ModuleInit()
{
    var LayoutTxt = SET_ModuleArrangeLayout + "__________";

    var I = 0;
    var Obj = document.getElementById("Place" + I);
    var Obj0 = null;
    while (Obj)
    {
        Obj0 = document.getElementById("Module" + LayoutTxt[I]);

        if (Obj0)
        {
            if (Obj)
            {
                Obj.appendChild(Obj0);
            }
        }

        I++;
        Obj = document.getElementById("Place" + I);
    }
    ModuleArrangeConfOpt(-1);
}

function ModuleSwap(N1, N2)
{
    if (SET_ModuleArrangeConf)
    {
        var P0 = document.getElementById("Place" + N1);
        var P1 = document.getElementById("Place" + N2);

        var F1 = P0.children[0];
        var F2 = P1.children[0];

        P0.appendChild(F2);
        P1.appendChild(F1);

        var I = 0;
        var Obj = document.getElementById("Place" + I);
        var ObjList = "";
        while (Obj)
        {
            var Obj0 = Obj.children[0];
            
            var Obj0Id = Obj0.id;
            if (Obj0Id.length == 7)
            {
                if (Obj0Id.substr(0, 6) == "Module")
                {
                    ObjList = ObjList + Obj0Id.substr(6, 1);
                }
            }

            I++;
            Obj = document.getElementById("Place" + I);
        }
        SET_ModuleArrangeLayout = ObjList;
        SettingsSave();
    }
}


function ModuleArrangeConfOpt(X)
{
    if (X == 0)
    {
        SET_ModuleArrangeConf = 0;
        SettingsSave();
    }
    if (X == 1)
    {
        SET_ModuleArrangeConf = 1;
        SettingsSave();
    }

    var I = 0;
    var Obj = document.getElementById("ModuleSwap" + I);
    if (SET_ModuleArrangeConf)
    {
        document.getElementById("xSET_ModuleArrangeConf1").value = "[Yes]";
        document.getElementById("xSET_ModuleArrangeConf0").value = "No";
        while (Obj)
        {
            Obj.size = "30";
            Obj.color = "silver";
            I = I + 1;
            Obj = document.getElementById("ModuleSwap" + I);
        }
    }
    else
    {
        document.getElementById("xSET_ModuleArrangeConf1").value = "Yes";
        document.getElementById("xSET_ModuleArrangeConf0").value = "[No]";
        while (Obj)
        {
            Obj.size = "5";
            Obj.color = "silver";
            I = I + 1;
            Obj = document.getElementById("ModuleSwap" + I);
        }
    }
}

