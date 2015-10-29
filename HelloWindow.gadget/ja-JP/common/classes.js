
function exTrim(Str){
	if (Str.match(/[\s]*([^\b]+)[\s]*/)){
		return(RegExp.leftContext + RegExp.lastParen +RegExp.rightContext);
	}
}

function chomp(Lst){
	for (l = 0;l < Lst.length;l++){
		if (Lst[l].match(/(.+)\n$/m)){
			Lst[l] = RegExp.lastParen;
		};
	}
}

