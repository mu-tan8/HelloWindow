/*
//	伺。窓　JScript版ゴーストインストーラ
//
//
//　install.txtを解析し、指定フォルダに展開します。
//
//
*/



function array_keyEntry(key,flag){			//配列から指定された項目の値を抽出	key　取得する値のキー名　/　flag　正規表現のフラグ[i|g|m]
	k = new RegExp(key + '\,' , flag);

	for (i = 0 ; i < this.length ; i++){
		if (this[i].match(k)){
			return(RegExp.rightContext);	//戻り値：一致した項目より右側にある文字列
		}
	}
	return("");					//戻り値：空文字列
}

Array.prototype.keyEntry = array_keyEntry;		//配列のメソッドとして追加

function constructValidate(_prm){

	if (!oFS.FolderExists(srcPath)){
		return("source folder \n not found!");
	}

	if (_prm == 1){

		if (!oFS.FolderExists(srcPath + "\\ghost")){
			return("ghost folder \n not exist!");
		}else if (!oFS.FolderExists(srcPath + "\\ghost\\master")){
			return("ghost folder \n structual defact!");
		}else if (!oFS.FileExists(srcPath + "\\ghost\\master\\descript.txt")){
			return("master ghost \n cannot recognize!");
		}

		if (!oFS.FolderExists(srcPath + "\\shell")){
			return("shell folder \n not exist!");
		}else if (!oFS.FolderExists(srcPath + "\\shell\\master")){
			return("shell folder \n structual defact!");
		}else if (!oFS.FileExists(srcPath + "\\shell\\master\\descript.txt")){
			return("master shell \n cannot recognize!");
		}else{
			fc = new Enumerator(oFS.GetFolder(srcPath + "\\shell\\master").Files);
			for (;!fc.atEnd();fc.moveNext()){
				nfile = fc.item().Name;
				if (nfile.match(/surface(0*)0\.png/) || nfile.match(/surface(0*)10\.png/) ){
					return;
				};
			}
			return("shell construct illegal!");
		}


	}else if (_prm == 2){
		
	}else if (_prm == 3){
		
	}else if (_prm == 4){
		
	}else{
		return("not supported format!");
	}
}

function execInstall(_prm){

	if (!insDir){return("illegal format!")};

	if (_prm == 1){							//ファイルセットが「ゴースト」の場合

		oTS2 = oFS.OpenTextFile(srcPath + "\\ghost\\master\\descript.txt" , 1 , false);

		desText = [];

		for (l = 0 ; !oTS2.AtEndOfStream ; l++){
			desText[l] = oTS2.ReadLine();
		};

		desName = desText.keyEntry("name");
		desName0 = desText.keyEntry("sakura.name");
		desName1 = desText.keyEntry("kero.name");

		if (!oFS.FolderExists(destPath + "\\ghost\\" + insDir)){
			oFS.CreateFolder(destPath + "\\ghost\\" + insDir);
		}else{
			if (oWSh.Popup("exists files.\n overwrite?",0,"confirm",1+32) == 1){
			}else{
				return("abort installing.");
			}
		};
		oFS.CopyFolder(srcPath + "\\ghost" , destPath + "\\ghost\\" + insDir + "\\");
		oFS.CopyFolder(srcPath + "\\shell" , destPath + "\\ghost\\" + insDir + "\\");
		if (oFS.FileExists(srcPath + "\\readme.txt")){oFS.CopyFile(srcPath + "\\readme.txt" , destPath + "\\ghost\\" + insDir + "\\")};
		if (oFS.FileExists(srcPath + "\\thumbnail.png")){oFS.CopyFile(srcPath + "\\thumbnail.png" , destPath + "\\ghost\\" + insDir + "\\")};
		oFS.CopyFile(srcPath + "\\install.txt" , destPath + "\\ghost\\" + insDir + "\\");

		oName = oXML.createElement("name");
		oName.text = desName;
		oSakura = oXML.createElement("sakura");
		oSakura.text = desName0;
		oKero = oXML.createElement("kero");
		oKero.text = desName1;

		now = new Date();

		oTimeStamp = oXML.createElement("install");
		oTimeStamp.text = now.getTime();

		oDoc = oXML.createElement("ghost");
		oDoc.appendChild(oName);
		oDoc.appendChild(oSakura);
		oDoc.appendChild(oKero);
		oDoc.appendChild(oSakura);
		oDoc.appendChild(oTimeStamp);

		oXML.documentElement.appendChild(oDoc);

	}else if (_prm == 2){						//ファイルセットが「バルーン」の場合

	}else if (_prm == 3){						//ファイルセットが「サプリメント」の場合

	}else if (_prm == 4){						//ファイルセットが「シェル」の場合

	}else{								//それら以外の場合（空欄又は伺。窓がサポートしてないファイルセット）
		return("illegal format!");
	};

}

oFS = new ActiveXObject("Scripting.FileSystemObject");
oWSh = new ActiveXObject("WScript.Shell");
oXML = new ActiveXObject("Microsoft.XMLDOM");

