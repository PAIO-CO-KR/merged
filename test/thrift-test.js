/* globals describe, it, $ */
'use strict';

var spawn = require('child_process').spawn
var expect = expect || require('expect.js');

var source;


describe('Thrift', function () {
	describe('command line tool', function () {
		it('should be accessible in path', function (done) {
			var thrift = spawn('thrift', ['--version']);
			thrift.stdout.on('data', function (data) {
				expect(data.toString()).to.contain('version');
			});

			thrift.stderr.on('data', function (err) {
				expect(err).to.not.be.ok();
			});

			thrift.on('error', function (err) {
				expect(err).to.not.be.ok();
				done();
			});

			thrift.on('close', function (code) {
				done();
			});
		});
	});
});


describe('Thrift', function () {
	describe('tutorial', function () {
		it('testing', function (done) {

//			var thrift = require("thrift");
//			var Calculator = require("./assets/gen-nodejs/Calculator");
//			var ttypes = require("./assets/gen-nodejs/tutorial_types");
//			var SharedStruct = require("./assets/gen-nodejs/shared_types").SharedStruct;
//
//			var data = {};
//
//			var services = {};
//			services['/'] = {
//				processor: Calculator,
//				protocol: require("thrift").TJSONProtocol,
//				cors: ['*'],
//				handler: {
//					ping: function(result) {
//						console.log("ping() on server");
//						result(null);
//					},
//
//					add: function(n1, n2, result) {
//						console.log("add(", n1, ",", n2, ")");
//						result(null, n1 + n2);
//					},
//
//					calculate: function(logid, work, result) {
//						console.log("calculate(", logid, ",", work, ")");
//
//						var val = 0;
//						if (work.op == ttypes.Operation.ADD) {
//							val = work.num1 + work.num2;
//						} else if (work.op === ttypes.Operation.SUBTRACT) {
//							val = work.num1 - work.num2;
//						} else if (work.op === ttypes.Operation.MULTIPLY) {
//							val = work.num1 * work.num2;
//						} else if (work.op === ttypes.Operation.DIVIDE) {
//							if (work.num2 === 0) {
//								var x = new ttypes.InvalidOperation();
//								x.what = work.op;
//								x.why = 'Cannot divide by 0';
//								result(x);
//								return;
//							}
//							val = work.num1 / work.num2;
//						} else {
//							var x = new ttypes.InvalidOperation();
//							x.what = work.op;
//							x.why = 'Invalid operation';
//							result(x);
//							return;
//						}
//
//						var entry = new SharedStruct();
//						entry.key = logid;
//						entry.value = ""+val;
//						data[logid] = entry;
//
//						result(null, val);
//					},
//
//					getStruct: function(key, result) {
//						console.log("getStruct(", key, ")");
//						result(null, data[key]);
//					},
//
//					zip: function() {
//						console.log("zip()");
//						result(null);
//					}
//
//				}
//			};
//			var server = thrift.createWebServer({services: services});
//			server.listen(9090);

done();

//			var thrift = require('thrift');
////			var ThriftTransports = require('thrift/transport');
////			var ThriftProtocols = require('thrift/protocol');
//			var Calculator = require('./assets/gen-nodejs/Calculator');
//			var ttypes = require('./assets/gen-nodejs/tutorial_types');
//
//			var transport = thrift.TBufferedTransport()
//			var protocol = thrift.TBinaryProtocol()
//
//			var connection = thrift.createConnection("localhost", 9090, {
//				transport : transport,
//				protocol : protocol
//			});
//
//			connection.on('error', function(err) {
//				assert(false, err);
//			});
//
//// Create a Calculator client with the connection
//			var client = thrift.createClient(Calculator, connection);
//
//
////			client.ping(function(err, response) {
////				console.log('ping()' + err + response);
////			});
//
//
////			client.add(1,1, function(err, response) {
////				console.log("1+1=" + response);
////			});
//
//
//			var work = new ttypes.Work();
//			work.op = ttypes.Operation.DIVIDE;
//			work.num1 = 1;
//			work.num2 = 0;
//
////			client.calculate(1, work, function(err, message) {
////				if (err) {
////					console.log("InvalidOperation " + err);
////				} else {
////					console.log('Whoa? You know how to divide by zero?');
////				}
////			});
//
//			work.op = ttypes.Operation.SUBTRACT;
//			work.num1 = 15;
//			work.num2 = 10;
//
//			client.calculate(1, work, function(err, message) {
//				console.log('15-10=' + message);
//
//				client.getStruct(1, function(err, message){
//					console.log('Check log: ' + message.value);
//
//					//close the connection once we're done
//					connection.end();
//					done();
//				});
//			});

		});
	});
});