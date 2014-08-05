'use strict';

var Uglify = require('uglify-js');

module.exports.Proxy = Proxy;
Proxy.prototype.setup = setup;
Proxy.prototype.addProxyFunction = addProxyFunction;



function Proxy () {
    if (!(this instanceof Proxy)) {
        return new Proxy(arguments);
    }
    this.functions = {};
}


function setup () {

}


/**
 * add functions which is used to process requests
 * @param fn
 */
function addProxyFunction (name, fn) {
    console.log('add proxy function');
    console.log(name + ', ' + fn.toString());
    this.functions[name] = fn;
}


