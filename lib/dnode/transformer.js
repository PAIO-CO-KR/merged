'use strict';

var Uglify = require('uglify-js');

exports.transform = transform;

var transformers = [];

var getName = function() {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

function transform (source, proxy) {
    var ast = Uglify.parse(source);

    var ast2 = ast.transform(new Uglify.TreeTransformer(null, function(node) {
        var transformedNode = null;
        for (var i = 0; i < transformers.length; i += 1) {
            transformedNode = transformers[i](node, proxy);
            if (transformedNode) {
                return transformedNode;
            }
        }
    }));

    console.log('================================ Original ================================');
    console.log(ast.print_to_string({ beautify: true }));

    console.log('================================ Translated ================================');
    console.log(ast2.print_to_string({ beautify: true }));
}

//remote annotation transformer
transformers.push(function (node, proxy) {
    if (node instanceof Uglify.AST_Defun || node instanceof Uglify.AST_Function) {
        for (var i = 0; i < node.start.comments_before.length; i += 1) {
            if (node.start.comments_before[i].value.indexOf('@remote')) {
                console.log('REMOTE FUNCTION FOUND');
                proxy.addProxyFunction(node.name.name, makeFunction(node));
                return node;
            }
        }
    }
});


/**
 *
 * @param node
 * @returns {Function}
 */
function makeFunction (node) {
    var args = [];
    var i = 0;
    for (i = 0; i < node.argnames.length; i += 1) {
        args.push(node.argnames[i].name);
    }

    var body = '';
    for (i = 0; i < node.body.length; i += 1) {
        body += node.body[i].print_to_string({ beautify: true }) + '\n';
    }
    return new Function(args, body);
}
