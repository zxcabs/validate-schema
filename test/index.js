var Schema = require('../').Schema,
	assert = require('assert');

	
module.exports = {
	'optional params': function () {
		var schema = new Schema({
			$foo: 1,
			bar: 2
		});

		schema.validate({foo: 1, bar: 2}, function (err) {
			assert.isUndefined(err);
		});
		
		schema.validate({bar: 2}, function (err) {
			assert.isUndefined(err);
		});
	},
	'required params': function () {
		var schema = new Schema({
			foo: 1,
			bar: 2
		});

		schema.validate({foo: 1, bar: 2}, function (err) {
			assert.isUndefined(err);
		});
		
		schema.validate({bar: 2}, function (err) {
			assert.strictEqual(err, "key: foo must be required");
		});
		
		schema.validate({foo: 1, bar: 2, baz: 3}, function (err) {
			assert.strictEqual(err, "To many keys");
		});
	},
	'additional params': function () {
		var schema = new Schema({
			$foo: 1,
			bar: 2
		});

		schema.validate({foo: 1, bar: 2}, function (err) {
			assert.isUndefined(err);
		});
		
		schema.validate({bar: 2}, function (err) {
			assert.isUndefined(err);
		});
		
		schema.validate({foo: 1, bar: 2, baz: 3}, function (err) {
			assert.strictEqual(err, "To many keys");
		});

		schema.validate({bar: 2, baz: 3}, function (err) {
			assert.strictEqual(err, "key: baz should not be included");
		});
	}	
}