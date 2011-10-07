function asyncEach(arr, iterator, fn) {
	var _arr = arr.slice(0);
	
	function tick (arr) {
		var item = arr.pop();
		
		if (item) {
			iterator(item, next);
		} else {
			fn();
		}
	}
	
	function next(err) {
		if (err) {
			fn(err);
		} else {
			process.nextTick(function () {
				tick(_arr);
			});
		}
	}
	
	tick(_arr);
};

function Schema(schema) {
	this._schema = schema;
};

Schema.prototype.validate = function (obj, fn) {
	this._validate(this._schema, obj, fn);
};

Schema.prototype._validate = function (schema, obj, fn) {
			debugger;
	var skeys = Object.keys(schema),
		additional = Schema.additional(skeys, obj);
		
	function iterator(key, next) {
		var isOptional = Schema.isOptional(key),
			skey = schema[key],
			okey = (isOptional) ? obj[key.substr(1)] : obj[key];
			
		if (!okey && !isOptional) {
			next('key: ' + key + ' must be required');
		} else {
			//TODO
			next();
		}
	}
		
	if (additional) {
		fn('To many keys');
	} else {
		asyncEach(skeys, iterator, fn);
	}
};

Schema._optionalPattern = /^\$/;
Schema.isOptional = function (keyName) {
	return keyName.match(Schema._optionalPattern) !== null;
};

Schema._filterNotOptional = function (key) {
	return !key.match(Schema._optionalPattern);
};

Schema.additional = function (skeys, obj) {
	var additional = false,
		okeys = Object.keys(obj),
		slen = skeys.length,
		olen = okeys.length,
		count;
	
	
	if (olen > slen) {
		additional = true;
	} else {
		count = 0;
		
		skeys.forEach(function (key) {
			var isOptional = Schema.isOptional(key),
				_key = (isOptional) ? key.substr(1) : key,
				isExists = okeys.indexOf(_key) > -1;
				
			if (isExists) {
				count += 1;
			}
		});
		
		if (count === slen) {
			additional = slen !== olen;
		} else {
			additional = count < olen;
		}
	}

	return additional;
};

module.exports = Schema;