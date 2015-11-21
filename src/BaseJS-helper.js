
/**
 * @namespace util
 */

(function($$) {

    var Break = $$.ns('util.control.Break');

    /**
     * nextTick
     * @param  {external.Function}
     * @param  {*}
     */
    var nextTick = (function() {
        if (typeof process === 'object' && typeof process.nextTick === 'function') {
            return process.nextTick;
        }
        else if (typeof setImmediate === 'function') {
            return setImmediate;
        }
        else {
            return function(fn) {
                return setTimeout.apply(null, [fn, 0].concat( Array.prototype.slice.call(arguments).slice(1) ));
            };
        }
    })();

    $$.nextTick = nextTick;


    function nextTickTackDefault( methodCallback, self, opt, success, complete ) {
        methodCallback.call( self, opt, success );
        complete.call( self, opt );
    }

    /**
     * [utilTack description]
     * @param  {external.Function} methodCallback [description]
     * @param  {external.Array}    methodSchema   [description]
     * @return {external.Function}                [description]
     */
    function utilTack( methodCallback, methodSchema ) {
        function tackDefault( opt, success, complete ) {
            var async;

            if ( opt.async ) {
                async = opt.async;
                delete opt.async;
            }

            // reverse compatibility
            success = success || opt.success || Break;
            complete = complete || opt.complete || Break;

            if ( async ) {
                nextTick( nextTickTackDefault, methodCallback, this, opt, success, complete );
            }
            else {
                methodCallback.call( this, opt, success );
                complete.call( this, opt );
            }
            
            return this;
        }

        return Object.defineProperty( tackDefault, 'tick', { value: methodSchema || true });
    }

    $$.utilTack = utilTack;


    /**
     * [callSchema description]
     * @param  {external.Array} schema [description]
     * @param  {external.Arguments} args   [description]
     * @return {external.Object}        [description]
     */
    function callSchema( schema, args ) {
        var key;
        var opt = {};

        if (Crisp.type.call(args[0], 'Object')) {
            return args[0];
        }

        schema = schema || [];

        for (var i=0, m=args.length; i<m; i+=1 ) {
            key = schema[i] || i;
            opt[key] = args[i];
        }

        return opt;
    }

    $$.callSchema = callSchema;


})(Crisp);
