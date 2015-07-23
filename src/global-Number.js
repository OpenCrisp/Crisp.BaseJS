
/**
 * @external Number
 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
 */

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
    Object.defineProperty( Number.prototype, 'xTo', {
        value: $$.to
    });

})(Crisp);
