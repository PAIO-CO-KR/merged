/* globals describe, it */
'use strict';

Object.prototype.getName = function() {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

var expect = expect || require('expect.js');
var assert = require("assert");

var merged = require('../lib/merged');
var dnodeRpc = require('../lib/dnode/rpc');


describe('merged module', function () {
    describe('merge function', function () {
        it('should be implemented', function (done) {
            merged.merge(__dirname + '/res/sample.js', 'http://localhost:8080/simepleTest', function callback(result) {
                expect(result).to.be.ok();
                assert.ok(result);
                done();
            }, dnodeRpc);
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