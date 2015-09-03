var express = require('express');
var router = express.Router();
var path = require('path');
var util = require('util');
var url = require('url');
var async = require('async');

var userBiz = require(path.join(global.rootPath,'interfaceBiz/userBiz'));
var msg = require(path.join(global.rootPath,'define/msg')).global_msg_define;

router.post('/register', function(req, res){
    var param = url.parse(req.url, true).query;
    async.waterfall([
	function(callback){
	    userBiz.register(param, function(err, rows, fields){
		callback(err);
	    });
	},
	function(callback){
	    userBiz.recordPsw(param, function(err, rows, fields){
		callback(err, rows);
	    });
	}
    ],function(err, results){
	msg.wrapper(err, results, res);
    });
});

module.exports = router;
