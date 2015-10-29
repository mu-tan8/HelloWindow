/*
//	�f�B���@JScript�ŃS�[�X�g�C���X�g�[��
//
//
//�@install.txt����͂��A�w��t�H���_�ɓW�J���܂��B
//
//
*/



function array_keyEntry(key,flag){			//�z�񂩂�w�肳�ꂽ���ڂ̒l�𒊏o	key�@�擾����l�̃L�[���@/�@flag�@���K�\���̃t���O[i|g|m]
	k = new RegExp(key + '\,' , flag);

	for (i = 0 ; i < this.length ; i++){
		if (this[i].match(k)){
			return(RegExp.rightContext);	//�߂�l�F��v�������ڂ��E���ɂ��镶����
		}
	}
	return("");					//�߂�l�F�󕶎���
}

Array.prototype.keyEntry = array_keyEntry;		//�z��̃��\�b�h�Ƃ��Ēǉ�

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

	if (_prm == 1){							//�t�@�C���Z�b�g���u�S�[�X�g�v�̏ꍇ

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

	}else if (_prm == 2){						//�t�@�C���Z�b�g���u�o���[���v�̏ꍇ

	}else if (_prm == 3){						//�t�@�C���Z�b�g���u�T�v�������g�v�̏ꍇ

	}else if (_prm == 4){						//�t�@�C���Z�b�g���u�V�F���v�̏ꍇ

	}else{								//�����ȊO�̏ꍇ�i�󗓖��͎f�B�����T�|�[�g���ĂȂ��t�@�C���Z�b�g�j
		return("illegal format!");
	};

}

oFS = new ActiveXObject("Scripting.FileSystemObject");
oWSh = new ActiveXObject("WScript.Shell");
oXML = new ActiveXObject("Microsoft.XMLDOM");

