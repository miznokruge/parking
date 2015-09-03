var msg = {};
msg.define = {};
msg.code = {};

msg.code.ERR_SUCCESS = 0;
msg.code.ERR_DB_ERR = -1;
msg.code.ERR_VALID_SMS = -2;
msg.code.ERR_VALID_QUERY = -3;
msg.code.ERR_BOOK_FAIL = -4;
msg.code.ERR_HAS_REGISTER = -5;

msg.define[msg.code.ERR_SUCCESS] = 'success';
msg.define[msg.code.ERR_DB_ERR] = '服务器内部错误，请联系客服';
msg.define[msg.code.ERR_VALID_SMS] = '非法的短信验证码';
msg.define[msg.code.ERR_VALID_QUERY] = '非法的请求参数';
msg.define[msg.code.ERR_BOOK_FAIL] = '该挂单已被抢走';
msg.define[msg.code.ERR_HAS_REGISTER] = '该用户已注册';

msg.wrapper = function(err,result,res){
    if(err){
        if(msg.define[err]){
            res.jsonp(msg.getMsg(err));
        }else{
            res.jsonp(msg.getMsg(msg.code.ERR_DB_ERR));
        }
    }else{
        res.jsonp(msg.getMsg(msg.code.ERR_SUCCESS,result));
    }
};

msg.getMsg = function(code, result){
    var obj = {};
    obj.errCode = code;
    obj.msg = msg.define[code];
    if(typeof result != 'undefined'){
        obj.result = result;
    }
    return obj;
};

module.exports.global_msg_define = msg;
