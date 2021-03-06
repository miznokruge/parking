var path = require('path');
var morgan = require('morgan');
var async = require('async');

var _ = {};
var aMids = [];

var accessLog = morgan({
    "format":"dev",
    "stream":{write:function(str){console.info(str.trim());}}
});

global.accessObj = [];
var tLastSend = new Date();
var accessLogger = function(req,res,next) {
    req._startTime = new Date();
    function logRequest(){
      res.removeListener('finish', logRequest);
      res.removeListener('close', logRequest);
        var logObj = {
            method : req.method,
            path : req.originalUrl,
            statusCode : res.statusCode,
            usedtime  : new Date() - req._startTime,
        };
        global.accessObj.push(logObj);
        if(global.accessObj.length > 10 || (req._startTime - tLastSend) > 500){
            tLastSend = req._startTime;
            global.accessObj = [];
        }
    }

    res.on('finish', logRequest);
    res.on('close', logRequest);
    next();
};

_.commonInit = function(app){
    app.set('jsonp callback name', "callback");
    aMids.push({f:null, r:null, a:accessLog});
    aMids.push({f:null, r:null, a:accessLogger});
    aMids.push({f:'routes/common/post_data', r:null});
    aMids.push({f:'routes/common/router_check', r:null});
    aMids.push({f:'routes/common/sms', r:'/common/sms'});
};

_.userInit = function(app){
    //用户侧
    aMids.push({f:'routes/user/user', r:'/user/user'});
    aMids.push({f:'routes/user/space', r:'/user/space'});
};

var initRoutes = function(app){
    console.time('all');
    _.commonInit(app);
    _.userInit(app);
    aMids.push({f:'routes/login', r:'/login'});
    console.time('async');
    var iMax = 0;
    var szMax = '';
    async.each(aMids, function(mid,callback){
        var t1 = new Date().getTime();
        var a = mid.a;
        if(mid.f){
            a = require(path.join(global.rootPath, mid.f));
        }
        if(mid.r){
            app.use(mid.r, a);
        }else{
            app.use(a);
        }
        var t2 = new Date().getTime();
        if(t2 - t1 > iMax){
            iMax = t2 - t1;
            szMax = require('util').format("{f:%s,r:%s,a:%s} used max time %dms", mid.f, mid.r, mid.a, t2-t1);
        }
        callback();
    },function(err){
    });
    console.log(szMax);
    console.timeEnd('async');

    console.timeEnd('all');
};

module.exports = initRoutes;
