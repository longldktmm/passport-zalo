"# passport-zalo" 
How to use passport-zalo:
In passport.js, we will set up config:
---------------------------------------------------------------------------------
var ZaloStrategy = require('passport-zalo').Strategy;
passport.use(new ZaloStrategy({
    clientID: "clientID",
    clientSecret: "clientSecret",
    callbackURL: "https://domain.com/api/v1/staff/account/login-by-zalo",
},function (accessToken, refreshToken, profile, done) {
    	return done(profile);
    }
));
---------------------------------------------------------------------------------
In controller
staffLoginByZalo: function (req, res) {
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
