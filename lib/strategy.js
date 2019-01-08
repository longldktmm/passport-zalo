var ZaloSocial = require('zalo-sdk').ZaloSocial;
function Strategy(options, verify) {
    if (typeof options == 'function') {
        verify = options;
        options = {};
    }
    if (!verify) {
        throw new TypeError('PassportZalo requires a verify callback');
    }
    if (!options.clientSecret) {
        throw new TypeError('PassportZalo requires a verify clientSecret');
    }
    if (!options.clientID) {
        throw new TypeError('PassportZalo requires a verify clientID');
    }
    if (!options.callbackURL) {
        throw new TypeError('PassportZalo requires a verify callbackUrl');
    }
    this.name = 'zalo';
    this.appSecret = options.clientSecret;
    this.appId = options.clientID;
    this.redirectUri = options.callbackURL;
    this._verify = verify;

}
Strategy.prototype.authenticate = function (req, options) {
    var self = this;
    var ZSClient = new ZaloSocial({
        appId: self.appId,
        redirectUri: self.redirectUri,
        appSecret: self.appSecret
    });
    function done(err, user, info) {
        if (err) {
            return self.error(err);
        }
        if (!user) {
            return self.fail(info);
        }
        self.success(user, info);
    }
    try {
        if (req.query && req.query.error_code && !req.query.error) {
            return self.error(req.query.error_message);
        }
        if (!req.query || (req.query && !req.query.code)) {
            return self.redirect(ZSClient.getLoginUrl());
        } else {
            ZSClient.getAccessTokenByOauthCode(req.query.code, function (response) {
                if (response && response.access_token) {
                    ZSClient.setAccessToken(response.access_token);
                    ZSClient.api('me', 'GET', {fields: 'id, name, birthday, gender, picture'}, function (response) {
                        if (response && !response.error) {
                            return self._verify(response.access_token, null, response, done);
                        } else {
                            return self.error(response);
                        }
                    });
                } else {
                    return self.error(response);
                }
            });
        }
    } catch (e) {
        return self.error(e);
    }
};
module.exports = Strategy;
