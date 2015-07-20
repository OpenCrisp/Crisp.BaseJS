(function($$) {

	var Break = $$.ns('util.control.break');
	// var End = $$.ns('util.control.end');





	/**
	 * @external Object
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
	 */
	

	/**
	 * @function external:Object.prototype.toString
	 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
	 */
	
	
	/**
	 * sync/async each of Object items
	 * 
	 * @function external:Object.prototype.xEach
	 * @param {external:Object} opt
	 * @param {callback} opt.success Function to execute for each item
	 * @param {external:Object} [opt.self] use an Object for .call() the success an complete Function
	 * @param {callback} [opt.complete] Function are exeute on end of xEach
	 * @param {external:Boolean} [opt.async] enable asynchronus
	 * @return {this}
	 * @public
	 *
	 * @example
	 * {a:'A',b:'B'}.xEach({
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
	 * // success: a A
	 * // success: b B
	 * // complete
	 * // end
	 *
	 * 
	 * @example
	 * // async
	 * {a:'A',b:'B'}.xEach({
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
	 * // success: a A
	 * // success: b B
	 * // complete
	 */
	function xEachObject( opt ) {
		var keys = Object.keys( this ),
			i = 0,
			m = keys.length,
			name;

		try {

			for (; i<m; i+=1 ) {
				name = keys[i];
				opt.success.call( opt.self, this[ name ], name );
			}

		} catch (e) { if ( e instanceof Break ) {} else { throw e; } }
	}

	Object.defineProperty( Object.prototype, 'xEach', {
		value: function( opt ) {
			return $$.utilTick( this, xEachObject, opt, opt.async );
		}
	});


	/**
	 * @function
	 * @name xTo
	 * @return {String}
	 * @implements {module:Crisp/BaseJS.Base#to}
	 * @memberOf Object.prototype
	 *
	 * @example
	 * { a: 'A' }.xTo(); // '{"a":"A"}'
	 */
	Object.defineProperty( Object.prototype, 'xTo', {
		value: $$.to
	});




	Object.defineProperty( Object.prototype, 'toURLParam', {
		value: function() {
			var ret = [];

			this.xEach({
				success: function(item, index) {
					var str = "";

					if ( $$.isType( item, 'Object' ) ) {
						str = item.xTo();
					}
					else if ( $$.isType( item, 'Array' ) ) {
						str = item.xTo();
					}
					else if ( $$.isType( item, 'Boolean' ) ) {
						str = item.xTo();
					}
					else {
						str = item.toString();
					}

					str = index.concat("=", str);

					ret.push(str);
				}
			});

			return ret.join("&");
		}
	});




})(Crisp);