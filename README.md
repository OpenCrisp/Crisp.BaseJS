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

// return the small JavaScript object name
Crisp.type.call( {} );                         // 'Object'

// check the JavaScript object type with a smaller name
Crisp.type.call( {}, 'Object' );               // true
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
How to use `Crisp.BaseJS` funktion in JavaScript

```javascript
// global value of Crisp
var $$ = Crisp;

// private function
(function($$) {
  // code
})(Crisp);
```

### Crisp.ns()
How to use `Crisp.ns( name [, object ])` namespaces in JavaScript

```javascript
// GET namespace
Crisp.ns('a'); // return reference of a = {}

// SET and GET namespaces
Crisp.ns('b', { a: 'A' }); // return reference of b = { a: 'A' }
```

> #### Why namespaces for OpenCrisp?
> You can manged youre modules in namespaces an inherit one or more with [`Crisp.utilCreate(option)`](http://opencrisp.wca.at/docs/module-BaseJS.html#.utilCreate) in JavaScript.
> **Example:** include [Crisp.EventJS](http://opencrisp.wca.at/docs/util.event.html) and [Crisp.PathJS](http://opencrisp.wca.at/docs/util.path.html) with [Crisp.CreateJS](http://opencrisp.wca.at/docs/util.create.html)
> ```javascript
> var myObject = Crisp.utilCreate({
>   ns: ['util.event','util.path']
> }).objIni();
> 
> // now you can use the functions of Crisp.EventJS on your object
> myObject.eventListener( option );
> myObject.eventTrigger( option );
> 
> // or the functions of Crisp.PathJS
> myObject.pathFind( option );
> myObject.pathExists( path );
> ```

### Crisp.utilTick()
How to use `Crisp.utilTick( this, callback, options, async=false )` in JavaScript

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

> #### Why utilTick event loop for OpenCrisp?
> You have one interface for apply functions one behind the other (sync) or parallel (async). You must only set the default option of `async=false` to `async=true` 

### Crisp.to
How to use `Crisp.to.call( this )` in JavaScript

```javascript
Crisp.to.call('a');         // '"a"'
Crisp.to.call({ a: 'A' });  // '{"a":"A"}'
```
> [use `.xTo()` on all global JavaScript objects](#user-content-xto)

### Crisp.parse
How to use `Crisp.parse.call( this )` in JavaScript

```javascript
Crisp.parse.call('"a"');        // 'a'
Crisp.parse.call('{"a":"A"}');  // { a: 'A' }
```
> [use `.xParse()` on global JavaScript object `String`](#user-content-xparse)

### Crisp.type
How to use `Crisp.type.call( this [, name ])` in JavaScript

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

Crisp.type.call( null,       'Undefined' );  // true
Crisp.type.call( undefined,  'Undefined' );  // true

// CHECK group of object type
Crisp.type.call(         '', 'field' );  // true
Crisp.type.call(          0, 'field' );  // true
Crisp.type.call(       true, 'field' );  // true
Crisp.type.call( new Date(), 'field' );  // true
Crisp.type.call(       /a/g, 'field' );  // true
```
> [use `.xType()` on all global JavaScript objects](#user-content-xtype)

### Crisp.math()
How to use `Crisp.math()` in JavaScript

```javascript
Crisp.math.call( -1, 'abs'); // 1
```
> [use `.xMath()` on global JavaScript objects String and Number](#user-content-xmath)

## Global Object Functions

### .xType()
How to use `.xType([ name ])` prototype functions on JavaScript objects.
@implements [`Crisp.type`](#crisptype)

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
How to use `.xTo()` prototype function on JavaScript objects.
@implements [`Crisp.to`](#crispto) << `JSON.stringify`

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
How to use `String().xParse()` prototype function on JavaScript.
@implements [`Crisp.parse`](#crispparse) << `JSON.parse`

Parse the given JSON typed string

```javascript
                       '"a"'.xParse();  // 'a'          String
                   '"b\\"c"'.xParse();  // 'b"c'        String
                       '1.5'.xParse();  // 1.5          Number
                      'true'.xParse();  // true         Boolean
'"2015-07-13T00:00:00.000Z"'.xParse();  // Date()       Date
                 '{"a":"A"}'.xParse();  // { a: 'A' }   Object
                     '["a"]'.xParse();  // ['a']        Array
```

### .xAdd()
How to use `Array().xAdd( list [, list ])` prototype functions on JavaScript.

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

> #### Why xAdd concatenation for OpenCrisp?
> `.xAdd()` combines the given arguments of an `Array` and includes all items.
> The difference to `[].concat()` is to ignore `undefined` items of lists.

### .xEach()
How to use `.xEach( option )` prototype functions on JavaScript objects.

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
console.log('End');

// logs:
// Success: a A
// Success: b B
// Complete
// End
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
console.log('End');

// logs:
// End
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
console.log('End');

// logs:
// Success: 0 A
// Success: 1 B
// Complete
// End
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
console.log('End');

// logs:
// End
// Success: 0 A
// Success: 1 B
// Complete
```

### .xMath()
How to use `.xMath( name )` prototype function on JavaScript objects.
@implements [`Crisp.math`](#crispmath) << [`Math[function name]( args )`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

```javascript
// GET the return of `Math[name].call(this)` function
   (1).xMath('abs');  // 1
  (-1).xMath('abs');  // 1
(-0.1).xMath('abs');  // 0.1

   '1'.xMath('abs');  // 1
  '-1'.xMath('abs');  // 1
'-0.1'.xMath('abs');  // 0.1
```

> #### Why xMath on global object of `String` and `Number` for OpenCrisp?
> You can use the function directly in [`Crisp.PathJS`](https://github.com/OpenCrisp/Crisp.PathJS) without external coding.
> 
> ```javascript
> // example with Crisp.PathJS
> var myObject = [ 20.49, 20.5, 20, 21 ];
> Crisp.definePath( myObject );
> 
> myObject.pathFind({
>   path: '*( :xMath("round") >= 21 )',
>   success: function( item ) {
>     console.log('Success:', item );
>   },
>   complete: function( e ) {
>     console.log('Complete');
>   }
> });
> console.log('End');
> 
> // logs:
> // Success: 20.5
> // Success: 21
> // Complete
> // End
> ```

### Number.isInteger()
How to use ES6 `Number.isInteger( number )` function on JavaScript.

```javascript
Number.isInteger(1);   // true
Number.isInteger(0.5); // false
```

### RegExp.escape()
How to use `RegExp.escape( string )` function on JavaScript.

```javascript
RegExp.escape('a.b'); // 'a\\.b'
```


## Links
 * [Online Crisp.BaseJS module documentation](http://opencrisp.wca.at/docs/module-BaseJS.html)
 * [More examples on opencrisp.wca.at](http://opencrisp.wca.at/tutorials/BaseJS_test.html)
 * [Repository on GitHub.com](https://github.com/OpenCrisp/Crisp.BaseJS)
 * [npm package on npm.com](https://www.npmjs.com/package/crisp-base)
 * [Build history on Travis-ci.org](https://travis-ci.org/OpenCrisp/Crisp.BaseJS)
