(function($$) {

	// var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');



	/**
	 * @external Date
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
	 */
	
	/**
	 * @function external:Date.prototype.xTo
	 * @param {String} type data format
	 * @implements {module:Crisp/BaseJS.Base#to}
	 *
	 * @example
	 * new Date('2015-07-13').xTo(); // '"2015-07-13T00:00:00.000Z"'
	 */
	Object.defineProperty( Date.prototype, 'xTo', {
		value: $$.to
	});


})(Crisp);