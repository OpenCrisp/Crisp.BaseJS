
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







exports['utilTick sync'] = function(assert) {
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

	Crisp.utilTick( { a: 'A' }, test, { async: true, args: { c: 'C' } } );
	count += 1;
};









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

