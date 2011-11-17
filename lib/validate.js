var optionalReg = /^(\$|#\$)/,
	templateReg = /^(#|\$#)/;

function validate(o, s, path, isOptional, isTemplate) {
	var skeys, olen, count = 0, result, path = path || '', error;
	
	if (o === s) return;
	if (typeof o !== typeof s) {
		if ('undefined' !== typeof s && s.constructor === RegExp) {
			if (s.test(o)) return;
			return { path: path, text: 'regexp not match', value: o, schema: s };
		}
		
		if ('function' === typeof s) {
			if ('undefined' !== typeof o && s === o.constructor) return;
			return { path: path, text: 'type not match', value: o.constructor, schema: s };
		}
		
		return { path: path, text: 'type not match', value: o, schema: s };
	}

	if (Array.isArray(s)) {
		if (Array.isArray(o)) {
			
			if (isTemplate) {
				o.some(function (key, index) {
					error = validate(key, s[0], path + '.' + index, isOptional, isTemplate);
					return error;
				});
				
				return error;
			} else {
				if (o.length > s.length) return { path: path, text: 'too many atrributes', value: Object.keys(o), schema: s };
				
				s.some(function (key, index) {
					error = validate(o[index], key, path + '.' + index, isOptional, isTemplate);
					return error;
				});
				
				return error;
			}
		}
		
		return { path: path, text: 'type not match', value: o, schema: s };
	}
		
	if ('object' === typeof s) {
		skeys = Object.keys(s);
		olen = Object.keys(o).length;
		
		if (olen > skeys.length) return { path: path, text: 'too many atrributes', value: Object.keys(o), schema: skeys };
		
		skeys.some(function (key) {
			var _key = key;

			isOptional = _key.match(optionalReg) !== null;
			isTemplate = _key.match(templateReg) !== null;
			
			_key = (isOptional) ? _key.replace(optionalReg, '') : _key;
			_key = (isTemplate) ? _key.replace(templateReg, '') : _key;
			
			if ('undefined' === typeof o[_key]) {
				if (!isOptional) {
					error = { path: path, text: 'not found', value: _key, schema: _key };
					return true;
				}
				return;
			}
			
			error = validate(o[_key], s[key], path + '.' + _key, isOptional, isTemplate);
			if (!error) {
				count += 1;
			}
			
			return error;
		});
		
		if (error) return error;
		if (count !== olen) return { path: path, text: 'too many atrributes', value: Object.keys(o), schema: skeys };
		return;
	}
	
	return { path: path, text: 'not match', value: o, schema: s }
};

module.exports = validate;