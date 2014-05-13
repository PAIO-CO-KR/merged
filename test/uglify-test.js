/* globals describe, it, $ */
'use strict';

var UglifyJS = require("uglify-js");

var expect = expect || require('expect.js');

var source;

//describe('UglifyJS', function () {
//	describe('Parser', function () {
//		it('testing', function (done) {
//			var ast = UglifyJS.parse(source);
//
//			// in this hash we will map string to a variable name
//			var strings = {};
//
//			// here's the transformer:
//			var consolidate = new UglifyJS.TreeTransformer(null, function(node){
//				if (node instanceof UglifyJS.AST_Defun) {
//					var simpleBody = '"simeple body";';
//					var simepleBodyAst = [UglifyJS.parse(simpleBody)];
//					node.body = simepleBodyAst;
////					console.log(node);
//				}
//				if (node instanceof UglifyJS.AST_Function) {
//					var simpleBody = '"simeple body";';
//					var simepleBodyAst = [UglifyJS.parse(simpleBody)];
//					node.body = simepleBodyAst;
////					console.log(node);
//				}
//				return node;
//			});
//
//			var count = 0;
//			function getStringName(node) {
//				var str = node.getValue(); // node is AST_String
//				if (strings.hasOwnProperty(str)) return strings[str];
//				var name = "_" + (++count);
//				return strings[str] = { name: name, node: node };
//			}
//
//			// transform and print
//			var ast2 = ast.transform(consolidate);
//			console.log(ast2.print_to_string({ beautify: true }));
//
//			// also, the change is non-destructive; the original AST remains the same:
//			console.log("========================================================");
//			console.log("Original:");
//			console.log("========================================================");
//			console.log(ast.print_to_string({ beautify: true }));
//
//			done();
//		});
//	});
//});





//		function getName(userId, callback) {
//			connection.query('SELECT first_name, last_name FROM user WHERE id=' + userId, function (result) {
//				callback(result[0]);
//			});
//		}
//
//		var userId = 100;
//		getName(userId, function(result) {
//			alert('User name for ID ' + userId + ' is' + result.first_name + ' ' + result.last_name);
//		});
//
//
//http.createServer(function (req, res) {
//	if (req.url === 'api/getname') {
//		var userId = req.params.userId;
//		...
//		connection.query('SELECT first_name, last_name FROM user WHERE id=' + userId, function (result) {
//			...
//			res.writeHead(200, {'Content-Type': 'text/json'});
//			res.write(JSON.stringify(result[0]));
//			res.end();
//		});
//	}
//});
//
//
//
//var userId = 100;
//...
//$.ajax({
//	url: 'http://example.com/api/getname',
//	type: 'POST',
//	parameters: {userId: userId}
//}).done(function (result) {
//	...
//	alert('User name for ID ' + userId + ' is' + result.first_name + ' ' + result.last_name);
//}).fail(function (error) {
//	alert('getName failed');
//});



source = "\'use strict\';\r\n\r\n\r\nvar path = require(\'path\');\r\nvar EventEmitter = require(\'events\').EventEmitter;\r\nvar spawn = require(\'child_process\').spawn;\r\nvar fs = require(\'fs\');\r\nvar os = require(\'os\');\r\nvar async = require(\'async\');\r\nrequire(\'colors\');\r\n\r\n\r\n\/**\r\n * selenium server jar path.\r\n *\r\n * @constant\r\n * @private\r\n * @type {*|String}\r\n * @remote\r\n *\/\r\nvar DEFAULT_SELENIUM_JAR = path.resolve(__dirname, \'..\/external-lib\/selenium-server-standalone-2.41.0.jar\');\r\n\r\n\/**\r\n * driver path\r\n *\r\n * @constant\r\n * @private\r\n * @type {Promise}\r\n *\/\r\nvar DRIVER_PATH = path.resolve(__dirname, \'..\/external-lib\');\r\n\r\n\/**\r\n * default selenium port\r\n *\r\n * @type {number}\r\n *\/\r\nvar DEFAULT_PORT = 4444;\r\n\r\n\r\n\r\n\r\n\/**\r\n * response events code and message.\r\n *\r\n * @private\r\n * @param code\r\n * @param message\r\n * @constructor\r\n *\/\r\nfunction Response(code, message) {\r\n\tthis.code = code;\r\n\tthis.message = message;\r\n}\r\n\r\n\/**\r\n * response events code and message.\r\n *\r\n * @constant\r\n * @type {{0: string, 1: string, 2: string}}\r\n *\/\r\nvar RESPONSES = {\r\n\tOK: new Response(0, \'selenium started ok.\'),\r\n\tERROR_JAVA_NOT_FOUND: new Response(1, \'failed to start selenium. java not found. system can not find java. \' +\r\n\t\t\'selenium-manager needs java installed. if java already has been installed, please set java_home or\' +\r\n\t\t\'make sure java interpreter can be found in path environment.\' +\r\n\t\t\'alternatively you can pass java interpreter path when you initiate SeleniumManager object\' +\r\n\t\t\'ex) var seleniumManager = new SeleniumManager(\\\'usr\/bin\/java\\\');\'),\r\n\tERROR_PORT_UNAVAILABLE: new Response(2, \'failed to start selenium. port unavailable. \' +\r\n\t\t\'the port you pass is taken by another process or selenium is already running.\'),\r\n\tERROR_DRIVER_NOT_FOUND: new Response(3, \'failed to start selenium. driver not found.\'),\r\n\tERROR_UNKNOWN: new Response(999, \'failed to start selenium. unknown error.\')\r\n};\r\n\r\n\r\n\r\n\r\n\/**\r\n * SeleniumManager constructor\r\n *\r\n * @param {string} javaPath it can be omitted. SeleniumManager will use java in javaPath supplies. if it is omitted, \\\r\n * javahome or path environment will be used.\r\n * @param {boolean} verboseLog if set true, console out selenium server logs.\r\n * @constructor\r\n *\/\r\nfunction SeleniumManager (javaPath, verboseLog) {\r\n\tif (!(this instanceof SeleniumManager)) {\r\n\t\treturn new SeleniumManager(javaPath);\r\n\t}\r\n\r\n\tif (process.env.JAVA_HOME) {\r\n\t\tthis._javaInterpreter = path.resolve(process.env.JAVA_HOME, \'bin\/java\');\r\n\t}\r\n\r\n\tthis._verboseLog = verboseLog || false;\r\n\tthis._javaInterpreter = javaPath || this._javaInterpreter;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\/**\r\n * by default java interpreter will be executed by calling \'java\' in command line.\r\n * SeleniumManager constructor can replace it.\r\n *\r\n * @private\r\n * @type {string}\r\n *\/\r\nSeleniumManager.prototype._javaInterpreter = \'java\';\r\n\r\n\r\n\/**\r\n * verbose log turn on flag\r\n *\r\n * @type {boolean}\r\n * @private\r\n *\/\r\nSeleniumManager.prototype._verboseLog = false;\r\n\r\n\r\n\r\nvar testFunction = function (d) {\r\n\t\'simeple\';\r\n};\r\n\r\n\r\n\/**\r\n * start callback\r\n *\r\n * @callback startCallback\r\n * @param {Response} response\r\n *\/\r\n\r\n\/**\r\n * starts selenium server.\r\n *\r\n * @param {startCallback} callback\r\n * @param {{serverJar: string, port: number}} option to be added when it starts selenium server\r\n *\/\r\nSeleniumManager.prototype.start = function (callback, option) {\r\n\toption = option || {};\r\n\tvar serverJar = option.serverJar || DEFAULT_SELENIUM_JAR;\r\n\tvar port = option.port || DEFAULT_PORT;\r\n\r\n\tasync.map([serverJar], fs.stat, function (err) {\r\n\t\tif (err) {\r\n\t\t\tcallback(RESPONSES.ERROR_DRIVER_NOT_FOUND);\r\n\t\t\treturn;\r\n\t\t}\r\n\r\n\t\tif (os.platform().indexOf(\'win32\') >= 0) {\r\n\t\t\tprocess.env.PATH = process.env.PATH + \';\' + DRIVER_PATH;\r\n\t\t} else {\r\n\t\t\tprocess.env.PATH = process.env.PATH + \':\' + path.resolve(__dirname, \'..\/node_modules\/.bin\');\r\n\t\t}\r\n\/\/\t\tthis._command = spawn(this._javaInterpreter, [\'-jar\', serverJar, \'-port\', port, \'Dwebdriver.chrome.driver=\' + path.resolve(DRIVER_PATH, \'chromedriver\')], {env: process.env});\r\n\t\tthis._command = spawn(this._javaInterpreter, [\'-jar\', serverJar, \'-port\', port], {env: process.env});\r\n\r\n\t\tvar emitter = new EventEmitter();\r\n\t\tvar statusCallback = function (status) {\r\n\t\t\tif (status !== RESPONSES.OK) {\r\n\t\t\t\tthis.stop();\r\n\t\t\t}\r\n\t\t\temitter.removeAllListeners();\r\n\t\t\tcallback(status);\r\n\t\t}.bind(this);\r\n\t\temitter.on(\'status\', statusCallback);\r\n\r\n\t\tthis._command.stdout.setEncoding(\'utf8\');\r\n\t\tthis._command.stderr.setEncoding(\'utf8\');\r\n\t\tthis._command.stdout.on(\'data\', this._makeMatchFunction(\'Started org.openqa.jetty.jetty.Server\', emitter, RESPONSES.OK).bind(this));\r\n\t\tthis._command.stderr.on(\'data\', this._makeMatchFunction(\'Selenium is already running on port\', emitter, RESPONSES.ERROR_PORT_UNAVAILABLE).bind(this));\r\n\t\tthis._command.stderr.on(\'data\', this._makeMatchFunction(\'Unable to access jarfile\', emitter, RESPONSES.ERROR_DRIVER_NOT_FOUND).bind(this));\r\n\t\tthis._command.stderr.on(\'data\', this._makeMatchFunction(\'execvp(): No such file or directory\', emitter, RESPONSES.ERROR_JAVA_NOT_FOUND).bind(this));\r\n\t\tthis._command.on(\'error\', function (error) {\r\n\t\t\tif (this._verboseLog) {\r\n\t\t\t\tconsole.log(error);\r\n\t\t\t}\r\n\t\t\tif (error.code && error.code === \'ENOENT\') {\r\n\t\t\t\temitter.emit(\'status\', RESPONSES.ERROR_JAVA_NOT_FOUND);\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t}.bind(this));\r\n};\r\n\r\n\r\n\/**\r\n * make match function for log console.\r\n *\r\n * @param matchString\r\n * @param emitter\r\n * @param status\r\n * @returns {Function}\r\n * @private\r\n *\/\r\nSeleniumManager.prototype._makeMatchFunction = function (matchString, emitter, status) {\r\n\treturn function (data) {\r\n\t\tif (this._verboseLog) {\r\n\t\t\tconsole.log(data);\r\n\t\t}\r\n\t\tif (data.indexOf(matchString) >= 0) {\r\n\t\t\temitter.emit(\'status\', status);\r\n\t\t}\r\n\t};\r\n};\r\n\r\n\r\n\r\n\r\n\/**\r\n * stops selenium server immediately.\r\n *\r\n *\/\r\nSeleniumManager.prototype.stop = function () {\r\n\tif (this._command && this._command.kill) {\r\n\t\tthis._command.kill();\r\n\t}\r\n};\r\n\r\n\r\n\r\n\r\n\r\nmodule.exports.RESPONSE = RESPONSES;\r\nmodule.exports.SeleniumManager = SeleniumManager;";