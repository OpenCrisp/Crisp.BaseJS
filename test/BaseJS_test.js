
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


// ### toType
// [doc of Base.toType](http://opencrisp.wca.at/docs/module-BaseJS.html#toType)
exports['toType'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.strictEqual( Crisp.toType( '' ), '[object String]' );
    assert.strictEqual( Crisp.toType( 0 ), '[object Number]' );
    assert.strictEqual( Crisp.toType( {} ), '[object Object]' );
    assert.strictEqual( Crisp.toType( [] ), '[object Array]' );

    done();
};

exports['toType var'] = function(assert) {
    var done = assert.done || assert.async();
    
    var a;
    assert.ok( ['[object Undefined]','[object DOMWindow]'].indexOf( Crisp.toType( a ) ) !== -1 );

    done();
};

exports['toType Object'] = function(assert) {
    var done = assert.done || assert.async();
    
    var b = {};
    assert.strictEqual( Crisp.toType( b ), '[object Object]' );
    assert.ok( ['[object Undefined]','[object DOMWindow]'].indexOf( Crisp.toType( b.a ) ) !== -1 );

    done();
};


// ### isType
// [doc of Base.isType](http://opencrisp.wca.at/docs/module-BaseJS.html#isType)
exports['isType'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.ok( Crisp.isType( '', 'String' ) );
    assert.ok( Crisp.isType( 0, 'Number' ) );
    assert.ok( Crisp.isType( {}, 'Object' ) );
    assert.ok( Crisp.isType( [], 'Array' ) );

    done();
};

exports['isType var'] = function(assert) {
    var done = assert.done || assert.async();
    
    var a;
    assert.ok( Crisp.isType( a, 'Undefined' ) );

    done();
};

exports['isType Object'] = function(assert) {
    var done = assert.done || assert.async();
    
    var b = {};
    assert.ok( Crisp.isType( b, 'Object' ) );
    assert.ok( Crisp.isType( b.a, 'Undefined' ) );

    done();
};

exports['isType field'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.ok( !Crisp.isType( {}, 'field' ) );
    assert.ok( Crisp.isType( '', 'field' ) );
    assert.ok( Crisp.isType( 0, 'field' ) );

    done();
};

exports['type'] = function(assert) {
    var done = assert.done || assert.async();
    
    assert.strictEqual( Crisp.type.call( {} ), 'Object' );
    assert.strictEqual( Crisp.type.call( '' ), 'String' );
    assert.strictEqual( Crisp.type.call( 0 ), 'Number' );

    assert.ok( Crisp.type.call( {}, 'Object' ) );
    assert.ok( Crisp.type.call( '', 'String' ) );
    assert.ok( Crisp.type.call( 0, 'Number' ) );

    done();
};


// ### toMath
exports['toMath'] = function(assert) {
    var done = assert.done || assert.async();
    
    var b = Number(-1);
    assert.strictEqual( Crisp.toMath.call( b, 'abs' ), 1 );

    done();
};
