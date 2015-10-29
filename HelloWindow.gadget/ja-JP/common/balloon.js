
var oFS = new ActiveXObject("Scripting.FileSystemObject");
var oBalloon = [];
var balloon = [];

function init_balloon(){

	var oD = oFS.GetFolder(balloonDir + "\\" + currentBalloonPath);
	var fc = new Enumerator(oD.Files);
	var oArrow = [] , oOnline = [];

	while (!fc.atEnd()){
		var sfile = oFS.GetFileName(fc.item());
		if (sfile.match(/^arrow(\d)\.png$/)){
			var oImg = new Image();
			oImg.src = balloonDir+"/"+currentBalloonPath+"/"+sfile;
			oArrow[parseInt(RegExp.$1)] = oImg;
		}else if(sfile.match(/^online(\d+)\.png$/)){
			var oImg = new Image();
			oImg.src = balloonDir+"/"+currentBalloonPath+"/"+sfile;
			oOnline[parseInt(RegExp.$1)] = oImg;
		}
		fc.moveNext();
	}
	oBalloon = {arrow : oArrow , online : oOnline};

	var oTS = oFS.OpenTextFile(balloonDir + "\\" + currentBalloonPath + "\\descript.txt" , 1 , false);

	var myArrow = [] , myTmp_x = [] , myTmp_y = [] , myOnline = [];
	while (!oTS.AtEndOfStream){
		var desText = oTS.ReadLine();
		var buf = desText.split(",");
		var i = 0;
		if (buf[0].match(/^arrow(\d)\.(x|y)/)){
			//myTmp[RegExp.$2] = buf[1];
			//myArrow[parseInt(RegExp.$1)] = myTmp;

			i = parseInt(RegExp.$1);
			switch (RegExp.$2){
				case "x":
					myTmp_x[i] = buf[1];
					break;
				case "y":
					myTmp_y[i] = buf[1]; 
					break;
			}
			myArrow[i] = 0;

		}else if(buf[0].match(/^onlinemarker\.(x|y)/)){
			myOnline[RegExp.$1] = buf[1];
		}
	}
	for (var i = 0;i < myArrow.length;i++){
		myArrow[i] = {x : myTmp_x[i] , y : myTmp_y[i]};
	}
	balloon = {arrow : myArrow , online : myOnline};
}

function loadBalloon(){

	var oMes = document.getElementById('oMes');
	oMes.style.width = "260px";
	oMes.style.height = "120px";
	oMes.style.overflow = "visible";
	oMes.style.backgroundImage = "url('"+balloonDir+"/"+currentBalloonPath+"/balloons0.png')";
	oMes.style.backgroundRepeat = "no-repeat";

	var oImg_Arrow = [];
	oImg_Arrow[0] = oBalloon.arrow[0];
	oImg_Arrow[0].id = "upBtn";
	oImg_Arrow[0].style.position = "absolute";
	oImg_Arrow[0].style.top = "" + balloon.arrow[0].y + "px";
	oImg_Arrow[0].style.right = "" + balloon.arrow[0].x + "px";
	oImg_Arrow[0].onclick = function (){
		window.scrollBy( 0 , -10 );
		window.onscroll = function (){
			oUpBtn = document.getElementById('upBtn');
			oUpBtn.style.top = "" + (parseInt(oUpBtn.style.top) - 10) + "px" ;
			oDwBtn = document.getElementById('downBtn');
			oDwBtn.style.bottom = "" + (parseInt(oDwBtn.style.bottom) + 10) + "px" ;
		}
	}
	oMes.appendChild(oImg_Arrow[0]);

	oImg_Arrow[1] = oBalloon.arrow[1];
	oImg_Arrow[1].id = "downBtn";
	oImg_Arrow[1].style.position = "absolute";
	oImg_Arrow[1].style.bottom = "" + Math.abs(balloon.arrow[1].y) + "px";
	oImg_Arrow[1].style.right = "" + balloon.arrow[1].x + "px";
	oImg_Arrow[1].onclick = function (){
		window.scrollBy( 0 , 10 );
		window.onscroll = function (){
			oDwBtn = document.getElementById('downBtn');
			oDwBtn.style.bottom = "" + (parseInt(oDwBtn.style.bottom) - 10) + "px" ;
			oUpBtn = document.getElementById('upBtn');
			oUpBtn.style.top = "" + (parseInt(oUpBtn.style.top) + 10) + "px" ;
		}
	}
	oMes.appendChild(oImg_Arrow[1]);

}