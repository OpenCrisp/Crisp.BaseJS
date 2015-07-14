(function($$) {

	// var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');





	/**
	 * @external Number
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
	 */
	
	/**
	 * check given number is an integer
	 * @function external:Number.prototype.isInterger
	 */
	Number.isInteger = Number.isInteger || function(value) {
		return $$.isType( value, "Number" ) && isFinite(value) && Math.floor(value) === value;
	};


	/**
	 * @function external:Number.prototype.toMath
	 * @param {String} name name of Math Function
	 * @implements {module:Crisp/BaseJS.Base#toMath}
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
	 * @param {String} type data format
	 * @implements {module:Crisp/BaseJS.Base#to}
	 *
	 * @example
	 * (0).xTo(); // '0'
	 * (1.5).xTo(); // '1.5'
	 */
	Object.defineProperty( Number.prototype, 'xTo', {
		value: $$.to
	});





})(Crisp);