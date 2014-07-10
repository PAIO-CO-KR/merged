//manage sources, connections...

'use strict';


exports.merge = merge;
exports.parse = parse;
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
    //TODO read file content

    //TODO build AST out of the file content

    //TODO iterate AST node,
    //TODO find annotated 'merge' node out of AST
    //TODO transform annotated node

    //TODO stringify transformed AST

    //TODO callback cb with stringified & transformed AST

    throw new Error('not implemented');
}






/**
 * build AST for given javascript
 * @param source
 * @returns {AST}
 */
function parse (source) {
    //TODO implement
    throw new Error('not implemented');
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



