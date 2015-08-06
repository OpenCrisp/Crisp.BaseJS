# Crisp.BaseJS
Base JavaScript functions for OpenCrisp in NodeJS/IOjs and Browser Clients

[![Build Status](https://travis-ci.org/OpenCrisp/Crisp.BaseJS.svg)](https://travis-ci.org/OpenCrisp/Crisp.BaseJS)
[![NPM Downloads](https://img.shields.io/npm/dm/crisp-base.svg)](https://www.npmjs.com/package/crisp-base)
[![NPM Version](https://img.shields.io/npm/v/crisp-base.svg)](https://www.npmjs.com/package/crisp-base)

What is CRISP? Configuration Result In Simplified Programming

## Index Table

  * [Getting Started](#getting-started)
    * [NodeJS](#nodejs)
    * [Browsers](#browsers)
  * [Usage](#usage)
    * [Namespace example](#namespace-example)
    * [utilTick example](#utiltick-example)
    * [type example](#type-example)
  * [Links](#links)

## Getting Started

### NodeJS
Use the Node Package Manager (npm) for install crisp-base

    npm install crisp-base

or use all of OpenCrisp Utils

    npm install crisp-util

### Browsers
```html
<script type="text/javascript" src="dist/crisp-base.min.js"></script>
```

## Usage
```javascript
// global value of Crisp
var $$ = Crisp;

// private function
(function($$) {
  // code
})(Crisp);
```

### Namespace example
```javascript

// GET Namespace
Crisp.ns('a'); // return reference of a = {}

// SET and GET Namespaces
Crisp.ns('b', { a: 'A' }); // return reference of b = { a: 'A' }
```


### utilTick example
synchronous execution of an anonymous function
```javascript
Crisp.utilTick({ a: 'A' }, function() {
  console.log(this);
});
console.log('end');
// logs:
// { "a": "A" }
// end
```

asynchronous exetution of an named function
```javascript
function test( b ) {
  console.log( b.c );
}

Crisp.utilTick( { a: 'A' }, test, { args: 'C' }, true );
console.log('end');
// logs:
// end
// { "a": "A" }
```

### type example
```javascript
// get the type name
assert.strictEqual( Crisp.type.call( {} ), 'Object' );
assert.strictEqual( Crisp.type.call( '' ), 'String' );
assert.strictEqual( Crisp.type.call( 0 ), 'Number' );

assert.strictEqual( {}.xType(), 'Object' );
assert.strictEqual( ''.xType(), 'String' );
assert.strictEqual( (0).xType(), 'Number' );

// check of type name
assert.ok( Crisp.type.call( {}, 'Object' ) );
assert.ok( Crisp.type.call( '', 'String' ) );
assert.ok( Crisp.type.call( 0, 'Number' ) );

assert.ok( {}.xType( 'Object' ) );
assert.ok( ''.xType( 'String' ) );
assert.ok( (0).xType( 'Number' ) );
```


## Links
 * [Online Crisp.BaseJS module Documentation](http://opencrisp.wca.at/docs/module-BaseJS.html)
 * [More Examples on opencrisp.wca.at](http://opencrisp.wca.at/tutorials/BaseJS_test.html)
 * [Repository on GitHub.com](https://github.com/OpenCrisp/Crisp.BaseJS)
 * [npm package on npm.com](https://www.npmjs.com/package/crisp-base)
 * [Build History on Travis-ci.org](https://travis-ci.org/OpenCrisp/Crisp.BaseJS)
