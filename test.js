//var jwt=require('jsonwebtoken');

var jwt = require('jsonwebtoken');
var user={  name:"mukul" ,
            pass: "abc "
        };
var token = jwt.sign(user,"bcdefg" ||cfg.jwtSecret, {
    expiresIn: 10080 // in seconds
  });
console.log(token);