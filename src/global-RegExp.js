
/**
 * @external RegExp
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 */

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
