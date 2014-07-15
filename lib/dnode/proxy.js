'use strict';

var Uglify = require('uglify-js');

module.exports.Proxy = Proxy;
Proxy.prototype.bootstrap = bootstrap;
Proxy.prototype.addProxyFunction = addProxyFunction;



function Proxy () {
    if (!(this instanceof Proxy)) {
        return new Proxy(arguments);
    }
    this.functions = [];
}


function setup () {

}


/**
 * add functions which is used to process requests
 * @param fn
 */
function addProxyFunction (fn) {

}


