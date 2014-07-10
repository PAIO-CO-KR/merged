/* globals describe, it */
'use strict';

var expect = expect || require('expect.js');

var merged = require('../lib/merged');

describe('merged module', function () {
    describe('merge function', function () {
        it('should be implemented', function (done) {
            merged.merge('./test.js', 'http://localhost:8080/simepleTest', function callback(result) {
                expect(result).to.be.ok();
                done();
            });
        });
    });

    describe('parse function', function () {
        it('should be implemented', function (done) {
            var ast = merged.parse(null);
            expect(ast).to.be.ok();
            done();
        });
    });

    describe('transform function', function () {
        it('should be implemented', function (done) {
            var result = merged.tranform(null);
            expect(result).to.be.ok();
            done();
        });
    });
});