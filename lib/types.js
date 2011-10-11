module.exports.Account = /^\d{11}$/;
module.exports.Sid = /^[\w\d\.\/\+=]{68}$/;

module.exports.TextArea = function (a, b) {
	var str;
	
	switch arguments.length {
		1:
			str = '{0,' + a + '}';
			break;
		2:
			str = '{' + a + ',' + b + '}';
			break;
		default:
			str = '{0, 100}';		
	}
	
	return new RegExp('^[\s\d\w]' + str + '$');
};

module.exports.TimeStamp = /^[\d]{1, 10}$/;