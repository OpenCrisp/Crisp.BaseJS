
var Break = Crisp.ns('util.control.Break');
// var End = Crisp.ns('util.control.End');

    
// exports['no test'] = function (assert) {
//     var done = assert.done || assert.async();
//     assert.ok(1);
//     done();   
// };


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

exports['xEach Array limit=1 filter'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(1);

    var t = [];
    var a = ['A0','B0','B1'];
    a.xEach(
        { limit: 1 },
        function success( item ) {
            if ( !/^B/.test(item) ) {
                throw new Break();
            }
            t.push(item);
        },
        function complete() {
            assert.deepEqual( t, ['B0'] );
        }
    );
    
    done();
};

exports['xEach Array limit=1 filter no result'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(1);

    var c = 0;
    var a = ['A','B','C'];
    a.xEach(
        { limit: 1 },
        function success() {
            c+=1;
            throw new Break();
        },
        function complete() {
            assert.equal(c, 3);
        }
    );
    
    done();
};

exports['xEach Array limit=3 filter no  result'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(1);

    var c = 0;
    var a = ['A','B','C','D'];
    a.xEach(
        { limit: 3 },
        function success() {
            c+=1;
            throw new Break();
        },
        function complete() {
            assert.equal(c, 4);
        }
    );
    
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

exports['xEach Array start=1, limit=1 Break empty'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(1);

    var t = [];
    var a = ['A','B'];

    a.xEach({
        start: 1,
        limit: 1,
        success: function(item) {
            t.push(item);
        },
        complete: function() {
            assert.deepEqual( t, ['B'] );
        }
    });
    
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

exports['xEach Array limit=1 reverse=true'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(3);

    var a = ['A','B'];
    a.xEach({
        reverse: true,
        limit: 1,
        success: function( item ) {
            count += 1;
            assert.equal( item, 'B' );
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

exports['xEach Array limit=1 reverse=true Break first'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(3);

    var c = 0;
    var a = ['A','B','C'];

    a.xEach(
        {
            reverse: true,
            limit: 1
        },
        function success( item ) {
            c += 1;

            if ( c===1 ) {
                throw new Break();
            }

            assert.equal( item, 'B' );
        },
        function complete() {
            assert.equal( c, 2 );
            c += 1;
        }
    );
    
    assert.equal( c, 3 );
    c += 1;

    done();
};

// exports['xEach Array limit=1 reverse=true Break empty'] = function(assert) {
//     var done = assert.done || assert.async();
//     var count = 0;
//     assert.expect(2);

//     var a = ['A','B','C'];
//     a.xEach({
//         reverse: true,
//         limit: 1,
//         success: function() {
//             count += 1;

//             if ( count===1 ) {
//                 throw new Break();
//             }

//             throw new Error();
//         },
//         complete: function() {
//             assert.equal( count, 2 );
//             count += 1;
//         }
//     });
    
//     assert.equal( count, 3 );
//     count += 1;

//     done();
// };

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

