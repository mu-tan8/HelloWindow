/*
*	checksum.js	MD5チェックサムスクリプト
*
* 必須要件(required)
*	InternetExplorer 6 later version
*		JScript
*		FileSystemObject
*		ADODB.Stream
*	md5.js
*		http://www.onicos.com/staff/iz/amuse/javascript/expert/
*
* function
*	
*	string = checksum(filepath);
*		filepath	MD5を調べるファイルのパス
*		string	MD5文字列(16)
*
*	string = BinaryToString(BinDATA);
*		BinDATA	VB配列のバイナリデータ
*		string	データ文字列
*/

var oFS = new ActiveXObject("Scripting.FileSystemObject");

function BinaryToString(VBData){
	var data = "";
	var JSArray = VBData.toArray();
	for (var a = 0 ; a < JSArray.length ; a++){
		data += String.fromCharCode(JSArray[a]);
	};
	return data;
} 

function checksum(filepath){
	if (oFS.FileExists(filepath)){
		var oADDB = new ActiveXObject("ADODB.Stream");

		oADDB.Type = 1;
		oADDB.Open();
		oADDB.LoadFromFile(filepath);
		VBData = oADDB.Read(-1);
		oADDB.Close();
		var data = BinaryToString(VBData);
		oADDB = null;

		return (MD5_hexhash(data));
	}
}