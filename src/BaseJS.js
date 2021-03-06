
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
    var toTypeString = Object.prototype.toString;

    /**
     * @private
     * @type {external:RegExp}
     * @memberOf util
     *
     * @example
     * '[object String]'.replace( regTypeTrim, '$1' ); // 'String'
     *  toType.call('a').replace( regTypeTrim, '$1' ); // 'String'
     */
    var regTypeTrim = /^\[object ([a-z]+)\]$/i;

    /**
     * @private
     * @type {external:Array}
     * @memberOf util
     */
    var typeOfUndefined     = ['global', 'Null', 'DOMWindow', 'Window'];

    var typeNameBoolean     = 'Boolean';
    var typeNameDate        = 'Date';
    var typeNameFunction    = 'Function';
    var typeNameNumber      = 'Number';
    var typeNameRegExp      = 'RegExp';
    var typeNameString      = 'String';
    var typeNameUndefined   = 'Undefined';



    function toType( object ) {
        var type = toTypeString.call( object ).replace( regTypeTrim, "$1" );

        if ( typeOfUndefined.indexOf( type ) !== -1 ) {
            type = typeNameUndefined;
        }

        return type;
    }

    function isType( object, type ) {
        if ( type === 'field' ) {
            return isType( object, typeNameString ) || isType( object, typeNameNumber ) || isType( object, typeNameBoolean ) || isType( object, typeNameDate ) || isType( object, typeNameRegExp );
        }
        else {
            return toType( object ) === type;
        }
    }



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
     * @deprecated 
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

        if ( isType( opt.complete, typeNameFunction ) ) {
            opt.complete.apply( self, args );
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
                if ( !isType( parent[ parts[length] ], typeNameUndefined ) ) {
                    throw new Error("Can't overwrite '" + name + "' of defined!");
                }

                parent[ parts[length] ] = obj;
            }
            else if ( isType( parent[parts[length]], typeNameUndefined ) ) {
                parent[ parts[length] ] = {};
            }

            return parent[parts[length]];
        },


        /**
         * execute function with (async) {@link util.utilTickCall}
         * 
         * @deprecated change to {@linkcode module:BaseJS.utilTack|Crisp.utilTack( opt, success, complete )}
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

            if ( opt.async ) {
                async = true;
                delete opt.async;
            }

            if ( async ) {
                g.Crisp.nextTick( utilTickCall, callback, self, opt );
                return self;
            }
            else {
                utilTickCall( callback, self, opt );
            }

            return self;
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
         * get or check ths small type name of objects
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
         * // GET the small type name of JavaScript objects
         * Crisp.type.call( '' );          // 'String'
         * Crisp.type.call( 0 );           // 'Number'
         * Crisp.type.call( true );        // 'Boolean'
         * Crisp.type.call( new Date() );  // 'Date'
         * Crisp.type.call( {} );          // 'Object'
         * Crisp.type.call( [] );          // 'Array'
         * Crisp.type.call( /a/g );        // 'RegExp'
         * 
         * Crisp.type.call( null );        // 'Undefined'
         * Crisp.type.call( undefined );   // 'Undefined'
         * 
         * // CHECK the small type name of JavaScript objects
         * Crisp.type.call( '',         'String' );     // true
         * Crisp.type.call( 0,          'Number' );     // true
         * Crisp.type.call( true,       'Boolean' );    // true
         * Crisp.type.call( new Date(), 'Date' );       // true
         * Crisp.type.call( {},         'Object' );     // true
         * Crisp.type.call( [],         'Array' );      // true
         * Crisp.type.call( /a/g,       'RegExp' );     // true
         * 
         * Crisp.type.call( null,       'Undefined' );  // true
         * Crisp.type.call( undefined,  'Undefined' );  // true
         * 
         * // CHECH group of object type
         * Crisp.type.call(         '', 'field' );  // true
         * Crisp.type.call(          0, 'field' );  // true
         * Crisp.type.call(       true, 'field' );  // true
         * Crisp.type.call( new Date(), 'field' );  // true
         * Crisp.type.call(       /a/g, 'field' );  // true
         */
        type: function( type ) {
            if ( type ) {
                return isType( this, type );
            }
            else {
                return toType( this );
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
         * @see external:String#xMath
         * 
         * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS_test.html#tomath|use math}
         *
         * @example
         * Crisp.math.call( -1, 'abs'); // 1
         */
        math: function( name ) {
            var args = [this];

            arguments.xEach({ start: 1 }, function (item) {
                args.push(item);
            });

            return Math[ name ].apply( Math, args );
        }

    };

})(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof global !== 'undefined' ? global : window);
