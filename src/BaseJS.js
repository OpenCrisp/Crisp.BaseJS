
/**
 * reprecense any JavaScript typed Objects
 * @typedef {(external:Number|external:String|external:Object|external:Array)} AnyItem
 */


/**
 * Basic Crisp functions
 * @namespace       util
 * 
 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html|use BaseJS}
 * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-Objects_test.html|use BaseJS Objects}
 */

(function(g) {
    
    /**
     * @private
     * @type        {external:Object#toString}
     * @memberOf    util
     *
     * @example
     * toType.call('a') // [object String]
     */
    var toType = Object.prototype.toString;

    var regTypeTrim = /^\[object ([a-z]+)\]$/i;


    /**
     * @private
     * @callback util.utilTickCallback
     * 
     * @param       {external:Array<AnyItem>}  args
     * 
     * @this        AnyItem
     *
     * @see  module:BaseJS.utilTick
     * @see  util.utilTickCall
     *
     * @example
     * callback.apply( self, args );
     */

    /**
     * @private
     * 
     * @param       {util.utilTickCallback}  callback
     * @param       {AnyItem}                opt
     * @param       {AnyItem}                [opt.args=opt]  Arguments for {@link util.utilTickCallback}
     * 
     * @memberOf    util
     * 
     * @see  module:BaseJS.utilTick
     *
     * @example
     * utilTickCall( callback, self, opt );
     *
     * @example <caption>async</caption>
     * setTimeout( utilTickCall, 0, callback, self, opt );
     */
    function utilTickCall( callback, self, opt ) {
        var args = opt.args;

        if ( args === undefined ) {
            args = opt;
        }
        
        args = [].concat( args );

        callback.apply( self, args );

        if ( typeof opt.complete === 'function' ) {
            opt.complete.apply( self, args );
        }
    }


    function isType( object, type ) {
        if ( type === 'field' ) {
            return isType( object, 'String' ) || isType( object, 'Number' ) || isType( object, 'Boolean' ) || isType( object, 'Date' ) || isType( object, 'RegExp' );
        }
        else if ( type === 'Undefined' ) {
            return ['[object Undefined]', '[object DOMWindow]'].indexOf( toType.call( object ) ) !== -1;
        }
        else {
            return toType.call( object ) === '[object '.concat( type, ']' );
        }
    }

    /**
     * Global Crisp Object
     * @global
     * @type        {module:BaseJS}
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
         * 
         * @param       {external:String} name    Dot seperatet Namespace-Path
         * @param       {AnyItem}         [obj]   Any type of Objects
         * 
         * @this        module:BaseJS
         * @return      {AnyItem} node of Namespace
         *
         * @memberOf    module:BaseJS
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
         * execute function with (async) {@link util.utilTickCall}
         * 
         * @param       {external:Object}         [self=opt.self] alternate of opt.self and return param
         * @param       {util.utilTickCallback}   callback        Function for apply
         * @param       {external:Object}         [opt]           Options for apply
         * @param       {AnyItem}                 [opt.self]      thisArg of apply 
         * @param       {AnyItem}                 [opt.args]      Arguments for apply
         * @param       {external:Boolean}        [async=false]   Asynchronus apply
         * 
         * @this        module:BaseJS
         * @return      {self}
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
         * @param       {AnyItem} object
         * 
         * @this        module:BaseJS
         * @return      {external:String}
         *
         * @memberOf    module:BaseJS
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
         * 
         * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#totype|use toType}
         *
         * @example
         * Crisp.toType("") // "[object String]"
         * Crisp.toType(0) // "[object Number]"
         */
        toType: function( object ) {
            return toType.call( object );
        },


        /**
         * check type of object
         * @param       {AnyItem}         object
         * @param       {external:String} type
         * 
         * @this        module:BaseJS
         * @returns     {external:Boolean}
         *
         * @memberOf    module:BaseJS
         *
         * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#istype|use isType}
         * 
         * @example
         * Crisp.isType("", "String"); // true
         * Crisp.isType(0, "Number"); // true
         * 
         * Crisp.isType({}, "String"); // false
         * Crisp.isType([], "Number"); // false
         */
        isType: isType,


        /**
         * get or check type of object
         * @param       {external:String} [type]
         * 
         * @this        module:BaseJS
         * @returns     {external:Boolean|external:String}
         *
         * @memberOf    module:BaseJS
         *
         * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#type|use type}
         * 
         * @example
         * Crisp.type.call("");  // "String"
         * Crisp.type.call(0);   // "Number"
         * 
         * Crisp.type.call("", "String"); // true
         * Crisp.type.call(0, "Number");  // true
         * 
         * Crisp.type.call({}, "String"); // false
         * Crisp.type.call([], "Number"); // false
         */
        type: function( type ) {
            if ( type ) {
                return isType( this, type );
            }
            else {
                return toType.call( this ).replace( regTypeTrim, "$1" );
            }
        },


        /**
         * @param       {external:String} name name of Math Function
         * 
         * @this        module:BaseJS
         * @return      {external:Number}
         *
         * @memberOf    module:BaseJS
         *
         * @see external:String#toMath
         * 
         * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#tomath|use toMath}
         *
         * @example
         * Crisp.toMath.call( -1, 'abs'); // 1
         */
        toMath: function( name ) {
            return Math[ name ].call( Math, this );
        },


        /**
         * create specified data format
         * 
         * @param       {external:String} type="json"
         * 
         * @this        module:BaseJS
         * @returns     {external:String} converted JavaScript Object
         * 
         * @memberOf    module:BaseJS
         *
         * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#to|use to}
         *
         * @example
         * Crisp.to.call('a'); // '"a"'
         * Crisp.to.call({ a: 'A' }); // '{"a":"A"}'
         */
        to: function() {
            // TODO add more data formates (XML,CSV,HTML) for create Crisp.to('xml');
            return JSON.stringify( this );
        },

        /**
         * parse data format
         * 
         * @param       {external:String} type="json"
         * 
         * @this        module:BaseJS
         * @return      {AnyItem} JavaScript Objects
         * 
         * @memberOf    module:BaseJS
         *
         * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#parse|use parse}
         *
         * @example
         * Crisp.parse.call('"a"'); // 'a'
         * Crisp.parse.call('{"a":"A"}'); // { a: 'A' }
         */
        parse: function() {
            // TODO add more data formates (XML,CSV,HTML) for parse Crisp.parse('xml');
            return JSON.parse( this.toString() );
        },


        /**
         * create JSON data format
         * 
         * @deprecated change to {@linkcode module:BaseJS.to|Crisp.to('json')}
         * 
         * @param       {external:Boolean} prity=false
         * 
         * @this        module:BaseJS
         * @returns     {external:String} converted JavaScript Object
         * 
         * @memberOf    module:BaseJS
         *
         * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#tojson|use toJson}
         */
        toJson: function( prity ) {
            return prity ? JSON.stringify( this, null, "\t" ) : JSON.stringify( this );
        },


        /**
         * parse this.toString() to JavaScript Objects
         * 
         * @deprecated change to {@linkcode module:BaseJS.parse|Crisp.parse('json')}
         * 
         * @this        module:BaseJS|AnyItem
         * @return      {AnyItem} JavaScript Objects
         * 
         * @memberOf    module:BaseJS
         *
         * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#parsejson|use parseJson}
         *
         * @example <caption>create a copy of {@link module:BaseJS} with {@link AnyItem}</caption>
         * Crisp.parseJson(); 
         *
         * @example <caption>parse {@link AnyItem} to {@link external:String} and crate a new JavaScript object of {@link AnyItem}</caption>
         * Crisp.parseJson.call('{"a":"A"}'); // { "a": "A" }
         */
        parseJson: function() {
            return JSON.parse( this.toString() );
        }

    };

})(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof global !== 'undefined' ? global : window);
