# Crisp.BaseJS
Base JavaScript functions for OpenCrisp in NodeJS and Browser Clients

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
    * [Tick example](#tick-example)

## Getting Started

### NodeJS
Use the Node Package Manager (npm) for install crisp-base

    npm install crisp-base

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


### Tick example
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

asynchronous exetution of an named function</caption>
```javascript
function test( b ) {
  console.log( b.c );
}

Crisp.utilTick( { a: 'A' }, test, { async: true, args: 'C' } );
console.log('end');
// logs:
// end
// { "a": "A" }
```

[More Examples on GitHub.com](https://github.com/OpenCrisp/Crisp.BaseJS/tree/master/test)