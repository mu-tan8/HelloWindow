
var Field = [];
var oSash = [];

var oFS = new ActiveXObject("Scripting.FileSystemObject");

function init_window(){

		var oD = oFS.GetFolder(fieldDir + "\\" + currentFieldPath);
		var fc = new Enumerator(oD.Files);

		while (!fc.atEnd()){
			var sfile = oFS.GetFileName(fc.item());
			if (sfile.match(/^frame(\d+)\.png$/)){
				var oImg = new Image();
				oImg.src = fieldDir+"/"+currentFieldPath+"/"+sfile;
				oSash[parseInt(RegExp.$1)] = oImg;
			}else if(sfile.match(/^window(\d+)\.png$/)){
				Field[parseInt(RegExp.$1)] = sfile;
			}
			fc.moveNext();
		}

//(function (){

	var oBG = document.getElementById("wgBackground");
	oBG.src = "url('"+fieldDir+"/"+currentFieldPath+"/"+Field[0]+"')";
	oBG.style.width = "130px";
	oBG.style.height = "120px";
	oBG.style.zIndex = 0;

	var oImg = new Image();
	oImg.id = currentFieldName;
	oImg.src = "img/blank.png";
	oImg.className = "abs";
	oImg.border = 0;
	oImg.style.width = "130px";
	oImg.style.height = "120px";
	oImg.style.top = "0px";
	oImg.style.left = "0px";
	oImg.style.zIndex = 65536;
	oImg.useMap = "#"+currentGhostName;
	document.getElementById('oGadget').appendChild(oImg);

//})();

}

function changeFrame(_prm){

	if (oWindow = document.getElementById(currentFieldName)){
		var oImg = oSash[_prm];
		oWindow.src = oImg.src;
	}

}