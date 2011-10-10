function validate(o, s) {
	var skeys, olen, count = 0, result;
	
	if (o === s) return true;
	if (typeof o !== typeof s) {
		if (s.constructor === RegExp) return s.test(o);
		if ('function' === typeof s) return s === o.constructor;
		if (Array.isArray(s) && Array.isArray(o)) {
			return s.every(function (key, index) {
				return validate(o[index], key);
			});
		}
		
		return false;
	}
	
	if ('object' === typeof s) {
		skeys = Object.keys(s);
		olen = Object.keys(o).length;
		
		if (olen > skeys.length) return false;
		
		result = skeys.every(function (key) {
			var isOptional = key.match(/^\$/) !== null,
				_key = (isOptional) ? key.substr(1) : key;
			
			if ('undefined' === typeof o[_key]) {
				return isOptional;
			}
			
			if (validate(o[_key], s[key])) {
				count += 1;
				return true;
			}
			
			return false;
		});
		
		return result && count === olen;
	}
};

module.exports = validate;