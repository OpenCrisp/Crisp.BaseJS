/**
 * @external Object
 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
 */

(function($$) {

    var Break = $$.ns('util.control.Break');
    var End = $$.ns('util.control.End');
    // var utilTack = $$.utilTack;


    /**
     * @function external:Object.prototype.toString
     * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
     */


    /**
     * call of each Object key-items with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * and execute <code>option.success</code> and/or <code>option.complete</code> with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     *
     * @function external:Object.prototype.xEach
     *
     * @param {external:Object}         option
     * @param {util.utilTickCallback}   option.success     callback function for execute each item with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {AnyItem}                 [option.self]      use Object for .call() the <code>option.success</code> an <code>option.complete</code> function
     * @param {util.utilTickCallback}   [option.complete]  callback function for exeute on the end of xEach with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {external:Boolean}        [option.async]     enable asynchronus for call of each Object key-items with {@linkcode module:BaseJS.utilTick|(async) Crisp.utilTick}
     * @param {external:Number}         [option.start=0]        start index of each
     * @param {external:Number}         [option.limit=length]   limit items of each
     *
     * @this external:Object
     * @return {external:Object}
     *
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#object|use Object.xEach}
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#object-option-start|use Object.xEach( start )}
     * @tutorial {@link http://opencrisp.wca.at/tutorials/BaseJS-xEach_test.html#object-option-limit|use Object.xEach( limit )}
     *
     * @example
     * {a:'A',b:'B'}.xEach({
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
     * // success: a A
     * // success: b B
     * // complete
     * // end
     *
     * @example <caption>async</caption>
     * {a:'A',b:'B'}.xEach({
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
     * // success: a A
     * // success: b B
     * // complete
     */
    function xEachObject(option, success, picker) {
        var index,
            keys = Object.keys(this),
            i = 0,
            reverse = 1,
            length = keys.length,
            start = option.start ? Number(option.start) : 0,
            limit = option.limit === undefined ? length : Number(option.limit),
            name;

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
                name = keys[index];
                success.call(option.self, this[name], name, picker);
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

    $$.xEachObject = xEachObject;

    Object.defineProperty(Object.prototype, 'xEach', {
        value: $$.utilTack(xEachObject)
    });


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
    Object.defineProperty(Object.prototype, 'xTo', {
        value: $$.to
    });


    /**
     * @function external:Object.prototype.xType
     * @implements {module:BaseJS.type}
     *
     * @param {external:String} [type] JavaScript type
     *
     * @this external:Object
     * @return {external:String|external:Boolean}
     *
     * @example
     * (false).xType();          // 'Object'
     * (true).xType('Object');  // 'true'
     */
    Object.defineProperty(Object.prototype, 'xType', {
        value: $$.type
    });


    /**
     * Object to HTTP URL Parameter
     * @return {external:String}
     */
    Object.defineProperty(Object.prototype, 'toURLParam', {
        value: function() {
            var ret = [];

            this.xEach({}, function(item, index) {
                var str = "";

                if ($$.type.call(item, 'Object')) {
                    str = item.xTo();
                } else if ($$.type.call(item, 'Array')) {
                    str = item.xTo();
                } else if ($$.type.call(item, 'Boolean')) {
                    str = item.xTo();
                } else {
                    str = item.toString();
                }

                str = index.concat("=", str);

                ret.push(str);
            });

            return ret.join("&");
        }
    });

})(Crisp);
