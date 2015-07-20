
// ## Base
// [doc of Base](http://opencrisp.wca.at/docs/util.Base.html)






// ### Crisp
// [doc of Global Crisp](http://opencrisp.wca.at/docs/util.Base.html#crisp)
exports['Crisp'] = function(assert) {
	var done = assert.done || assert.async();
	
	assert.ok( Crisp );

	done();
};





// ### ns
// [doc of Base.ns](http://opencrisp.wca.at/docs/util.Base.html#ns)
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
// [doc of Base.utilTick](http://opencrisp.wca.at/docs/util.Base.html#utilTick)
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
// [doc of Base.toType](http://opencrisp.wca.at/docs/util.Base.html#toType)
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
// [doc of Base.isType](http://opencrisp.wca.at/docs/util.Base.html#isType)
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