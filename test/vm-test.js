/* globals describe, it, $ */
'use strict';

var expect = expect || require('expect.js');

var vm = require('vm');

describe('VM module', function () {
	describe('runInThisContext', function () {
		it('should log on console', function (done) {
			vm.runInThisContext("console.log('test1');\n\n" +
			"console.log('test2');\n\n" +
			"console.log('test3');", 'test.js');
			done();
		});
	});
});