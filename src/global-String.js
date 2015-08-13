
/**
 * @external String
 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 */

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
