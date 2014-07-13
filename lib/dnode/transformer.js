'use strict';

var Uglify = require('uglify-js');

exports.transform = transform;

var transformers = [];

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
                console.log(node.start.comments_before[i].value);
                return Uglify.parse(function foo() {
                    console.log("This is a string");
                    console.log("Another string");
                    console.log("Now repeat");
                    var x = "This is a string", y = "Another string";
                    var x = x + y + "Now repeat";
                    alert("Now repeat".length);
                    alert("Another string".length);
                    alert("This is a string".length);
                }.toString());
            }
        }
    }
});