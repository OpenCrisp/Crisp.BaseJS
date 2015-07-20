/**
 * reprecense any JavaScript typed Objects
 * @typedef {(external:Number|external:String|external:Object|external:Array)} AnyItem
 */



(function(g) {


	/**
	 * Basic Crisp functions
	 * @namespace util
	 * 
	 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html|use BaseJS}
	 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-Objects_test.html|use BaseJS Objects}
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
	 * @param  {AnyItem}   opt  [description]
	 * @param  {AnyItem}   [opt.args=opt] Arguments for {util.utilTickCallback}
	 * @memberOf util
	 * 
	 * @see  util.Base#utilTick
	 */
	function utilTickCall( callback, self, opt ) {
		var args = opt.args || opt;
		args = [].concat( args );

		callback.apply( self, args );

		if ( typeof opt.complete === 'function' ) {
			opt.complete.apply( self, args );
		}
	}

	/**
	 * Global Crisp Object
	 * @global
	 * @type {module:BaseJS}
	 * 
	 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#crisp|use Global Crisp}
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
	g.Crisp = {
			
		/**
		 * @module BaseJS
		 */

		/**
		 * managed Crisp Namespace
		 * @param {external:String} name Dot seperatet Namespace-Path
		 * @param {AnyItem} [obj] Any type of Objects
		 * @return {AnyItem} node of Namespace
		 *
		 * @memberOf module:BaseJS
		 *
		 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#ns|use ns}
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
		 * @param {AnyItem} [opt.args] Arguments for apply
		 * @param {external:Boolean} [async=false] Asynchronus apply
		 * @return {self}
		 *
		 * @memberOf module:BaseJS
		 *
		 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#utiltick|use utilTick}
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
		 * Crisp.utilTick( { a: 'A' }, test, { args: 'C' }, true );
		 * console.log('end');
		 * // logs:
		 * // end
		 * // { "a": "A" }
		 */
		utilTick: function( self, callback, opt, async ) {
			opt = opt || {};
			self = self || opt.self;

			if ( async ) {
				setTimeout( utilTickCall, 0, callback, self, opt );
			}
			else {
				utilTickCall( callback, self, opt );
			}

			return self;
		},



		/**
		 * @param {AnyItem}
		 * @return {external:String}
		 *
		 * @memberOf module:BaseJS
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
		 * 
		 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#totype|use toType}
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
		 *
		 * @memberOf module:BaseJS
		 *
		 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#istype|use isType}
		 * 
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
		 *
		 * @memberOf module:BaseJS
		 *
		 * @see external:String#toMath
		 * 
		 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#tomath|use toMath}
		 *
		 */
		toMath: function( name ) {
			return Math[ name ].call( Math, this );
		},

		/**
		 * create specified data format
		 * @param {external:String} type="json"
		 * @returns {external:String} converted JavaScript Object
		 * 
		 * @memberOf module:BaseJS
		 *
		 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#to|use to}
		 *
		 */
		to: function() {
			// TODO add more data formates (XML,CSV,HTML) for create Crisp.to('xml');
			return JSON.stringify( this );
		},

		/**
		 * parse data format
		 * @param {external:String} type="json"
		 * @return {AnyItem} JavaScript Objects
		 * 
		 * @memberOf module:BaseJS
		 *
		 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#parse|use parse}
		 *
		 */
		parse: function() {
			// TODO add more data formates (XML,CSV,HTML) for parse Crisp.parse('xml');
			return JSON.parse( this.toString() );
		},

		/**
		 * create JSON data format
		 * @param {external:Boolean} prity=false
		 * @returns {external:String} converted JavaScript Object
		 * 
		 * @memberOf module:BaseJS
		 *
		 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#tojson|use toJson}
		 *
		 */
		toJson: function( prity ) {
			return prity ? JSON.stringify( this, null, "\t" ) : JSON.stringify( this );
		},

		/**
		 * parse thisArg JSON
		 * @return {AnyItem} JavaScript Objects
		 * 
		 * @memberOf module:BaseJS
		 *
		 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#parsejson|use parseJson}
		 *
		 */
		parseJson: function() {
			return JSON.parse( this.toString() );
		}

	};


	/*
	 * Global Crisp Object
	 * @global
	 * @type {util.Base}
	 * 
	 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#crisp|use Global Crisp}
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
	// g.Crisp = new Base();

})(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof global !== 'undefined' ? global : window);
