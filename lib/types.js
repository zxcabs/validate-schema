module.exports.Account = /^\d{20}$/;
module.exports.Sid = /^[\w\d\.\/\+=]{68}$/;

module.exports.TextArea = function (a, b) {
	var str;
	
	switch (arguments.length) {
		case 1:
			str = '{0,' + a + '}';
			break;
		case 2:
			str = '{' + a + ',' + b + '}';
			break;
		default:
			str = '{0, 100}';		
	}
	
	return new RegExp('^[\s\d\w]' + str + '$');
};

module.exports.TimeStamp = /^[\d]{1,10}$/;
module.exports.ISODate = /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])(\D?([01]\d|2[0-3])\D?([0-5]\d)\D?([0-5]\d)?\D?(\d{3})?([zZ]|([\+-])([01]\d|2[0-3])\D?([0-5]\d)?)?)?$/;
module.exports.SID = ;
module.exports.Number = function (x) {
	return new RegExp('/^\d{' + x + '}$/');
};
module.exports.Money = /^\d+.\d{2}$/;
module.exports.INN = /^\d{10}|\d{12}$/;
module.exports.ObjectId = /^[\w\d]{24}$/;
module.exports.Bic = /^\d{9}$/;