"# passport-zalo"
Zalo:
	https://zalo.me/
	https://en.wikipedia.org/wiki/VNG_Corporation#Zalo 
Idea passport: 
	https://github.com/didinj/node-facebook-twitter-google-github-login
Require zalo-sdk build from https://developers.zalo.me/docs/api/social-api-4
	https://github.com/zaloplatform/zalo-nodejs-sdk
---------------------------------------------------------------------------------
---------------------------------------------------------------------------------	
How to use passport-zalo:
In passport.js, we will set up config:
---------------------------------------------------------------------------------
var ZaloStrategy = require('passport-zalo').Strategy;
passport.use(new ZaloStrategy({
    clientID: "clientID",
    clientSecret: "clientSecret",
    callbackURL: "https://domain.com/api/account/login-by-zalo",
},function (accessToken, refreshToken, profile, done) {
    	return done(profile);
    }
));
---------------------------------------------------------------------------------
In controller:

'get /api/account/login-by-zalo': 'Controller.LoginByZalo',
LoginByZalo: function (req, res) {
        passport.authenticate('zalo', function (err, data) {
            if (err || !data) {
                return res.failed("ERR01",err,data);
            } else {
                return res.success(data);
            }
        })(req, res);
    },
---------------------------------------------------------------------------------
Success:   
    gender, name(fullname), picture.data.url, birthday,id
---------------------------------------------------------------------------------
Error:
	throw or zalo oathor error
---------------------------------------------------------------------------------