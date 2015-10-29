/*
*	http.js	HTTP通信スクリプト
*
* 必須条件(required)
*	IE6 later version
*		JScript
*		FileSystemObject
*		ADODB.Stream
*		Microsoft.XMLHTTP
*
*
* (reference)
*   function
*
*	getDownload( URL , Path );
*		URL	ダウンロードするファイルのURL
*		Path	ファイルの保存先
*
*   global var
*
*	Status = xmlhttp.status;
*		0	応答待ち
*		200	通信正常終了
*		404	ファイルが見つからない
*/

var oFS = new ActiveXObject("Scripting.FileSystemObject");
var Status = 0;

function getDownloadFile( URL , Path){

	if (!URL){return -1}
	if (!(Path || oFS.FolderExists(Path))){return -1}

	var dir = URL.split("\/");
	var FileName = dir.pop();

	var oXHTP = new ActiveXObject("Microsoft.XMLHTTP");
	oXHTP.onreadystatechange = function(){

		if (oXHTP.readyState == 4){

			if (oXHTP.status == 200){
				var hLocation = oXHTP.getResponseHeader('Content-location');
				var hType = oXHTP.getResponseHeader('Content-type');

				var URI = hLocation.split("\/");
				var filename = URI.pop();

				var SaveFile = (oFS.GetFileName(FileName)) ? Path + "\\" + FileName : Path + "\\" +  oFS.GetFileName(filename);

				var oADDB = new ActiveXObject("ADODB.Stream");

				oADDB.Type = 1;
				oADDB.Open();
				oADDB.Write(oXHTP.responseBody);
				oADDB.Savetofile(SaveFile ,2);
				oADDB.Close();

				oADDB = null;

				Status = oXHTP.status;
				// return( ""+URL+" Downloaded Success.<br />\n"+SaveFile+" Save Complited!" );

			}else {

				Status = oXHTP.status;
				// return( ""+URL+" Download Failed!<br />\n status:"+oXHTP.status );

			}

		}else{

			// "Connecting ..."+oXHTP.readyState;

		}

	}

	oXHTP.open('GET' , URL , false);
	oXHTP.send(null);

	oXHTP = null;

}
