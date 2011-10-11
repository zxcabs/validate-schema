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
module.exports.ISODate = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])-?[1-7]|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s](([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)?(\15([0-5]\d))?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;