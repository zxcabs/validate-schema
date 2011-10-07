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
	'optional params 2': function () {
		var schema = new Schema({
			$foo: 1,
			$bar: 2,
			baz: 3,
			foobar: 4
		});

		schema.validate({foo: 1, bar: 2, baz: 3, foobar: 4}, function (err) {
			assert.isUndefined(err);
		});
		
		schema.validate({bar: 2,  baz: 3, foobar: 4}, function (err) {
			assert.isUndefined(err);
		});

		schema.validate({baz: 3, foobar: 4}, function (err) {
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

	},
	'required params 2': function () {
		var schema = new Schema({
			$foo: 1,
			$bar: 2,
			baz: 3,
			foobar: 4
		});

		schema.validate({foo: 1, bar: 2}, function (err) {
			assert.strictEqual(err, "key: foobar must be required");
		});
		
		schema.validate({bar: 2}, function (err) {
			assert.strictEqual(err, "key: foobar must be required");
		});

		schema.validate({foobar: 4}, function (err) {
			assert.strictEqual(err, "key: baz must be required");
		});
		
		schema.validate({foo: 1, bar:2, foobar: 4}, function (err) {
			assert.strictEqual(err, "key: baz must be required");
		});	

		schema.validate({baz:3, foobar: 4}, function (err) {
			assert.isUndefined(err);
		});

		schema.validate({foo:1, bar:2, baz:3, foobar: 4}, function (err) {
			assert.isUndefined(err);
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
			assert.strictEqual(err, "To many keys");
		});
	},
	'additional params 2': function () {
		var schema = new Schema({
			$foo: 1,
			$bar: 2,
			baz: 3,
			foobar: 4
		});

		schema.validate({baz: 3, foobar: 4}, function (err) {
			assert.isUndefined(err);
		});
		
		schema.validate({foo: 1, bar: 2, baz: 3, foobar: 4}, function (err) {
			assert.isUndefined(err);
		});
		
		schema.validate({baz: 3, foobar: 4, bar: 2}, function (err) {
			assert.isUndefined(err);
		});
		
		schema.validate({foo: 1, bar: 2, baz: 3, foobar: 4, booz: 5}, function (err) {
			assert.strictEqual(err, "To many keys");
		});	

		schema.validate({baz: 3, foobar: 4, booz: 5}, function (err) {
			assert.strictEqual(err, "To many keys");
		});
	}
}