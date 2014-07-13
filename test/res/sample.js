'use strict';

//@remote
//@test
function simpleTest (arg1, arg2, cb) {
    cb(arg1 + arg2);
}



simpleTest(1, 2, function (result) {
    console.log(result);
});