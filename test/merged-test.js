/* globals describe, it */
'use strict';

var expect = expect || require('expect.js');
var assert = require("assert");

var merged = require('../lib/merged');

describe('merged module', function () {
    describe('merge function', function () {
        it('should be implemented', function (done) {
            merged.merge(__dirname + '/res/sample.js', 'http://localhost:8080/simepleTest', function callback(result) {
                expect(result).to.be.ok();
                assert.ok(result);
                done();
            });
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