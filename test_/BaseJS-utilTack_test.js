
exports['utilTack'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(4);

    var count = 0;
    var test = {};

    function fn( opt, success ) {
        success.call( this, 'a' );
    }
    
    test.fn = Crisp.utilTack( fn );

    test.fn(
        {},
        function success( doc ) {
            assert.strictEqual( doc, 'a' );
            assert.strictEqual( ++count, 1 );
        },
        function complete() {
            assert.strictEqual( ++count, 2 );
        }
    );

    assert.strictEqual( ++count, 3 );

    done();
};

exports['utilTack opt.async'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(4);

    var count = 0;
    var test = {};

    function fn( opt, success ) {
        success.call( this, 'a' );
    }
    
    test.fn = Crisp.utilTack( fn );

    test.fn(
        {
            async: true
        },
        function success( doc ) {
            assert.strictEqual( doc, 'a' );
            assert.strictEqual( ++count, 2 );
        },
        function complete() {
            assert.strictEqual( ++count, 3 );
            done();
        }
    );

    assert.strictEqual( ++count, 1 );
};

exports['utilTack schema'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(4);

    function Test() {}

    function fn( opt ) {
        // console.log( opt );
        assert.strictEqual( opt.path, 'a' );
        assert.deepEqual( Object.keys(opt), ["path"] );
    }
    
    Test.prototype.fn = Crisp.utilTack( fn, ["path"] );

    Test.prototype.ex = function() {
        var opt = Crisp.callSchema( this.fn.tick, arguments );
        this.fn.call( this, opt );
    };


    var test = new Test();

    test.fn({ path: 'a' });
    test.ex('a');

    done();
};
