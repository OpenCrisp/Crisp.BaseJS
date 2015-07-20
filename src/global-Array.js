(function($$) {

	var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');




	/**
	 * @external Array
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
	 */
	
	/**
	 * add one or more items/arrays for concat in Array.
	 * empty Arrays and undefined items are ignored 
	 * 
	 * @function external:Array.prototype.xAdd
	 * @param {external:Object|external:Array} item one or more of items
	 * @return {this}
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
	 * sync/async each of Array items
	 * 
	 * @function external:Array.prototype.xEach
	 * @param {external:Object} opt
	 * @param {callback} opt.success Function to execute for each item
	 * @param {external:Object} [opt.self] use an Object for .call() the success an complete Function
	 * @param {callback} [opt.complete] Function are exeute on end of xEach
	 * @param {external:Boolean} [opt.async] enable asynchronus
	 * @return {this}
	 *
	 * @example
	 * ['A','B'].xEach({
	 *   success: function( item, index ) {
	 *     // return; got to the next item 
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
	function xEachArray( opt ) {
		var i = 0,
			m = this.length;

		try {
			
			for (; i<m; i+=1 ) {
				opt.success.call( opt.self, this[i], i );
			}

		} catch (e) { if ( e instanceof Break ) {} else { throw e; } }
		
		return this;
	}

	Object.defineProperty( Array.prototype, 'xEach', {
		value: function( opt ) {
			return $$.utilTick( this, xEachArray, opt, opt.async );
		}
	});


	/**
	 * @function external:Array.prototype.xTo
	 * @return {String}
	 * @implements {module:Crisp/BaseJS.Base#to}
	 *
	 * @example
	 * ['a'].xTo(); // '["a"]'
	 */
	Object.defineProperty( Array.prototype, 'xTo', {
		value: $$.to
	});


})(Crisp);