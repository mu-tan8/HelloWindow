//
//
//	surfaces.txt parser
//
//
//surface object
//
//	<img src="filename" /> = oSurface[filename];
//
//	collision_ID = surface[id].collision[numbar].ID; 
//
//	element_src = surface[id].element[numbar].src;
//

var surface = [];
var oSurface = [];

var oFS = new ActiveXObject("Scripting.FileSystemObject");

function init_surface(){

		var oD = oFS.GetFolder(homeDir + "\\" + currentGhostPath + "\\shell\\" +currentShellPath);
		var fc = new Enumerator(oD.Files);

		while (!fc.atEnd()){
			var sfile = oFS.GetFileName(fc.item());
			if (sfile.match(/^surface(\d+)\.png$/)){
				oImg = new Image();
				oImg.src = homeDir+"/"+currentGhostPath+"/shell/"+currentShellPath+"/"+sfile;
				oSurface[parseInt(RegExp.$1)] = oImg;
			}
			fc.moveNext();
		}



		var oTS = oFS.OpenTextFile(homeDir + "\\" + currentGhostPath + "\\shell\\" + currentShellPath + "\\surfaces.txt" , 1 , false);

		var desText = "";var n = 0;var mySurfaces = [] , myCollision = [] , myElement = [];

		for (; !oTS.AtEndOfStream ;){
			desText = oTS.ReadLine();
			if (desText.match(/surface(\d+)/i)){
				n = RegExp.$1;
				mySurfaces[n] = "";
				while (desText.indexOf("}") == -1){
					if (desText.indexOf("{") == -1){mySurfaces[n] += "" + desText + "\n"};
					desText = oTS.ReadLine();
				}

				var myBuf = mySurfaces[n].split("\n");

				for (var l = 1;l < myBuf.length;l++){

					var myTmp = myBuf[l];
					var myArray = [];

					if (myTmp.match(/collision(\d+)/i)){
						var d = RegExp.$1;
						var myArea = myTmp.split(",");
						myArray["X"] = parseInt(myArea[1]);
						myArray["Y"] = parseInt(myArea[2]);
						myArray["width"] = parseInt(myArea[3]);
						myArray["height"] = parseInt(myArea[4]);
						myArray["ID"] = myArea[5];
						myCollision[d] = myArray;
					}else if (myTmp.match(/element(\d+)/i)){
						var d = RegExp.$1;
						var myArea = myTmp.split(",");
						myArray["pattern"] = myArea[1];
						myArray["src"] = myArea[2];
						myArray["X"] = myArea[3];
						myArray["Y"] = myArea[4];
						myElement[d] = myArray;
					}
				}

				surface[n] = {collision : myCollision , element : myElement};

			}
		};

		mySurfaces.length = 0;

		var oMap = document.createElement('map');
		oMap.id = currentGhostName;

		document.getElementById('oGadget').appendChild(oMap);

}

var Z = 1;

function changeSurface(_prm){

	var s = _prm;

	if (surface[s]){

		if (elm = surface[s].element.length){

			var e = 0;

			var oImg = oSurface[parseInt(surface[s].element[e].src.match(/\d+/))];
			oImg.width = 130;
			oImg.border = 0;
			oImg.id = parseInt(surface[s].element[e].src.match(/\d+/));
			oImg.className = "abs";
			oImg.style.top = ""+surface[s].element[e].Y+"px";
			oImg.style.left = ""+surface[s].element[e].X+"px";
			oImg.style.filter = "chroma(color=#000000)";
			//oImg.useMap = "#"+currentGhostName;
			oImg.style.zIndex = Z;
			Z++;

			document.getElementById('oGadget').appendChild(oImg);

		}

		if (col = surface[s].collision.length){

			var oMap = document.getElementById( currentGhostName );

			for (var c = 0;c < col;c++){
				var oCol = document.createElement('area');
				oCol.id = surface[s].collision[c].ID;
				oCol.href = "javascript:void(0)";
				oCol.shape = 'rect';
				oCol.coords = ""
				+ surface[s].collision[c].X + ","
				+ surface[s].collision[c].Y + ","
				+ surface[s].collision[c].width + "," 
				+ surface[s].collision[c].height;
				oMap.appendChild(oCol);
			}

		}

	}

}