/* globals describe, it */
'use strict';

var spawn = require('child_process').spawn;
var expect = expect || require('expect.js');


describe('Thrift', function () {
	describe('command line tool', function () {
		it('should be accessible in path', function (done) {
			var thrift = spawn('thrift', ['--version']);
			thrift.stdout.on('data', function (data) {
				expect(data.toString()).to.contain('version');
			});

			thrift.stderr.on('data', function (err) {
				expect(err).to.not.be.ok();
			});

			thrift.on('error', function (err) {
				expect(err).to.not.be.ok();
				done();
			});

			thrift.on('close', function (code) {
				done();
			});
		});
	});
});
