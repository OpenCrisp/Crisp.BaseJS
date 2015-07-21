
/**
 * @external Boolean
 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
 */

(function($$) {

    // var Break = $$.ns('util.control.break');
    // var End = $$.ns('util.control.end');

    
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
    Object.defineProperty( Boolean.prototype, 'xTo', {
        value: $$.to
    });

})(Crisp);
