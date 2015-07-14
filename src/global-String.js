(function($$) {

	// var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');



	/**
	 * @external String
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
	 */
	
	/**
	 * @function external:String.prototype.toMath
	 * @param {String} name name of Math Function
	 * @implements {util.Base#toMath}
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
	 * @function external:String.prototype.xTo
	 * @param {String} type data format
	 * @implements {util.Base#to}
	 *
	 * @example
	 * 'a'.xTo(); // '"a"'
	 * 'b"c'.xTo(); // '"b\\"c"'
	 */
	Object.defineProperty( String.prototype, 'xTo', {
		value: $$.to
	});

	/**
	 * @public
	 * @function external:String.prototype.xParse
	 * @param {String} type data format
	 * @implements {util.Base#parse}
	 *
	 * @example
	 * // Array
	 * '["a"]'.xParse(); // ['a']
	 * 
	 * // Boolean
	 * 'true'.xParse(); // true
	 * 
	 * // Date
	 * '"2015-07-13T00:00:00.000Z"'.xParse(); // Date()
	 * 
	 * // Number
	 * '1.5'.xParse(); // 1.5
	 * 
	 * // Object
	 * '{"a":"A"}'.xParse(); // { a: 'A' }
	 * 
	 * // String
	 * '"a"'.xParse(); // 'a'
	 * '"b\\"c"'.xParse(); // 'b"c'
	 */
	Object.defineProperty( String.prototype, 'xParse', {
		value: $$.parse
	});


})(Crisp);