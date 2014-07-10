
var uglify = require('uglify-js');

exports.transform = transform;

function transform (source) {
    var ast = uglify.parse(source);
}