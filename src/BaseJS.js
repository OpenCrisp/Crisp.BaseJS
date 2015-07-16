/**
 * reprecense any JavaScript typed Objects
 * @typedef {(external:Number|external:String|external:Object|external:Array)} AnyItem
 */



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
	 * @see  {@link https://github.com/OpenCrisp/Crisp.BaseJS/blob/master/test/crisp-base_test.js|example codes on GitHub}
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
