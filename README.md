Function to validate javascript object (not a JSON!) by schema.
==============================================================

Syntax
------
    
    validate(object, schema);
    

By default all properties must be required, if you want set optional properties, use '$' on first character.

Example
------
    
    var validate = require('validate-schema').validate;
    
    var schema1 = {
      bar: 1,
      $foo: 2,
      fooz: {
        baz: 3,
        $str: /abc/,
        $num: Number,
        $str2: String
      }
    };
    
    validate({bar: 1, fooz: {baz: 3}}, schema1); // => true
    validate({bar: 1, foo: 2, fooz: {baz: 3}}, schema1); // => true
    validate({bar: {foo: 1}, fooz: {baz: 3}}, schema1); // => false
    validate({bar: 'adasda', fooz: {baz: /rgdfg/}}, schema1); // => false
    

See more schema example on test dir.