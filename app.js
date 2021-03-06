'use strict'
global.rootPath = __dirname;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var console_trace = require('debug-trace')({always:true});

var app = express();

var logger = require(path.join(global.rootPath,'util/logger')).logger;
var redis_mgr = require(path.join(global.rootPath,'redis/redis_mgr'));
var queryCenter = require(path.join(global.rootPath, 'routes/common/common'));

//解析cookie
app.use(cookieParser());
//解析http body
app.use(bodyParser({limit : '1mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//各种模块初始化
redis_mgr.init(7776);
queryCenter.init();

var initRoutes = require('./routes/init');
initRoutes(app);

module.exports = app;
