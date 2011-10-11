var validate = require('../').validate,
	assert = require('assert');

var schema1 = {
			bar: 1,
			$foo: 2,
			fooz: {
				baz: 3,
				$str: /abc/,
				$num: Number,
				$str2: String
			}
		},
		schema2 = {
			$foo: 1,
			bar: 2
		},
		schema3 = {
			$foo: 1,
			$bar: 2,
			$arr1: [1, 2, 3],
			$arr2: [],
			$arr3: [ {foo: 1}, {bar: 2}, {$baz: 3}]
		};

module.exports = {
	'schema1#1': function () {
		assert.isUndefined(validate({bar: 1, fooz: {baz: 3}}, schema1));
	},
	'schema1#2': function () {
		assert.isUndefined(validate({bar: 1, foo: 2, fooz: {baz: 3}}, schema1));
	},
	'schema1#3': function () {
		assert.eql(validate({bar: { foo: 1}, fooz: {baz: 3}}, schema1), {"path":".bar","text":"type not match","value":{"foo":1},"schema":1});
	},
	'schema1#4': function () {
		assert.eql(validate({bar: 'adasda', fooz: {baz: /rgdfg/}}, schema1), {"path":".bar","text":"type not match","value":"adasda","schema":1});
	},
	'schema1#5': function () {
		assert.eql(validate({bar: 1, fooz: {baz: 'adfafa'}}, schema1), {"path":".fooz.baz","text":"type not match","value":"adfafa","schema":3});
	},
	'schema1#6': function () {
		assert.isUndefined(validate({bar: 1, foo: 2, fooz: {baz: 3, str: 'abc'}}, schema1));
	},
	'schema1#7': function () {
		assert.isUndefined(validate({bar: 1, foo: 2, fooz: {baz: 3, num: 4}}, schema1));
	},
	'schema1#8': function () {
		assert.isUndefined(validate({bar: 1, foo: 2, fooz: {baz: 3, str2: 'dfdfsdfsdf'}}, schema1));
	},
	'schema1#9': function () {
		assert.isUndefined(validate({bar: 1, foo: 2, fooz: {baz: 3}}, schema1));
	},
	'schema2#1': function () {
		assert.eql(validate({bar: 2, baz: 3}, schema2), {"path":"","text":"too many atrributes","value":["bar","baz"],"schema":["$foo","bar"]});
	},
	'schema2#2': function () {
		assert.isUndefined(validate({bar: 2}, schema2));
	},
	'schema3#1': function () {
		assert.eql(validate({bar: 2, baz: 3}, schema3), {"path":"","text":"too many atrributes","value":["bar","baz"],"schema":["$foo","$bar","$arr1","$arr2","$arr3"]});
	},
	'schema3#3': function () {	
		assert.isUndefined(validate({bar: 2, arr1: [1, 2, 3]}, schema3));
	},
	'schema3#4': function () {
		assert.eql(validate({arr2: [1, 2, 3]}, schema3), {"path":".arr2","text":"too many atrributes","value":["0","1","2"],"schema":[]});
	},
	'schema3#5': function () {
		assert.isUndefined(validate({arr2: []}, schema3));
	},
	'schema3#6': function () {
		assert.isUndefined(validate({arr2: [], arr3: [{foo: 1}, {bar: 2}, {}]}, schema3));
	}
}