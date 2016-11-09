// auth.js
let passport = require("passport");
let passportjwt = require("passport-jwt");
let users = require("../app/model/users.js");
let User = require("../app/model/database");
let cfg = require("./config.js");
let ExtractJwt = passportjwt.ExtractJwt;
let Strategy = passportjwt.Strategy;
let params = {
secretOrKey: cfg.jwtSecret,
jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
	let strategy = new Strategy(params, function(payload, done) {
		let user = users[payload.id] || null;
	
		if (user) {
			return done(null, {id: user.id});
}
		 else {
			return done(new Error("User not found"), null);
		}
});

passport.use(strategy);

return {
	initialize: function() {
		return passport.initialize();
	},
	authenticate: function() {
		return passport.authenticate("jwt", cfg.jwtSession);
	}
	};
};