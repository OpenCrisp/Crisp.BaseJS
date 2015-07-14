/*! OpenCrisp BaseJS - v0.1.0 - 2015-07-14
* https://github.com/OpenCrisp/Crisp.BaseJS
* Copyright (c) 2015 Fabian Schmid; Licensed MIT */
(function(g) {


	/**
	 * Basic Crisp functions
	 * @namespace util
	 */
	
	
	/**
	 * @private
	 * @type {external:Object#toString}
	 * @memberOf util
	 *
	 * @example
	 * toType.call('a') // [object String]
	 */
	var toType = Object.prototype.toString;

	/**
	 * @callback utilTickCallback
	 * @private
	 * @param {AnyIte} opt
	 * @memberOf util
	 *
	 * @see  util.Base#utilTick
	 * @see  util.utilTickCall
	 */

	/**
	 * [utilTickCall description]
	 * @private
	 * @param  {util.utilTickCallback} callback [description]
	 * @param  {AnyItem}   opt      [description]
	 * @memberOf util
	 * 
	 * @see  util.Base#utilTick
	 */
	function utilTickCall( callback, opt ) {
		var args = opt.args || opt;
		args = [].concat( args );

		callback.apply( opt.self, args );

		if ( typeof opt.complete === 'function' ) {
			opt.complete.apply( opt.self, args );
		}
	}

	/**
	 * Global {@link Crisp} is an instance of [new Base()]{@linkcode util.Base}
	 * @class
	 * @private
	 * @memberOf util
	 * 
	 * @example
	 * // DOM
	 * window.Crisp = new Base();
	 *
	 * // NodeJS
	 * global.Crisp = new Base();
	 * // OR
	 * module.exports = new Base();
	 */
	function Base() {}

	Base.prototype = {
		
		/**
		 * managed Crisp Namespace
		 * @param {external:String} name Dot seperatet Namespace-Path
		 * @param {AnyItem} [obj] Any type of Objects
		 * @return {AnyItem} node of Namespace
		 *
		 * @example
		 * // GET
		 * Crisp.ns('a'); // return reference of a = {}
		 * 
		 * // SET and GET
		 * Crisp.ns('b', { a: 'A' }); // return reference of b = { a: 'A' }
		 */
		ns: function( name, obj ) {
			var parts = name.split('.'),
				parent = this,
				length;

			length = parts.length - 1;

			for (var i = 0, m = length; i < m; i += 1) {
				parent[ parts[i] ] = parent[ parts[i] ] || {};
				parent = parent[ parts[i] ];
			}

			if ( obj ) {
				if ( !this.isType( parent[ parts[length] ], "Undefined" ) ) {
					throw new Error("Can't overwrite '" + name + "' of defined!");
				}

				parent[ parts[length] ] = obj;
			}
			else if ("undefined" === typeof parent[parts[length]]) {
				parent[ parts[length] ] = {};
			}

			return parent[parts[length]];
		},

		/**
		 * execute function
		 * @param {external:Object} self alternate of opt.self and return param
		 * @param {util.utilTickCallback} callback Function for apply
		 * @param {external:Object} [opt] Options for apply
		 * @param {AnyItem} [opt.self=self] thisArg of apply 
		 * @param {external:Boolean} [opt.async=false] Asynchronus apply
		 * @param {AnyItem} [opt.args] Arguments for apply
		 * @return {self}
		 *
		 * @example <caption>synchronous execution of an anonymous function</caption>
		 * Crisp.utilTick({ a: 'A' }, function() {
		 *   console.log(this);
		 * });
		 * console.log('end');
		 * // logs:
		 * // { "a": "A" }
		 * // end
		 *
		 * @example <caption>asynchronous exetution of an named function</caption>
		 * function test( b ) {
		 *   console.log( b.c );
		 * }
		 * 
		 * Crisp.utilTick( { a: 'A' }, test, { async: true, args: 'C' } );
		 * console.log('end');
		 * // logs:
		 * // end
		 * // { "a": "A" }
		 */
		utilTick: function( self, callback, opt ) {
			opt = opt || {};
			opt.self = opt.self || self;

			if ( opt.async ) {
				// TODO delete "delete opt.async" if changed call opt to apply opt.args
				// delete opt.async;
				setTimeout( utilTickCall, 0, callback, opt );
			}
			else {
				utilTickCall( callback, opt );
			}

			return self;
		},



		/**
		 * @param {AnyItem}
		 * @return {external:String}
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
		 * 
		 * @example
		 * Crisp.toType("") // "[object String]"
		 * Crisp.toType(0) // "[object Number]"
		 */
		toType: function( self ) {
			return toType.call( self );
		},

		/**
		 * check type of object
		 * @param {AnyItem} obj
		 * @param {external:String} type
		 * @returns {external:Boolean} 
		 */
		isType: function( obj, type ) {
			if ( type === 'Undefined' ) {
				return ['[object Undefined]', '[object DOMWindow]'].indexOf( toType.call( obj ) ) !== -1;
			}
			else {
				return toType.call( obj ) === '[object '.concat( type, ']' );
			}
		},

		/**
		 * @param  {external:String} name name of Math Function
		 * @return {Number}
		 */
		toMath: function( name ) {
			return Math[ name ].call( Math, this );
		},

		/**
		 * create specified data format
		 * @param {external:String} type="json"
		 * @returns {external:String} converted JavaScript Object
		 */
		to: function() {
			// TODO add more data formates (XML,CSV,HTML) for create Crisp.to('xml');
			return JSON.stringify( this );
		},

		/**
		 * parse data format
		 * @param {external:String} type="json"
		 * @return {AnyItem} JavaScript Objects
		 */
		parse: function() {
			// TODO add more data formates (XML,CSV,HTML) for parse Crisp.parse('xml');
			return JSON.parse( this.toString() );
		},

		/**
		 * create JSON data format
		 * @param {external:Boolean} prity=false
		 * @returns {external:String} converted JavaScript Object
		 */
		toJson: function( prity ) {
			return prity ? JSON.stringify( this, null, "\t" ) : JSON.stringify( this );
		},

		/**
		 * parse thisArg JSON
		 * @return {AnyItem} JavaScript Objects
		 */
		parseJson: function() {
			return JSON.parse( this.toString() );
		}

	};


	/**
	 * Global Crisp Object
	 * @global
	 * @type {util.Base}
	 * 
	 * @example
	 * // DOM
	 * var $$ = window.Crisp;
	 *
	 * // NodeJS
	 * var $$ = global.Crisp;
	 * 
	 * // OR
	 * var $$ = Crisp;
	 *
	 * // use Crisp in private Block
	 * (function($$) {
	 *   // code
	 * })(Crisp);
	 */
	g.Crisp = new Base();

})(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof global !== 'undefined' ? global : window);


(function($$) {
	/**
	 * @namespace util.control
	 */
	
	/**
	 * only a Break controller without aktivities
	 * @function util.control.Break
	 *
	 * @example
	 * var Break = Crisp.ns('util.control.Break');
	 * 
	 * ['a','b'].xEach({
	 *   success: function( item ) {
	 *     console.log( item );
	 *     throw new Break();
	 *   }
	 * });
	 * 
	 * // logs:
	 * // 'a'
	 * 
	 */
	$$.ns('util.control.Break', function() {});
	
	/**
	 * only a End controller without aktivities
	 * @function util.control.End
	 * @public
	 *
	 * @example
	 * var End = Crisp.ns('util.control.End');
	 *
	 * // tigger an End throw
	 * throw new End();
	 *
	 * // use in a try Block
	 * try {
	 *   throw new End();
	 * } 
	 * catch (e) { 
	 *   if ( e instanceof End ) {
	 *     // code
	 *   }
	 *   else {
	 *     throw e;
	 *   }
	 * }
	 * 
	 */
	$$.ns('util.control.End', function() {});

})(Crisp);
(function($$) {

	var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');




	/**
	 * @external Array
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
	 */
	
	/**
	 * add one or more items/arrays for concat in Array.
	 * empty Arrays and undefined items are ignored 
	 * 
	 * @function external:Array.prototype.xAdd
	 * @param {external:Object|external:Array} item one or more of items
	 * @return {this}
	 * 
	 * @example
	 * // standard
	 * [].xAdd('a'); // ['a']
	 * [].xAdd( 'a', 'b' ); // ['a','b']
	 * [].xAdd([ 'a', 'b' ]); // ['a','b']
	 * [].xAdd(['a'], ['b']); // ['a','b']
	 * 
	 * // empty items
	 * [].xAdd(); // []
	 * [].xAdd([]); // []
	 * [].xAdd(['a'], []); // ['a']
	 * 
	 * // undefined items
	 * [].xAdd( undefined ); // []
	 * [].xAdd( undefined, 'b' ); // ['b']
	 * [].xAdd([ 'a', undefined ]); // ['a']
	 * [].xAdd(['a'], [ undefined ]); // ['a']
	 */
	function xAddArray() {
		var i = 0,
			m = arguments.length,
			a;

		for (; i<m; i+=1 ) {
			a = arguments[i];

			if ( $$.isType( a, 'Array' ) ) {
				xAddArray.apply( this, a );
			}
			else if ( a !== undefined ) {
				this.push(a);
			}
		}

		return this;
	}

	Object.defineProperty( Array.prototype, 'xAdd', {
		value: xAddArray
	});


	/**
	 * sync/async each of Array items
	 * 
	 * @function external:Array.prototype.xEach
	 * @param {external:Object} opt
	 * @param {callback} opt.success Function to execute for each item
	 * @param {external:Object} [opt.self] use an Object for .call() the success an complete Function
	 * @param {callback} [opt.complete] Function are exeute on end of xEach
	 * @param {external:Boolean} [opt.async] enable asynchronus
	 * @return {this}
	 *
	 * @example
	 * ['A','B'].xEach({
	 *   success: function( item, index ) {
	 *     // return; got to the next item 
	 *     // throw new Break(); stop each of items
	 *     console.log('success:', index, item );
	 *   },
	 *   complete: function() {
	 *     console.log('complete');
	 *   }
	 * });
	 * console.log('end');
	 * // logs:
	 * // success: 0 A
	 * // success: 1 B
	 * // complete
	 * // end
	 *
	 * 
	 * @example
	 * // async
	 * ['A','B'].xEach({
	 *   async: true,
	 *   success: function( item, index ) {
	 *     console.log('success:', index, item );
	 *   },
	 *   complete: function() {
	 *     console.log('complete');
	 *   }
	 * });
	 * console.log('end');
	 * // logs:
	 * // end
	 * // success: 0 A
	 * // success: 1 B
	 * // complete
	 */
	function xEachArray( opt ) {
		var i = 0,
			m = this.length;

		try {
			
			for (; i<m; i+=1 ) {
				opt.success.call( opt.self, this[i], i );
			}

		} catch (e) { if ( e instanceof Break ) {} else { throw e; } }
		
		return this;
	}

	Object.defineProperty( Array.prototype, 'xEach', {
		value: function( opt ) {
			return $$.utilTick( this, xEachArray, opt );
		}
	});


	/**
	 * @function external:Array.prototype.xTo
	 * @return {String}
	 * @implements {module:Crisp/BaseJS.Base#to}
	 *
	 * @example
	 * ['a'].xTo(); // '["a"]'
	 */
	Object.defineProperty( Array.prototype, 'xTo', {
		value: $$.to
	});


})(Crisp);
(function($$) {

	// var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');




	/**
	 * @external Boolean
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
	 */
	
	/**
	 * @function external:Boolean.prototype.xTo
	 * @param {String} type data format
	 * @implements {module:Crisp/BaseJS.Base#to}
	 *
	 * @example
	 * (false).xTo(); // 'false'
	 * (true).xTo(); // 'true'
	 */
	Object.defineProperty( Boolean.prototype, 'xTo', {
		value: $$.to
	});



})(Crisp);
(function($$) {

	// var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');



	/**
	 * @external Date
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
	 */
	
	/**
	 * @function external:Date.prototype.xTo
	 * @param {String} type data format
	 * @implements {module:Crisp/BaseJS.Base#to}
	 *
	 * @example
	 * new Date('2015-07-13').xTo(); // '"2015-07-13T00:00:00.000Z"'
	 */
	Object.defineProperty( Date.prototype, 'xTo', {
		value: $$.to
	});


})(Crisp);
(function($$) {

	// var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');





	/**
	 * @external Number
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
	 */
	
	/**
	 * check given number is an integer
	 * @function external:Number.prototype.isInterger
	 */
	Number.isInteger = Number.isInteger || function(value) {
		return $$.isType( value, "Number" ) && isFinite(value) && Math.floor(value) === value;
	};


	/**
	 * @function external:Number.prototype.toMath
	 * @param {String} name name of Math Function
	 * @implements {module:Crisp/BaseJS.Base#toMath}
	 *
	 * @example
	 * (1).toMath('abs'); // 1
	 * (-1).toMath('abs'); // 1
	 * (-0.1).toMath('abs'); // 0.1
	 */
	Object.defineProperty( Number.prototype, 'toMath', {
		value: $$.toMath
	});

	/**
	 * @function external:Number.prototype.xTo
	 * @param {String} type data format
	 * @implements {module:Crisp/BaseJS.Base#to}
	 *
	 * @example
	 * (0).xTo(); // '0'
	 * (1.5).xTo(); // '1.5'
	 */
	Object.defineProperty( Number.prototype, 'xTo', {
		value: $$.to
	});





})(Crisp);
(function($$) {

	var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');





	/**
	 * @external Object
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
	 */
	

	/**
	 * @function external:Object.prototype.toString
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
	 */
	
	
	/**
	 * sync/async each of Object items
	 * 
	 * @function external:Object.prototype.xEach
	 * @param {external:Object} opt
	 * @param {callback} opt.success Function to execute for each item
	 * @param {external:Object} [opt.self] use an Object for .call() the success an complete Function
	 * @param {callback} [opt.complete] Function are exeute on end of xEach
	 * @param {external:Boolean} [opt.async] enable asynchronus
	 * @return {this}
	 * @public
	 *
	 * @example
	 * {a:'A',b:'B'}.xEach({
	 *   success: function( item, index ) {
	 *     // return; got to the next item 
	 *     // throw new Break(); stop each of items
	 *     console.log('success:', index, item );
	 *   },
	 *   complete: function() {
	 *     console.log('complete');
	 *   }
	 * });
	 * console.log('end');
	 * // logs:
	 * // success: a A
	 * // success: b B
	 * // complete
	 * // end
	 *
	 * 
	 * @example
	 * // async
	 * {a:'A',b:'B'}.xEach({
	 *   async: true,
	 *   success: function( item, index ) {
	 *     console.log('success:', index, item );
	 *   },
	 *   complete: function() {
	 *     console.log('complete');
	 *   }
	 * });
	 * console.log('end');
	 * // logs:
	 * // end
	 * // success: a A
	 * // success: b B
	 * // complete
	 */
	function xEachObject( opt ) {
		var keys = Object.keys( this ),
			i = 0,
			m = keys.length,
			name;

		try {

			for (; i<m; i+=1 ) {
				name = keys[i];
				opt.success.call( opt.self, this[ name ], name );
			}

		} catch (e) { if ( e instanceof Break ) {} else { throw e; } }
	}

	Object.defineProperty( Object.prototype, 'xEach', {
		value: function( opt ) {
			return $$.utilTick( this, xEachObject, opt );
		}
	});


	/**
	 * @function
	 * @name xTo
	 * @return {String}
	 * @implements {module:Crisp/BaseJS.Base#to}
	 * @memberOf Object.prototype
	 *
	 * @example
	 * { a: 'A' }.xTo(); // '{"a":"A"}'
	 */
	Object.defineProperty( Object.prototype, 'xTo', {
		value: $$.to
	});




	Object.defineProperty( Object.prototype, 'toURLParam', {
		value: function() {
			var ret = [];

			this.xEach({
				success: function(item, index) {
					var str = "";

					if ( $$.isType( item, 'Object' ) ) {
						str = item.xTo();
					}
					else if ( $$.isType( item, 'Array' ) ) {
						str = item.xTo();
					}
					else if ( $$.isType( item, 'Boolean' ) ) {
						str = item.xTo();
					}
					else {
						str = item.toString();
					}

					str = index.concat("=", str);

					ret.push(str);
				}
			});

			return ret.join("&");
		}
	});




})(Crisp);
(function() {

	// var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');




	/**
	 * @external RegExp
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
	 */
	
	/**
	 * Regualar Expression for escape string
	 * @private
	 * @type {external:RegExp}
	 * @memberOf external:RegExp
	 *
	 * @see  {@link http://regexper.com/#%2F%5B.*%2B%3F%5E%24%7B%7D()%7C%5B%5C%5D%5C%5C%5D%2Fg|Regexper.com}
	 */
	var regExpEscape = /[.*+?^${}()|[\]\\]/g;

	/**
	 * escape all regular expression characters in the given string for inlude in a regular espression
	 * @function external:RegExp.escape
	 * @param {String} str the string to escape
	 * @return {String} escaped string
	 *
	 * @see  https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
	 *
	 * @example
	 * RegExp.escape('a.b'); // 'a\\.b'
	 */
	RegExp.escape = RegExp.escape || function( str ) {
		return str.replace( regExpEscape, "\\$&");
	};


})(Crisp);
(function($$) {

	// var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');



	/**
	 * @external String
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
	 */
	
	/**
	 * @function external:String.prototype.toMath
	 * @param {String} name name of Math Function
	 * @implements {util.Base#toMath}
	 *
	 * @example
	 * '1'.toMath('abs'); // 1
	 * '-1'.toMath('abs'); // 1
	 * '-0.1'.toMath('abs'); // 0.1
	 */
	Object.defineProperty( String.prototype, 'toMath', {
		value: $$.toMath
	});

	/**
	 * @function external:String.prototype.xTo
	 * @param {String} type data format
	 * @implements {util.Base#to}
	 *
	 * @example
	 * 'a'.xTo(); // '"a"'
	 * 'b"c'.xTo(); // '"b\\"c"'
	 */
	Object.defineProperty( String.prototype, 'xTo', {
		value: $$.to
	});

	/**
	 * @public
	 * @function external:String.prototype.xParse
	 * @param {String} type data format
	 * @implements {util.Base#parse}
	 *
	 * @example
	 * // Array
	 * '["a"]'.xParse(); // ['a']
	 * 
	 * // Boolean
	 * 'true'.xParse(); // true
	 * 
	 * // Date
	 * '"2015-07-13T00:00:00.000Z"'.xParse(); // Date()
	 * 
	 * // Number
	 * '1.5'.xParse(); // 1.5
	 * 
	 * // Object
	 * '{"a":"A"}'.xParse(); // { a: 'A' }
	 * 
	 * // String
	 * '"a"'.xParse(); // 'a'
	 * '"b\\"c"'.xParse(); // 'b"c'
	 */
	Object.defineProperty( String.prototype, 'xParse', {
		value: $$.parse
	});


})(Crisp);