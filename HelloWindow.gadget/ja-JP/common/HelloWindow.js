
function basewareversion(){
	Ref = [];
	Ref[0] = System.Gadget.version;
	Ref[1] = System.Gadget.name;
	Ref[2] = System.Gadget.platformVersion;
	return(Ref);
}

function OnBatteryNotify(){
	Ref = [];
	Ref[0] = System.Machine.PowerStatus.batteryPercentRemaining;
	return(Ref);
}

function OnNotifyOSInfo(){
	Ref = [];
	//Ref[0]
	Ref[1] = System.Machine.processorArchitecture +","+ System.Machine.CPUs.item(0).name;
	Ref[2] = (System.Machine.totalMemory * 1024);
	return(Ref);
}






var homeDir , balloonDir , fieldDir;
var statUndock;
var userName , nickName , userSexual;
var currentGhostName, currentGhostPath ,currentSakuraName , currentKeroName;
var currentShellName, currentShellPath;
var currentBalloonName, currentBalloonPath;
var currentFieldName , currentFieldPath;
var Timer , cnt;

Home = System.Gadget.path + "\\ja-JP";
oFileSys = new ActiveXObject("Scripting.FileSystemObject");
oXML = new ActiveXObject("Microsoft.XMLDOM");

window.onload = function (){

	loadConfig();

	System.Gadget.settingsUI = "Config.htm";
	System.Gadget.Flyout.file = "flyout.htm";

	loadGhost();

	oMes.innerHTML = "Hello!";

	balloonOpen();

document.getElementById('oGadget').oncontextmenu = function (){
	var oMes = document.getElementById('oMes');
	oMes.style.width = "250px";
	oMes.style.height = "400px";
	oMes.style.overflow = "visible";
	oMes.style.backgroundImage = "url('"+homeDir+"/"+currentGhostPath+"/shell/"+currentShellPath+"/menu_background.png')";
	oMes.style.backgroundRepeat = "no-repeat";

	oMes.innerHTML = "";
	menuOpen();
	return false;
}

document.getElementById('oGadget').ondblclick = function (){
	var oMes = document.getElementById("oMes");
	oMes.innerHTML = "";
	balloonOpen();
	return false;
}

	//var w = window.open();
	//w.document.writeln(document.documentElement.outerHTML);

};

function loadConfig(){

	if (oXML.load(Home+"\\common\\StatConfigs.xml")){
		with (oXML.getElementsByTagName("Config")[0]){
			with (getElementsByTagName("Basic")[0]){
				homeDir = getElementsByTagName("homePath")[0].text || Home + "\\ghost";
				balloonDir = getElementsByTagName("balloonPath")[0].text || Home + "\\balloon";
			}
			with (getElementsByTagName("External")[0]){
				fieldDir = getElementsByTagName("fieldPath")[0].text || Home + "\\field";
				statUndock = getElementsByTagName("mode")[0].text;
			}
			with (getElementsByTagName("Misc")[0]){
				userName = getElementsByTagName("userName")[0].text;
				nickName = getElementsByTagName("nickName")[0].text;
				userSexual = getElementsByTagName("sexual")[0].text;
			}
		}
		with (oXML.getElementsByTagName('LastBoot')[0]){
			with (getElementsByTagName('Ghost')[0]){
				currentGhostName = getElementsByTagName('name')[0].text;
				currentGhostPath = getElementsByTagName('path')[0].text;
				currentSakuraName = getElementsByTagName('sakura')[0].text;
				currentKeroName = getElementsByTagName('kero')[0].text;
			}
			with (getElementsByTagName('Shell')[0]){
				currentShellName = getElementsByTagName('name')[0].text;
				currentShellPath = getElementsByTagName('path')[0].text;
			}
			with (getElementsByTagName('Balloon')[0]){
				currentBalloonName = getElementsByTagName('name')[0].text;
				currentBalloonPath = getElementsByTagName('path')[0].text;
			}
			with (getElementsByTagName('Field')[0]){
				currentFieldName = getElementsByTagName('name')[0].text;
				currentFieldPath = getElementsByTagName('path')[0].text;
			}
		}

	} else {

		homeDir = Home + "\\ghost";
		balloonDir = Home + "\\balloon";
		fieldDir = Home + "\\field";
		statUndock = 0;
		userSexual = 2;
		currentBalloonName = "default";
		currentBalloonPath = "madobe";
		currentFieldName ="default";
		currentFieldPath = "madobe";
		

	}


}

function loadGhost(){
	document.getElementById("oGadget").innerHTML = "";
	//document.getElementById("oMes").innerHTML = "";

	init_window();
	cnt = oSash.length - 1;
	Timer = setInterval(function (){
		changeFrame(cnt);
		cnt--;
		if (cnt < 0){
			clearInterval(Timer);
			cnt = 0;
			changeFrame(cnt);
		}
	} , 1000);

	init_surface();

	changeSurface(6);

	var cols = [ "stop_button1" , "stop_button2" , "k_window" , "play_button" , "menu" , "clear_button" ];
	for (var c = 0;c < cols.length ;c++){
		var oCol = document.getElementById( cols[c] );
		oCol.onclick = function (){
			document.getElementById("oMes").innerHTML = event.srcElement.id;
			balloonOpen();
		}
	}

	init_balloon();

};

function balloonOpen(){
	loadBalloon();
	var oMes = document.getElementById('oMes');
	var oComm = document.createComment("//window.onload = function (){\n"
	+ "document.body.ondblclick = function (){System.Gadget.Flyout.show = false};\n "
	+ "//}\n");
	var oDiv = document.createElement("div");
	oDiv.id = "script";
	oDiv.appendChild(oComm);
	oMes.appendChild(oDiv);
	System.Gadget.Flyout.show = true;
}

function menuOpen(){
	System.Gadget.Flyout.show = true;
}

function getDropedFile(){
	I=0;

	while (oItem = System.Shell.itemFromFileDrop(event.dataTransfer , I)){
		document.getElementById("oMes").innerHTML = "ファイル：" + oItem.name + "<br />";
		System.Shell.execute("wscript.exe", "common\\install.wsf" + ' "' + oItem.path + '"' , Home);
		I++;
	}

	System.Gadget.Flyout.show = true;
}

System.Gadget.onDock = DockState;
System.Gadget.onUndock = DockState;

function DockState(){
	oBody = document.body.style;

	if (statUndock != 0){
		if (System.Gadget.docked){
			oBody.width = 130;
			oBody.height = 120;


		}else{
			oBody.width = 400;
			oBody.height = 350;

		}
	}

	loadGhost();
}

System.Gadget.onShowSettings = function (){
	System.Gadget.Settings.writeString("homePath" , homeDir );
	System.Gadget.Settings.writeString("balloonPath" , balloonDir );
	System.Gadget.Settings.writeString("fieldPath" , fieldDir );
	System.Gadget.Settings.writeString("userName" , userName );
	System.Gadget.Settings.writeString("nickName" , nickName );
	System.Gadget.Settings.writeString("userSexual" , userSexual);
	System.Gadget.Settings.writeString("statUndock" , statUndock);
}

System.Gadget.onSettingsClosed = function (){
	homeDir = System.Gadget.Settings.readString("homePath");
	balloonDir = System.Gadget.Settings.readString("balloonPath");
	fieldDir = System.Gadget.Settings.readString("fieldPath");
	userName = System.Gadget.Settings.readString("userName");
	nickName = System.Gadget.Settings.readString("nickName");
	userSexual = System.Gadget.Settings.readString("userSexual");
	statUndock = System.Gadget.Settings.readString("statUndock");
}

window.onunload = function (){

		var oRoot = oXML.createElement('HelloWindow');
		with (oXML.createElement('Config')){
			var oConfig = this;
			with (oXML.createElement('Basic')){
				var oBasic = this;
				with (oXML.createElement('homePath')){
					appendChild(oXML.createTextNode(homeDir));
					oBasic.appendChild(this);
				}
				with (oXML.createElement('balloonPath')){
					appendChild(oXML.createTextNode(balloonPath));
					oBasic.appendChild(this);
				}
				oConfig.appendChild(this);
			}
			with (oXML.createElement('External')){
				var oExternal = this;
				with (oXML.createElement('fieldPath')){
					appendChild(oXML.createTextNode(fieldDir));
					oExternal.appendChild(this);
				}
				with (oXML.createElement('mode')){
					appendChild(oXML.createTextNode(statUndock));
					oExternal.appendChild(this);
				}
				oConfig.appendChild(this);
			}
			with (oXML.createElement('Misc')){
				var oMisc = this;
				with (oXML.createElement('userName')){
					appendChild(oXML.creteTextNode(userName));
					oMisc.appendChild(this);
				}
				with (oXML.createElement('nickName')){
					appendChild(oXML.createTextNode(nickName));
					oMisc.appendChild(this);
				}
				with (oXML.createElement('sexual')){
					appendChild(oXML.createTextNode(userSexual));
					oMisc.appendChild(this);
				}
				oConfig.appendChild(this);
			}
			oRoot.appendChild(this);
		}
		with (oXML.createElement('LastBoot')){
			var oLastBoot = this;
			with (oXML.createElement('Ghost')){
				var oGhost = this;
				with(oXML.createElement('name')){
					appendChild(oXML.createTextNode(currentGhostName));
					oGhost.appendChild(this);
				}
				with (oXML.createElement('path')){
					appendChild(oXML.createTextNode(currentGhostPath));
					oGhost.appendChild(this);
				}
				with (oXML.createElement('sakura')){
					appendChild(oXML.createTextNode(currentSakuraName));
					oGhost.appendChild(this);
				}
				with (oXML.createElement('kero')){
					appendChild(oXML.createTextNode(currentKeroName));
					oGhost.appendChild(this);
				}
				oLastBoot.appendChild(this);
			}
			with (oXML.createElement('Shell')){
				var oShell = this;
				with (oXML.createElement('name')){
					appendChild(oXML.createTextNode(currentShellName));
					oShell.appendChild(this);
				}
				with (oXML.createElement('path')){
					appendChild(oXML.createTextNode(currentShellPath));
					oShell.appendChild(this);
				}
				oLastBoot.appendChild(this);
			}
			with (oXML.createElement('Balloon')){
				var oBalloon = this;
				with (oXML.createElement('name')){
					appendChild(oXML.createTextNode(currentBalloonName));
					oBalloon.appendChild(this);
				}
				with (oXML.createElement('path')){
					appendChild(oXML.createTextNode(currentBalloonPath));
					oBalloon.appendChild(this);
				}
				oLastBoot.appendChild(this);
			}
			with (oXML.createElement('Field')){
				var oField = this;
				with (oXML.createElement('name')){
					appendChild(oXML.createTextNode(currentFieldName));
					oField.appendChild(this);
				}
				with (oXML.createElement('path')){
					appendChild(oXML.createTextNode(currentFieldPath));
					oField.appendChild(this);
				}
				oLastBoot.appendChild(this);
			}
			oRoot.appendChild(this);
		}
		oXML.documentElement = oRoot;

/*
	with (oXML.getElementsByTagName("Config")[0]){
		with (getElementsByTagName("Basic")[0]){
			getElementsByTagName("homePath")[0].text = homeDir;
			getElementsByTagName("balloonPath")[0].text = balloonDir;
		}
		with (getElementsByTagName("External")[0]){
			getElementsByTagName("fieldPath")[0].text = fieldDir;
			getElementsByTagName("mode")[0].text = statUndock;
		}
		with (getElementsByTagName("Misc")[0]){
			getElementsByTagName("userName")[0].text = userName;
			getElementsByTagName("nickName")[0].text = nickName;
			getElementsByTagName("sexual")[0].text = userSexual;
		}
	}
	with (oXML.getElementsByTagName('LastBoot')[0]){
		with (getElementsByTagName('Ghost')[0]){
			getElementsByTagName('name')[0].text = currentGhostName;
			getElementsByTagName('path')[0].text = currentGhostPath;
			getElementsByTagName('sakura')[0].text = currentSakuraName;
			getElementsByTagName('kero')[0].text = currentKeroName;
		}
		with (getElementsByTagName('Shell')[0]){
			getElementsByTagName('name')[0].text = currentShellName;
			getElementsByTagName('path')[0].text = currentShellPath;
		}
		with (getElementsByTagName('Balloon')[0]){
			getElementsByTagName('name')[0].text = currentBalloonName;
			getElementsByTagName('path')[0].text = currentBalloonPath;
		}
		with (getElementsByTagName('Field')[0]){
			getElementsByTagName('name')[0].text = currentFieldName;
			getElementsByTagName('path')[0].text = currentFieldPath;
		}

	}
*/
	oXML.save(Home+"\\common\\StatConfigs.xml");
}
