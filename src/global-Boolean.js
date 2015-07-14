(function($$) {

	// var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');




	/**
	 * @external Boolean
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
	 */
	
	/**
	 * @function external:Boolean.prototype.xTo
	 * @param {String} type data format
	 * @implements {module:Crisp/BaseJS.Base#to}
	 *
	 * @example
	 * (false).xTo(); // 'false'
	 * (true).xTo(); // 'true'
	 */
	Object.defineProperty( Boolean.prototype, 'xTo', {
		value: $$.to
	});



})(Crisp);