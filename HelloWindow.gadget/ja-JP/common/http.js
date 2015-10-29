/*
*	http.js	HTTP�ʐM�X�N���v�g
*
* �K�{����(required)
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
*		URL	�_�E�����[�h����t�@�C����URL
*		Path	�t�@�C���̕ۑ���
*
*   global var
*
*	Status = xmlhttp.status;
*		0	�����҂�
*		200	�ʐM����I��
*		404	�t�@�C����������Ȃ�
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
