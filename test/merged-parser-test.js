/* globals describe, it */
'use strict';

var expect = expect || require('expect.js');

var MergedParser = require('../lib/merged-parser');

describe('MergedParser', function () {
	describe('initializer', function () {
		it('should perse js file ok', function (done) {
			var parser = new MergedParser();
			done();
		});
	});
});