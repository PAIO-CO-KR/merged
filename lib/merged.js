//manage sources, connections...

'use strict';

var fs = require('fs');
var Q = require('q');
var uglify = require('uglify-js');


exports.merge = merge;
exports.tranform = transform;


/**
 *
 * @callback mergeCallback
 * @param {string} merged file content
 * @param {} serverInterfaces
 */
/**
 * merge a file then callback with processed file content.
 * @param {string} filePath file path to merge
 * @param {string} url server url which rpc to use. ex) www.example.com:8080/merged
 * @param {mergeCallback} cb callback to get merged file content
 */
function merge (filePath, url, cb) {
    (function () {
        var deferred = Q.defer();
        //TODO read file content
        fs.readFile(filePath, function (err, data) {
            if (err) {
                deferred.reject(err);
            }
            console.log(data.toString());
            deferred.resolve(data.toString());
        });
        return deferred.promise;
    }()).then (function (source) {
        //TODO build AST out of the file content
        var ast = uglify.parse(source);

        //TODO iterate AST node,
        //TODO find annotated 'merge' node out of AST
        //TODO transform annotated node
        var walker = new uglify.TreeWalker(function(node){
            if (node instanceof uglify.AST_Defun) {
                // string_template is a cute little function that UglifyJS uses for warnings
                console.log(uglify.string_template("Found function {name} at {line},{col}", {
                    name: node.name.name,
                    line: node.start.line,
                    col: node.start.col
                }));
            }
        });
        ast.walk(walker);

        //TODO stringify transformed AST

        //TODO callback cb with stringified & transformed AST
        cb(1);
    });

}






/**
 * transform AST
 * existing function body becomes server interface,
 * rpc stub code replace existing function body.
 * @param node
 * @returns transformedNode transformed node
 * @returns transformedNode.node transformed node
 * @returns transformedNode.interface server interface
 */
function transform (node) {
    //TODO implement
    throw new Error('not implemented');
}



