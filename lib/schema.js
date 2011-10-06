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
	var skeys = Object.keys(schema),
		okeys = Object.keys(obj),
		slen = skeys.length,
		olen = okeys.length,
		additional;
		
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
		
	if (olen > slen) {
		fn('To many keys');
	} else {
		
		additional = Schema.isAdditional(skeys, obj);
		
		if (additional) {
			fn('key: ' + key + ' should not be included');
		} else {		
			asyncEach(skeys, iterator, fn);
		}
	}
};

Schema._optionalPattern = /^\$/;
Schema.isOptional = function (keyName) {
	return keyName.match(Schema._optionalPattern) !== null;
};

Schema._filterNotOptional = function (key) {
	return !key.match(Schema._optionalPattern);
};

Schema.isAdditional = function (skeys, obj) {
	var additional,
		filtered = skeys.filter(Schema._filterNotOptional);

	//TODO
	return additional;
};

module.exports = Schema;