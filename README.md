# Crisp.BaseJS
Base OpenCrisp JavaScript functions for Web-Clients and Server-Nodes 

[![Build Status](https://travis-ci.org/OpenCrisp/Crisp.BaseJS.svg)](https://travis-ci.org/OpenCrisp/Crisp.BaseJS)
[![NPM Downloads](https://img.shields.io/npm/dm/crisp-base.svg)](https://www.npmjs.com/package/crisp-base)
[![NPM Version](https://img.shields.io/npm/v/crisp-base.svg)](https://www.npmjs.com/package/crisp-base)

```javascript
// return namespace objects
Crisp.ns('my.namespace');

// apply a function with arguments optional asyncronous
Crisp.utilTick( this, callback, { args: [] }, async );

// return the full JavaScript object name
Crisp.toType( {} );                         // '[object Object]'

// check the JavaScript object type with a smaller name
Crisp.isType( {}, 'Object' );               // true
```

## Index Table
  * [Getting Started](#getting-started)
    * [Server-Nodes](#server-nodes)
    * [Web-Clients](#web-clients)
    * [Development](#development)
  * [Usage](#usage)
    * [Crisp.ns()](#crispns)
    * [Crisp.utilTick()](#crisputiltick)
    * [Crisp.type](#crisptype)
    * [Crisp.to](#crispto)
    * [Crisp.parse](#crispparse)
    * [Crisp.math](#crispmath)
  * [Global Object Functions](#global-object-functions)
    * [.xType()](#user-content-xtype)
    * [.xTo()](#user-content-xto)
    * [.xParse()](#user-content-xparse)
    * [.xAdd()](#user-content-xadd)
    * [.xEach()](#user-content-xeach)
    * [.xMath()](#user-content-xmath)
    * [Number.isInteger()](#user-content-numberisinteger)
    * [RegExp.escape()](#user-content-regexpescape)
  * [Links](#links)

## Getting Started

### Server-Nodes
Use [Node Package Manager (npm)](https://www.npmjs.org) to install `crisp-base` for [Node.js](https://nodejs.org/) and [io.js](https://iojs.org/)

    $ npm install crisp-base

```javascript
// use package
require("crisp-base");
```

or use the [OpenCrisp UtilJS](https://github.com/OpenCrisp/Crisp.UtilJS) wraper

    $ npm install crisp-util

    ```javascript
    // use package
    require("crisp-util");
    ```

### Web-Clients
Use [Bower](http://bower.io/) to install `crisp-base` for Browsers APP's and other front-end workflows.

    $ bower install crisp-base

```html
<!-- use package -->
<script type="text/javascript" src="dist/crisp-base.min.js"></script>
```

or use the [OpenCrisp UtilJS](https://github.com/OpenCrisp/Crisp.UtilJS) wraper

    $ bower install crisp-util

```html
<!-- use package -->
<script type="text/javascript" src="dist/crisp-util.min.js"></script>
```

## Development
Use [Git](https://git-scm.com/) to clone `Crisp.BaseJS` from [GitHub](https://github.com/OpenCrisp/Crisp.BaseJS) to develop the repository with [Grunt](http://gruntjs.com/)

    # Clone:
    $ git clone https://github.com/OpenCrisp/Crisp.BaseJS.git
    
    # Build: test, concat, test, minify, test
    $ grunt
    
    # Test: original sourcecode for developer (included in build)
    $ grunt t
    
    # Run all test-scripts on Unix
    $ sh grunt-tests.sh

## Usage
How to use Crisp.BaseJS funktion in JavaScript

```javascript
// global value of Crisp
var $$ = Crisp;

// private function
(function($$) {
  // code
})(Crisp);
```

### Crisp.ns()
How to use `Crisp.ns()` namespaces in JavaScript

```javascript
// GET namespace
Crisp.ns('a'); // return reference of a = {}

// SET and GET namespaces
Crisp.ns('b', { a: 'A' }); // return reference of b = { a: 'A' }
```

### Crisp.utilTick()
How to use `Crisp.utilTick()` in JavaScript

```javascript
// synchronous execution of an anonymous function
Crisp.utilTick({ a: 'A' }, function() {
  console.log(this);
});

console.log('END');
// logs:
// { "a": "A" }
// END
```

```javascript
// asynchronous exetution of an named function
function test( b ) {
  console.log( b.c );
}

Crisp.utilTick( { a: 'A' }, test, { args: 'C' }, true );

console.log('END');
// logs:
// END
// { "a": "A" }
```

### Crisp.to()
How to use `Crisp.to()` in JavaScript

```javascript
Crisp.to.call('a');         // '"a"'
Crisp.to.call({ a: 'A' });  // '{"a":"A"}'
```

### Crisp.parse()
How to use `Crisp.parse()` in JavaScript

```javascript
Crisp.parse.call('"a"');        // 'a'
Crisp.parse.call('{"a":"A"}');  // { a: 'A' }
```

### Crisp.type()
How to use `Crisp.type()` in JavaScript

```javascript
// GET the small type name of JavaScript objects
Crisp.type.call( '' );          // 'String'
Crisp.type.call( 0 );           // 'Number'
Crisp.type.call( true );        // 'Boolean'
Crisp.type.call( new Date() );  // 'Date'
Crisp.type.call( {} );          // 'Object'
Crisp.type.call( [] );          // 'Array'
Crisp.type.call( /a/g );        // 'RegExp'

Crisp.type.call( null );        // 'Undefined'
Crisp.type.call( undefined );   // 'Undefined'

// CHECK the small type name of JavaScript objects
Crisp.type.call( '',         'String' );     // true
Crisp.type.call( 0,          'Number' );     // true
Crisp.type.call( true,       'Boolean' );    // true
Crisp.type.call( new Date(), 'Date' );       // true
Crisp.type.call( {},         'Object' );     // true
Crisp.type.call( [],         'Array' );      // true
Crisp.type.call( /a/g,       'RegExp' );     // true

Crisp.type.call( null,       'Undefined' );     // true
Crisp.type.call( undefined,  'Undefined' );  // true

// CHECK group of object type
Crisp.type.call(         '', 'field' );  // true
Crisp.type.call(          0, 'field' );  // true
Crisp.type.call(       true, 'field' );  // true
Crisp.type.call( new Date(), 'field' );  // true
Crisp.type.call(       /a/g, 'field' );  // true
```

### Crisp.math()
How to use `Crisp.math()` in JavaScript

```javascript
Crisp.math.call( -1, 'abs'); // 1
```

## Global Object Functions

### .xType()
How to use `.xType()` prototype functions on JavaScript objects.
@implements `Crisp.type`

```javascript
// GET the small type name of JavaScript objects
    ''.xType();  // 'String'
   (0).xType();  // 'Number'
(true).xType();  // 'Boolean'
Date().xType();  // 'Date'
    {}.xType();  // 'Object'
    [].xType();  // 'Array'
(/a/g).xType();  // 'RegExp'

// CHECK the small type name of JavaScript objects
    ''.xType( 'String' );   // true
   (0).xType( 'Number' );   // true
(true).xType( 'Boolean' );  // true
Date().xType( 'Date' );     // true
    {}.xType( 'Object' );   // true
    [].xType( 'Array' );    // true
(/a/g).xType( 'RegExp' );   // true
```

### .xTo()
How to use `.xTo()` prototype functions on JavaScript objects.
@implements `Crisp.to` << `JSON.stringify`

```javascript
// GET the JSON string of JavaScript objects
               'a'.xTo();  // '"a"'
               (0).xTo();  // '0'
            (true).xTo();  // 'true'
Date('2015-07-13').xTo();  // '"2015-07-13T00:00:00.000Z"'
        { a: "a" }.xTo();  // '{"a":"a"}'
          [ 1, 0 ].xTo();  // '[1,2]'
            (/a/g).xTo();  // '"/a/g"'
```

### .xParse()
How to use `String().xParse` function on JavaScript.
@implements `Crisp.parse` << `JSON.parse`

Parse the given JSON typed string

```javascript
// String
'"a"'.xParse(); // 'a'
'"b\\"c"'.xParse(); // 'b"c'

// Number
'1.5'.xParse(); // 1.5

// Boolean
'true'.xParse(); // true

// Date
'"2015-07-13T00:00:00.000Z"'.xParse(); // Date()

// Object
'{"a":"A"}'.xParse(); // { a: 'A' }

// Array
'["a"]'.xParse(); // ['a']
```

### .xAdd()
How to use `Array().xAdd()` prototype functions on JavaScript.
.xAdd combines the given arguments of an Array and includes all items.

The difference to `[].concat()` is to ignore `undefined` items in Arrays.

```javascript
// standard
[].xAdd('a');           // ['a']
[].xAdd( 'a', 'b' );    // ['a','b']
[].xAdd([ 'a', 'b' ]);  // ['a','b']
[].xAdd(['a'], ['b']);  // ['a','b']

// empty items
[].xAdd();           // []
[].xAdd([]);         // []
[].xAdd(['a'], []);  // ['a']

// undefined items
[].xAdd( undefined );           // []
[].xAdd( undefined, 'b' );      // ['b']
[].xAdd([ 'a', undefined ]);    // ['a']
[].xAdd(['a'], [ undefined ]);  // ['a']    
```

### .xEach()
How to use `.xEach()` prototype functions on JavaScript objects.
@implements `Crisp.toMath`

```javascript
// use `throw new Break()` to stop xEach and go to callback.complete
var Break = Crisp.ns('util.control.Break');
```

```javascript
// synchronus Object.xEach()
{a:'A',b:'B'}.xEach({
  success: function( item, index ) {
    // return; go to the next item 
    // throw new Break(); stop xEach of items
    console.log('Success:', index, item );
  },
  complete: function() {
    console.log('Complete');
  }
});
console.log('end');
// logs:
// Success: a A
// Success: b B
// Complete
// end
```

```javascript
// asynchronus Object.xEach()
{a:'A',b:'B'}.xEach({
  async: true,
  success: function( item, index ) {
    // return; go to the next item 
    // throw new Break(); stop each of items
    console.log('Success:', index, item );
  },
  complete: function() {
    console.log('Complete');
  }
});
console.log('end');
// logs:
// end
// Success: a A
// Success: b B
// Complete
```

```javascript
// syncronus Array.xEach()
['A','B'].xEach({
  success: function( item, index ) {
    // return; go to the next item 
    // throw new Break(); stop each of items
    console.log('Success:', index, item );
  },
  complete: function() {
    console.log('Complete');
  }
});
console.log('end');
// logs:
// Success: 0 A
// Success: 1 B
// Complete
// end
```

```javascript
// asynchronus Array.xEach()
['A','B'].xEach({
  async: true,
  success: function( item, index ) {
    // return; go to the next item 
    // throw new Break(); stop each of items
    console.log('Success:', index, item );
  },
  complete: function() {
    console.log('Complete');
  }
});
console.log('end');
// logs:
// end
// Success: 0 A
// Success: 1 B
// Complete
```

### .xMath()
How to use `.xMath()` prototype functions on JavaScript objects.
@implements `Crisp.math`

```javascript
// GET the return of `Math[name].call(this)` function
   (1).xMath('abs');  // 1
  (-1).xMath('abs');  // 1
(-0.1).xMath('abs');  // 0.1

   '1'.xMath('abs');  // 1
  '-1'.xMath('abs');  // 1
'-0.1'.xMath('abs');  // 0.1
```

### Number.isInteger()
How to use ES6 `Number.isInteger()` function on JavaScript.

```javascript
Number.isInteger(1);   // true
Number.isInteger(0.5); // false
```

### RegExp.escape()
How to use `RegExp.escape()` function on JavaScript.

```javascript
RegExp.escape('a.b'); // 'a\\.b'
```


## Links
 * [Online Crisp.BaseJS module documentation](http://opencrisp.wca.at/docs/module-BaseJS.html)
 * [More examples on opencrisp.wca.at](http://opencrisp.wca.at/tutorials/BaseJS_test.html)
 * [Repository on GitHub.com](https://github.com/OpenCrisp/Crisp.BaseJS)
 * [npm package on npm.com](https://www.npmjs.com/package/crisp-base)
 * [Build history on Travis-ci.org](https://travis-ci.org/OpenCrisp/Crisp.BaseJS)
