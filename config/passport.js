let passport = require("passport");
let passportjwt = require("passport-jwt");
//let users = require("../app/model/users.js");
let User = require("../app/model/database");
let cfg = require("./cfg.js");
let ExtractJwt = passportjwt.ExtractJwt;
let JwtStrategy = passportjwt.Strategy;
let LocalStrategy = require('passport-local').Strategy;
const localOptions = { usernameField: 'email' }; 
/*let params = {
secretOrKey: cfg.jwtSecret,
jwtFromRequest: ExtractJwt.fromAuthHeader()
};
*/
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {  
   User.findOne({where : {email : email , password: password}}).then(function(user){
      if(user)
        return done(null,user);
   }).catch(function(error){
     return done(error);
   });
});


/*const localLogin = new LocalStrategy(localOptions, function(email, password, done) {  
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

      return done(null, user);
    });
  });
});
*/
const jwtOptions = {  
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: cfg.jwtSecret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {  
    console.log(payload);
   User.findById(payload.id).then(function(user){
      if(user){
        done(null,user);
      }
      else
        done(null,false);
   }).catch(function(error){
      return done(error,false);
   });
});

/*const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {  
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
*/
passport.use(jwtLogin);
passport.use(localLogin);
module.exports=jwtLogin;
module.exports=localLogin;
/*
module.exports = function(passport) {
        let params = {
             secretOrKey: "abcd",
             jwtFromRequest: ExtractJwt.fromAuthHeader()
    };

	let strategy = new Strategy(params, function(payload, done) {
       // let id = payload.id;
        User.findOne({where : {id : payload.id }})
        .then(function(user){
            console.log(payload);
            if(user)
                done(null,user);
            else
              return  done(null,false);
        });
       console.log(JSON.stringify(payload, null, 4));
    });

}*/