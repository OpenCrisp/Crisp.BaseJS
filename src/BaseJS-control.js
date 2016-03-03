
/**
 * @namespace util.control
 */

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
     * // trigger an End throw
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


    /**
     * only a Noop controller without aktivities
     * @function util.control.Noop
     *
     * @example
     * var Noop = Crisp.ns('util.control.Noop');
     *
     * ['A','B'].xEach({}, Noop, function complete() {
     *     // do wath you wan at the end of each
     * });
     */
    $$.ns('util.control.Noop', function() {});

})(Crisp);
