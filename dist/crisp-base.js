/*! OpenCrisp BaseJS - v0.2.13 - 2015-10-30
* https://github.com/OpenCrisp/Crisp.BaseJS
* Copyright (c) 2015 Fabian Schmid; Licensed MIT */
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

    function toType( object ) {
        var type = toTypeString.call( object ).replace( regTypeTrim, "$1" );

        if ( ['global', 'Null', 'DOMWindow'].indexOf( type ) !== -1 ) {
            type = 'Undefined';
        }

        return type;
    }

    function isType( object, type ) {
        if ( type === 'field' ) {
            return isType( object, 'String' ) || isType( object, 'Number' ) || isType( object, 'Boolean' ) || isType( object, 'Date' ) || isType( object, 'RegExp' );
        }
        else {
            return toType( object ) === type;
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
         * @deprecated use {module:BaseJS.type}
         * @function module:BaseJS.toType
         * @param       {AnyItem} object
         */
        toType: toType,


        /**
         * @deprecated use {module:BaseJS.type}
         * @function module:BaseJS.isType
         * @param       {AnyItem}         object
         * @param       {external:String} type
         */
        isType: isType,


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
         * @deprecated
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
            console.warn('Crisp.toMath is not longer supportet! Use Crisp.math');
            return Math[ name ].call( Math, this );
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
            return Math[ name ].call( Math, this );
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
            console.warn('Crisp.toJson is not longer supportet! Use Crisp.to');
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
            console.warn('Crisp.parseJson is not longer supportet! Use Crisp.parse');
            return JSON.parse( this.toString() );
        }

    };

})(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof global !== 'undefined' ? global : window);

(function($$) {

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
     */
    $$.ns('util.control.Break', function() {});
    

    /**
     * only a End controller without aktivities
     * @function util.control.End
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
     */
    $$.ns('util.control.End', function() {});

})(Crisp);

(function($$) {

    var Break = $$.ns('util.control.Break');
    var End = $$.ns('util.control.End');

    
    /**
     * add one or more items/arrays for concat in Array.
     * empty Arrays and undefined items are ignored 
     * 
     * @function external:Array.prototype.xAdd
     * 
     * @param {...AnyItem} item one or more of args
     * 
     * @this module:EventJS
     * @return {module:EventJS}
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
     * call of each Array items with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * and execute <code>option.success</code> and/or <code>option.complete</code> with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * 
     * @function external:Array.prototype.xEach
     * 
     * @param {external:Object}         option
     * @param {util.utilTickCallback}   option.success          callback function for execute each item with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {AnyItem}                 [option.self]           use Object for .call() the <code>option.success</code> an <code>option.complete</code> function
     * @param {util.utilTickCallback}   [option.complete]       callback function for exeute on the end of xEach with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {external:Boolean}        [option.async]          enable asynchronus for call of each Array items with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {external:Number}         [option.start=0]        start index of each 
     * @param {external:Number}         [option.limit=length]   limit items of each
     * 
     * @this external:Array
     * @return {external:Array}
     *
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#array|use Array.xEach}
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#array-option-start|use Array.xEach( start )}
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#array-option-limit|use Array.xEach( limit )}
     *
     * @example
     * ['A','B'].xEach({
     *   success: function( item, index ) {
     *     // return; go to the next item 
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
     *     // return; go to the next item 
     *     // throw new Break(); stop each of items
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
    function xEachArray( option ) {
        var i = 0,
            length = this.length,
            start = option.start ? Number( option.start ) : 0,
            limit = option.limit === undefined ? length : Number( option.limit );
        
        if ( limit <= 0 ) {
            limit = length;
        }

        if ( start < 0 ) {
            start = length + start;
        }

        if ( start + limit > length ) {
            limit -= start + limit - length;
        }

        if ( start < 0 ) {
            start = 0;
            limit = length;
        }

        for (; i<limit; i+=1 ) {
            try {
               option.success.call( option.self, this[ i + start ], i + start );
            } catch (e) {
                if ( e instanceof Break ) {
                    i -= 1;
                    start -= 1;
                }
                else if ( e instanceof End ) {
                    return this;
                }
                else {
                    throw e;
                }
            }
        }
        
        return this;
    }

    Object.defineProperty( Array.prototype, 'xEach', {
        value: function( option ) {
            return $$.utilTick( this, xEachArray, option, option.async );
        }
    });


    /**
     * @function external:Array.prototype.xTo
     * @implements {module:BaseJS.to}
     * 
     * @param {external:String} [type="json"]
     * 
     * @this external:Array
     * @return {external:String}
     *
     * @example
     * ['a'].xTo(); // '["a"]'
     */
    // Object.defineProperty( Array.prototype, 'xTo', {
    //     value: $$.to
    // });

})(Crisp);

// (function($$) {

    // var Break = $$.ns('util.control.Break');
    // var End = $$.ns('util.control.End');

    
    /**
     * @function external:Boolean.prototype.xTo
     * @implements {module:BaseJS.to}
     * 
     * @param {external:String} [type="json"] data format
     *
     * @this external:Boolean
     * @return {external:String}
     *
     * @example
     * (false).xTo(); // 'false'
     * (true).xTo(); // 'true'
     */
    // Object.defineProperty( Boolean.prototype, 'xTo', {
    //     value: $$.to
    // });

// })(Crisp);

// (function($$) {

    // var Break = $$.ns('util.control.Break');
    // var End = $$.ns('util.control.End');

    
    /**
     * @function external:Date.prototype.xTo
     * @implements {module:BaseJS.to}
     * 
     * @param {external:String} [type="json"] data format
     *
     * @this external:Date
     * @return {external:String}
     *
     * @example
     * new Date('2015-07-13').xTo(); // '"2015-07-13T00:00:00.000Z"'
     */
    // Object.defineProperty( Date.prototype, 'xTo', {
    //     value: $$.to
    // });

// })(Crisp);

(function($$) {

    // var Break = $$.ns('util.control.Break');
    // var End = $$.ns('util.control.End');

    
    /**
     * check given number is an integer
     * @function external:Number.prototype.isInterger
     *
     * @param {external:Number} value
     *
     * @return {external:Boolean}
     *
     * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
     *
     * @example
     * Number.isInteger(1); // true
     * Number.isInteger(0.5); // false
     */
    Number.isInteger = Number.isInteger || function(value) {
        return $$.isType( value, "Number" ) && isFinite(value) && Math.floor(value) === value;
    };


    /**
     * @deprecated use .xMath()
     * @function external:Number.prototype.toMath
     * @implements {module:BaseJS.toMath}
     * 
     * @param {external:String} name name of Math Function
     *
     * @this external:Number
     * @return {external:Math} return Math[name].apply(this, thisArg)
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
     * @function external:Number.prototype.xMath
     * @implements {module:BaseJS.math}
     * 
     * @param {external:String} name name of Math Function
     *
     * @this external:Number
     * @return {external:Math} return Math[name].apply(this, thisArg)
     *
     * @example
     * (1).xMath('abs'); // 1
     * (-1).xMath('abs'); // 1
     * (-0.1).xMath('abs'); // 0.1
     */
    Object.defineProperty( Number.prototype, 'xMath', {
        value: $$.math
    });


    /**
     * @function external:Number.prototype.xTo
     * @implements {module:BaseJS.to}
     * 
     * @param {external:String} [type="json"] data format
     *
     * @this external:Number
     * @return {external:String}
     *
     * @example
     * (0).xTo(); // '0'
     * (1.5).xTo(); // '1.5'
     */
    // Object.defineProperty( Number.prototype, 'xTo', {
    //     value: $$.to
    // });

})(Crisp);

(function($$) {

    var Break = $$.ns('util.control.Break');
    var End = $$.ns('util.control.End');


    /**
     * @function external:Object.prototype.toString
     * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
     */
    
    
    /**
     * call of each Object key-items with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * and execute <code>option.success</code> and/or <code>option.complete</code> with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * 
     * @function external:Object.prototype.xEach
     * 
     * @param {external:Object}         option
     * @param {util.utilTickCallback}   option.success     callback function for execute each item with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {AnyItem}                 [option.self]      use Object for .call() the <code>option.success</code> an <code>option.complete</code> function
     * @param {util.utilTickCallback}   [option.complete]  callback function for exeute on the end of xEach with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {external:Boolean}        [option.async]     enable asynchronus for call of each Object key-items with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {external:Number}         [option.start=0]        start index of each
     * @param {external:Number}         [option.limit=length]   limit items of each
     * 
     * @this external:Object
     * @return {external:Object}
     *
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#object|use Object.xEach}
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#object-option-start|use Object.xEach( start )}
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#object-option-limit|use Object.xEach( limit )}
     *
     * @example
     * {a:'A',b:'B'}.xEach({
     *   success: function( item, index ) {
     *     // return; go to the next item 
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
     * @example <caption>async</caption>
     * {a:'A',b:'B'}.xEach({
     *   async: true,
     *   success: function( item, index ) {
     *     // return; go to the next item 
     *     // throw new Break(); stop each of items
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
    function xEachObject( option ) {
        var keys = Object.keys( this ),
            i = 0,
            length = keys.length,
            start = option.start ? Number( option.start ) : 0,
            limit = option.limit === undefined ? length : Number( option.limit ),
            name;
        
        if ( limit <= 0 ) {
            limit = length;
        }

        if ( start < 0 ) {
            start = length + start;
        }

        if ( start + limit > length ) {
            limit -= start + limit - length;
        }

        if ( start < 0 ) {
            start = 0;
            limit = length;
        }

        for (; i<limit; i+=1 ) {
            try {
                name = keys[ i + start ];
                option.success.call( option.self, this[ name ], name );
            } catch (e) {
                if ( e instanceof Break ) {
                    i -= 1;
                    start -= 1;
                }
                else if ( e instanceof End ) {
                    return this;
                }
                else {
                    throw e;
                }
            }
        }
        
        return this;
    }

    Object.defineProperty( Object.prototype, 'xEach', {
        value: function( option ) {
            return $$.utilTick( this, xEachObject, option, option.async );
        }
    });


    /**
     * @function external:Object.prototype.xTo
     * @implements {module:BaseJS.to}
     * 
     * @param {external:String} [type="json"] data format
     *
     * @this external:Object
     * @return {external:String}
     *
     * @example
     * { a: 'A' }.xTo(); // '{"a":"A"}'
     */
    Object.defineProperty( Object.prototype, 'xTo', {
        value: $$.to
    });


    /**
     * @function external:Object.prototype.xType
     * @implements {module:BaseJS.type}
     * 
     * @param {external:String} [type] JavaScript type
     *
     * @this external:Object
     * @return {external:String|external:Boolean}
     *
     * @example
     * (false).xType();          // 'Object'
     * (true).xType('Object');  // 'true'
     */
    Object.defineProperty( Object.prototype, 'xType', {
        value: $$.type
    });


    /**
     * Object to HTTP URL Parameter
     * @return {external:String}
     */
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

(function($$) {

    // var Break = $$.ns('util.control.Break');
    // var End = $$.ns('util.control.End');


    /**
     * Regualar Expression for escape string
     * @private
     * @type {external:RegExp}
     * 
     * @memberOf external:RegExp
     *
     * @see  {@link http://regexper.com/#%2F%5B.*%2B%3F%5E%24%7B%7D()%7C%5B%5C%5D%5C%5C%5D%2Fg|Regexper.com}
     */
    var regExpEscape = /[.*+?^${}()|[\]\\]/g;


    /**
     * escape all regular expression characters in the given string for inlude in a regular espression
     * @function external:RegExp.escape
     * 
     * @param {external:String} str the string to escape
     * 
     * @return {external:String} escaped string
     *
     * @see  https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
     *
     * @example
     * RegExp.escape('a.b'); // 'a\\.b'
     */
    RegExp.escape = RegExp.escape || function( str ) {
        return str.replace( regExpEscape, "\\$&");
    };

    /**
     * @function external:Object.prototype.xTo
     * @implements {module:BaseJS.to}
     * 
     * @param {external:String} [type="json"] data format
     *
     * @this external:Object
     * @return {external:String}
     *
     * @example
     * { a: 'A' }.xTo(); // '{"a":"A"}'
     */
    Object.defineProperty( RegExp.prototype, 'xTo', {
        value: function() {
            return $$.to.call( this.toString() );
        }
    });

})(Crisp);

(function($$) {

    // var Break = $$.ns('util.control.Break');
    // var End = $$.ns('util.control.End');


    /**
     * @deprecated use .xMath()
     * @function external:String.prototype.toMath
     * @implements {module:BaseJS.toMath}
     * 
     * @param {external:String} name name of Math Function
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
     * @function external:String.prototype.xMath
     * @implements {module:BaseJS.math}
     * 
     * @param {external:String} name name of Math Function
     *
     * @example
     * '1'.xMath('abs'); // 1
     * '-1'.xMath('abs'); // 1
     * '-0.1'.xMath('abs'); // 0.1
     */
    Object.defineProperty( String.prototype, 'xMath', {
        value: $$.math
    });


    /**
     * @function external:String.prototype.xTo
     * @implements {module:BaseJS.to}
     * 
     * @param {external:String} [type="json"] data format
     *
     * @this external:String
     * @return {external:String}
     *
     * @example
     * 'a'.xTo(); // '"a"'
     * 'b"c'.xTo(); // '"b\\"c"'
     */
    // Object.defineProperty( String.prototype, 'xTo', {
    //     value: $$.to
    // });


    /**
     * @function external:String.prototype.xParse
     * @implements {module:BaseJS.parse}
     * 
     * @param {external:String} [type="json"] data format
     *
     * @this external:String
     * @return {AnyItem}
     *
     * @example
     * // String
     * '"a"'.xParse(); // 'a'
     * '"b\\"c"'.xParse(); // 'b"c'
     * 
     * // Number
     * '1.5'.xParse(); // 1.5
     * 
     * // Boolean
     * 'true'.xParse(); // true
     * 
     * // Date
     * '"2015-07-13T00:00:00.000Z"'.xParse(); // Date()
     * 
     * // Object
     * '{"a":"A"}'.xParse(); // { a: 'A' }
     * 
     * // Array
     * '["a"]'.xParse(); // ['a']
     */
    Object.defineProperty( String.prototype, 'xParse', {
        value: $$.parse
    });

})(Crisp);
