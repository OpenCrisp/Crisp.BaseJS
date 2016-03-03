
// ## BaseJS
// [doc of Base](http://opencrisp.wca.at/docs/module-BaseJS.html)


// ### Crisp
// [doc of Global Crisp](http://opencrisp.wca.at/docs/module-BaseJS.html#crisp)
exports['Crisp'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.ok( Crisp );

    done();
};


// ### ns
// [doc of Base.ns](http://opencrisp.wca.at/docs/module-BaseJS.html#ns)
exports['ns of undefined'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.deepEqual( Crisp.ns('a'), {} );

    done();
};

exports['ns throw redefined'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.throws(function(){
        Crisp.ns('a', 'A');
    });

    done();
};

exports['ns set root string'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.equal( Crisp.ns('b', 'B'), 'B' );
    assert.equal( Crisp.ns('b'), 'B' );

    done();
};

exports['ns set deep string'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.equal( Crisp.ns('c.d', 'D'), 'D' );
    assert.equal( Crisp.ns('c.d'), 'D' );

    done();
};


// ### utilTick
// [doc of Base.utilTick](http://opencrisp.wca.at/docs/module-BaseJS.html#utilTick)
exports['utilTick'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(3);

    var thisArg = {};

    function test( b ) {
        count += 1;
        assert.equal( this, thisArg );
        assert.equal( b, 'B' );
    }

    Crisp.utilTick( thisArg, test, { args: 'B' } );
    assert.equal( count, 1 );

    done();
};

exports['utilTick args=false'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(3);

    var thisArg = {};

    function test( b ) {
        count += 1;
        assert.strictEqual( this, thisArg );
        assert.strictEqual( b, false );
    }

    Crisp.utilTick( thisArg, test, { args: false } );
    assert.equal( count, 1 );

    done();
};

exports['utilTick private thisArg'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(3);

    function test( b ) {
        count += 1;
        assert.equal( this.a, 'A' );
        assert.equal( b, 'B' );
    }

    Crisp.utilTick( { a: 'A' }, test, { args: 'B' } );
    assert.equal( count, 1 );

    done();
};

exports['utilTick async'] = function(assert) {
    var done = assert.done || assert.async();
    var count = 0;
    assert.expect(3);

    function test( b ) {
        assert.equal( count, 1 );
        assert.equal( this.a, 'A' );
        assert.equal( b.c, 'C' );
        
        done();
    }

    Crisp.utilTick( { a: 'A' }, test, { args: { c: 'C' } }, true );
    count += 1;
};


// ### type
// [doc of Base.type](http://opencrisp.wca.at/docs/module-BaseJS.html#type)
exports['type'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.ok( Crisp.type.call( '',   'String' ) );
    assert.ok( Crisp.type.call( 0,    'Number' ) );
    assert.ok( Crisp.type.call( {},   'Object' ) );
    assert.ok( Crisp.type.call( [],   'Array' ) );
    assert.ok( Crisp.type.call( null, 'Undefined' ) );

    done();
};

exports['type var'] = function(assert) {
    var done = assert.done || assert.async();
    
    var a;
    assert.ok( Crisp.type.call( a, 'Undefined' ) );

    done();
};

exports['type Object'] = function(assert) {
    var done = assert.done || assert.async();
    
    var b = {};
    assert.ok( Crisp.type.call( b, 'Object' ) );
    assert.ok( Crisp.type.call( b.a, 'Undefined' ) );

    done();
};


// ### type
// [doc of Base.type](http://opencrisp.wca.at/docs/module-BaseJS.html#type)
exports['type'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.ok( Crisp.type.call( '',   'String' ) );
    assert.ok( Crisp.type.call( 0,    'Number' ) );
    assert.ok( Crisp.type.call( {},   'Object' ) );
    assert.ok( Crisp.type.call( null, 'Undefined' ) );
    assert.ok( Crisp.type.call( [],   'Array' ) );

    done();
};

exports['type var'] = function(assert) {
    var done = assert.done || assert.async();
    
    var a;
    assert.ok( Crisp.type.call( a, 'Undefined' ) );

    done();
};

exports['type Object'] = function(assert) {
    var done = assert.done || assert.async();
    
    var b = {};
    assert.ok( Crisp.type.call( b, 'Object' ) );
    assert.ok( Crisp.type.call( b.a, 'Undefined' ) );

    done();
};

exports['type field'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.ok( !Crisp.type.call( {}, 'field' ) );
    assert.ok( Crisp.type.call( '', 'field' ) );
    assert.ok( Crisp.type.call( 0, 'field' ) );

    done();
};

exports['type'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.strictEqual( Crisp.type.call( '' ),         'String' );
    assert.strictEqual( Crisp.type.call( 0 ),          'Number' );
    assert.strictEqual( Crisp.type.call( true ),       'Boolean' );
    assert.strictEqual( Crisp.type.call( new Date() ), 'Date' );
    assert.strictEqual( Crisp.type.call( {} ),         'Object' );
    assert.strictEqual( Crisp.type.call( [] ),         'Array' );
    assert.strictEqual( Crisp.type.call( /a/g ),       'RegExp' );

    assert.strictEqual( Crisp.type.call( null ),       'Undefined' );
    assert.strictEqual( Crisp.type.call( undefined ),  'Undefined' );

    assert.ok( Crisp.type.call( '',         'String' ) );     // true
    assert.ok( Crisp.type.call( 0,          'Number' ) );     // true
    assert.ok( Crisp.type.call( true,       'Boolean' ) );    // true
    assert.ok( Crisp.type.call( new Date(), 'Date' ) );       // true
    assert.ok( Crisp.type.call( {},         'Object' ) );     // true
    assert.ok( Crisp.type.call( [],         'Array' ) );      // true
    assert.ok( Crisp.type.call( /a/g,       'RegExp' ) );     // true

    assert.ok( Crisp.type.call( null,       'Undefined' ) );  // true
    assert.ok( Crisp.type.call( undefined,  'Undefined' ) );  // true

    assert.ok( Crisp.type.call(         '', 'field' ) );
    assert.ok( Crisp.type.call(          0, 'field' ) );
    assert.ok( Crisp.type.call(       true, 'field' ) );
    assert.ok( Crisp.type.call( new Date(), 'field' ) );
    assert.ok( Crisp.type.call(       /a/g, 'field' ) );

    done();
};


// ### math
exports['math'] = function(assert) {
    var done = assert.done || assert.async();
    
    var b = Number(-1);
    assert.strictEqual( Crisp.math.call( b, 'abs' ), 1 );

    done();
};

// exports['math round10'] = function(assert) {
//     var done = assert.done || assert.async();
    
//     var b = Number(55.55);
//     assert.strictEqual( Crisp.math.call( b, 'round10', -1 ), 55.6 );

//     done();
// };
