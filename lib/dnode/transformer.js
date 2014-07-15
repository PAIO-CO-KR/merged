'use strict';

var Uglify = require('uglify-js');

exports.transform = transform;

var transformers = [];

var getName = function() {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

function transform (source) {
    var ast = Uglify.parse(source);

    var ast2 = ast.transform(new Uglify.TreeTransformer(null, function(node) {
        var transformedNode = null;
        for (var i = 0; i < transformers.length; i += 1) {
            transformedNode = transformers[i](node);
            if (transformedNode) {
                return transformedNode;
            }
        }
    }));

    console.log(ast2.print_to_string({ beautify: true }));

    console.log('Original:');
    console.log(ast.print_to_string({ beautify: true }));
}

//remote annotation transformer
transformers.push(function (node) {
    if (node instanceof Uglify.AST_Defun) {
        for (var i = 0; i < node.start.comments_before.length; i += 1) {
            if (node.start.comments_before[i].value.indexOf('@remote')) {
                console.log('REMOTE FUNCTION FOUND');
                return functionToDefun(node);
            }
        }
    }
});


/**
 *
 * @param functionNode
 */
function functionToDefun (functionNode) {
    console.log('function to defun');
    var defunNode = new Uglify.AST_Function({
        argnames: functionNode.argnames,
        body: functionNode.body,
        start: functionNode.start,
        end: functionNode.end
    });
    console.log(defunNode.print_to_string());
    return defunNode;
}