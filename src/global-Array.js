/**
 * @external Array
 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */

(function($$) {

    var Break = $$.ns('util.control.Break');
    var End = $$.ns('util.control.End');
    // var utilTack = $$.utilTack;


    /**
     * add one or more items/arrays for concat in Array.
     * empty Arrays and undefined items are ignored
     *
     * @function external:Array.prototype.xAdd
     *
     * @param {...AnyItem} item one or more of args
     *
     * @this module:EventJS
     * @return {module:EventJS}
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

        for (; i < m; i += 1) {
            a = arguments[i];

            if ($$.type.call(a, 'Array')) {
                xAddArray.apply(this, a);
            } else if (a !== undefined) {
                this.push(a);
            }
        }

        return this;
    }

    Object.defineProperty(Array.prototype, 'xAdd', {
        value: xAddArray
    });


    /**
     * call of each Array items with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * and execute <code>option.success</code> and/or <code>option.complete</code> with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     *
     * @function external:Array.prototype.xEach
     *
     * @param {external:Object}         option
     * @param {util.utilTickCallback}   option.success          callback function for execute each item with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {AnyItem}                 [option.self]           use Object for .call() the <code>option.success</code> an <code>option.complete</code> function
     * @param {util.utilTickCallback}   [option.complete]       callback function for exeute on the end of xEach with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {external:Boolean}        [option.async]          enable asynchronus for call of each Array items with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {external:Number}         [option.start=0]        start index of each
     * @param {external:Number}         [option.limit=length]   limit items of each
     *
     * @this external:Array
     * @return {external:Array}
     *
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#array|use Array.xEach}
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#array-option-start|use Array.xEach( start )}
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#array-option-limit|use Array.xEach( limit )}
     *
     * @example
     * ['A','B'].xEach({
     *   success: function( item, index ) {
     *     // return; go to the next item
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
     *     // return; go to the next item
     *     // throw new Break(); stop each of items
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
    function xEachArray(option, success, picker) {
        var index,

            i = 0,
            reverse = 1,
            length = this.length,
            start = option.start ? Number(option.start) : 0,
            limit = option.limit === undefined ? length : Number(option.limit);


        if (limit <= 0) {
            limit = length;
        }

        if (start < 0) {
            start = length + start;
        }

        if (start + limit > length) {
            limit -= start + limit - length;
        }

        if (start < 0) {
            start = 0;
            limit = length;
        }

        if (option.reverse) {
            reverse = -1;
            start -= length + reverse;
        }

        for (; i < limit; i += 1) {
            try {
                index = (i + start) * reverse;

                success.call(option.self, this[index], index, picker);
            } catch (e) {
                if (e instanceof Break) {
                    if (option.limit && (option.reverse || (index < length && limit < length))) {
                        limit += 1;
                    }
                } else if (e instanceof End || index < 0) {
                    return this;
                } else {
                    throw e;
                }
            }
        }

        return this;
    }

    $$.xEachArray = xEachArray;

    Object.defineProperty(Array.prototype, 'xEach', {
        value: $$.utilTack(xEachArray)
    });

})(Crisp);
