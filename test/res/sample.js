'use strict';

//@remote
//@test
function simpleTest (arg1, arg2, cb) {
    cb(arg1 + arg2); 'test';
}


var simpleTest2 = function (arg1, arg2, cb) {
    'test';
};



simpleTest(1, 2, function (result) {
    console.log(result);
});