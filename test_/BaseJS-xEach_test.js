
// ## Array
// [use Array.xEach](http://opencrisp.wca.at/docs/external-Array.html#xEach)
exports['xEach Array'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = ['A'];
    a.xEach({
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'A' );
            assert.equal( index, 0 );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

// ### Array option.start
exports['xEach Array start=1'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = ['A','B'];
    a.xEach({
        start: 1,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'B' );
            assert.equal( index, 1 );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Array start=-1'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = ['A','B','C'];
    a.xEach({
        start: -1,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'C' );
            assert.equal( index, 2 );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

// ### Array option.limit
exports['xEach Array limit=1'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = ['A','B'];
    a.xEach({
        limit: 1,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'A' );
            assert.equal( index, 0 );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Array start=1, limit=1'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = ['A','B','C'];
    a.xEach({
        start: 1,
        limit: 1,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'B' );
            assert.equal( index, 1 );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Array start=2, limit=10'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = ['A','B','C'];
    a.xEach({
        start: 2,
        limit: 10,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'C' );
            assert.equal( index, 2 );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Array start=-10, limit=10'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = ['A'];
    a.xEach({
        start: -10,
        limit: 10,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'A' );
            assert.equal( index, 0 );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Array out of range'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(2);

    var a = ['A'];
    a.xEach({
        start: 10,
        limit: 10,
        success: function() {
            throw new Error();
        },
        complete: function() {
            assert.equal( count, 0 );
            count += 1;
        }
    });
    
    assert.equal( count, 1 );
    count += 1;

    done();
};

exports['xEach async Array out of range'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(2);

    var a = ['A'];
    a.xEach({
        start: 10,
        limit: 10,
        async: true,
        success: function() {
            throw new Error();
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
            done();
        }
    });
    
    assert.equal( count, 0 );
    count += 1;
};


// ## Object
// [use Object.xEach](http://opencrisp.wca.at/docs/external-Object.html#xEach)
exports['xEach Object'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = { a: 'A' };
    a.xEach({
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'A' );
            assert.equal( index, 'a' );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

// ### Object option.start
exports['xEach Object start=1'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = { a: 'A', b: 'B' };
    a.xEach({
        start: 1,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'B' );
            assert.equal( index, 'b' );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Object start=-1'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = { a: 'A', b: 'B', c: 'C' };
    a.xEach({
        start: -1,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'C' );
            assert.equal( index, 'c' );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

// ### Object option.limit
exports['xEach Object limit=1'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = { a: 'A', b: 'B', c: 'C' };
    a.xEach({
        limit: 1,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'A' );
            assert.equal( index, 'a' );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Object start=1 limit=1'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = { a: 'A', b: 'B', c: 'C' };
    a.xEach({
        start: 1,
        limit: 1,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'B' );
            assert.equal( index, 'b' );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Object start=2 limit=10'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = { a: 'A', b: 'B', c: 'C' };
    a.xEach({
        start: 2,
        limit: 10,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'C' );
            assert.equal( index, 'c' );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Object start=-10 limit=10'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(5);

    var a = { a: 'A' };
    a.xEach({
        start: -10,
        limit: 10,
        success: function( item, index ) {
            assert.equal( count, 0 );
            count += 1;

            assert.equal( item, 'A' );
            assert.equal( index, 'a' );
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
        }
    });
    
    assert.equal( count, 2 );
    count += 1;

    done();
};

exports['xEach Object out of range'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(2);

    var a = { a: 'A' };
    a.xEach({
        start: 10,
        limit: 10,
        success: function() {
            throw new Error();
        },
        complete: function() {
            assert.equal( count, 0 );
            count += 1;
        }
    });
    
    assert.equal( count, 1 );
    count += 1;

    done();
};

exports['xEach async Object out of range'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(2);

    var a = { a: 'A' };
    a.xEach({
        start: 10,
        limit: 10,
        async: true,
        success: function() {
            throw new Error();
        },
        complete: function() {
            assert.equal( count, 1 );
            count += 1;
            done();
        }
    });
    
    assert.equal( count, 0 );
    count += 1;
};
