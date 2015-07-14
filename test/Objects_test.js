
exports['xTo Boolean'] = function(assert) {
	var done = assert.done || assert.async();

	assert.equal( (false).xTo(), 'false' );
	assert.equal( (true).xTo(), 'true' );

	done();
};

exports['xTo Date'] = function(assert) {
	var done = assert.done || assert.async();

	assert.equal( new Date('2015-07-13').xTo(), '"2015-07-13T00:00:00.000Z"' );

	done();
};

exports['xTo Number'] = function(assert) {
	var done = assert.done || assert.async();

	assert.equal( (1).xTo(), '1' );

	done();
};

exports['xTo String'] = function(assert) {
	var done = assert.done || assert.async();

	assert.equal( 'a'.xTo(), '"a"' );
	assert.equal( 'b"c'.xTo(), '"b\\"c"' );

	done();
};

exports['toMath Number'] = function(assert) {
	var done = assert.done || assert.async();

	assert.equal( (1).toMath('abs'), 1 );
	assert.equal( (-1).toMath('abs'), 1 );
	assert.equal( (-0.1).toMath('abs'), 0.1 );

	done();
};

exports['toMath String'] = function(assert) {
	var done = assert.done || assert.async();

	assert.equal( '1'.toMath('abs'), 1 );
	assert.equal( '-1'.toMath('abs'), 1 );
	assert.equal( '-0.1'.toMath('abs'), 0.1 );

	done();
};

exports['toURLParam Object'] = function(assert) {
	var done = assert.done || assert.async();

	assert.equal( { a: 'A' }.toURLParam(), 'a=A' );
	assert.equal( { a: 'A', b: true }.toURLParam(), 'a=A&b=true' );
	
	done();
};


exports['xAdd Array'] = function(assert) {
	var done = assert.done || assert.async();
	assert.expect(11);

	// standard
	assert.deepEqual( [].xAdd('a'), ['a'] );
	assert.deepEqual( [].xAdd( 'a', 'b' ), ['a','b'] );
	assert.deepEqual( [].xAdd([ 'a', 'b' ]), ['a','b'] );
	assert.deepEqual( [].xAdd(['a'], ['b']), ['a','b'] );

	// empty items
	assert.deepEqual( [].xAdd(), [] );
	assert.deepEqual( [].xAdd([]), [] );
	assert.deepEqual( [].xAdd(['a'], []), ['a'] );

	// undefined items
	assert.deepEqual( [].xAdd( undefined ), [] );
	assert.deepEqual( [].xAdd( undefined, 'b' ), ['b'] );
	assert.deepEqual( [].xAdd([ 'a', undefined ]), ['a'] );
	assert.deepEqual( [].xAdd(['a'], [ undefined ]), ['a'] );
	
	done();
};


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


exports['xEach Array async'] = function(assert) {
	var done = assert.done || assert.async();
	var count = 0;
	assert.expect(5);

	var a = ['A'];
	a.xEach({
		async: true,
		success: function( item, index ) {
			assert.equal( count, 1 );
			count += 1;

			assert.equal( item, 'A' );
			assert.equal( index, 0 );
		},
		complete: function() {
			assert.equal( count, 2 );
			count += 1;
			
			done();
		}
	});

	assert.equal( count, 0 );
	count += 1;
};






exports['escape RegExp'] = function(assert) {
	var done = assert.done || assert.async();

	assert.equal( RegExp.escape('a.b'), 'a\\.b' );
	assert.equal( RegExp.escape('.*+?^${}()|[\]\\'), '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\' );

	done();
};
