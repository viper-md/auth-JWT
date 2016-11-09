// index.js
let express = require("express");
let bodyParser = require("body-parser");
let passport=require('passport');
let hstore = require('pg-hstore')();
//let jwt = require("jwt-simple");
let jwt = require("jsonwebtoken");
//let auth = require("./config/auth.js");
//let users = require("./app/model/users.js");
let User=require("./app/model/database.js");
let cfg = require("./config/cfg.js");
let api=express.Router();
let app = express();
let port = process.env.PORT || 3000;
let passportService = require('./config/passport');

//middle wares
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(auth.initialize());
app.use('/api',api);
//app.use(passport.initialize());
//let pass=require('./config/passport');
//passport.use(jwtLogin);
//routes
//generate tokens


function generateToken(user) {  
//	res.json("woring"+ user);

	
  return jwt.sign(user,cfg.jwtSecret, {
    expiresIn: 10080 // in seconds
  });
}
function setUserInfo(request) {
  let getUserInfo = {
     id: request.id,
    email: request.email,
	password:request.password,
     
  };

  return getUserInfo;
}

api.get("/check",requireAuth,function(req,res){
	//let user={name : "mukul"};
	//
	res.sendStatus(201);
});

api.post("/login",function(req,res){
	let email=req.body.email;
	let password=req.body.password;
	User.findOne( {email : email , password : password }  ).then(function (user) {
		if(user){
			
			let userinfo=setUserInfo(user);
			//res.send(userinfo);
			res.json({token : generateToken(userinfo)});
//console.log(payload);
			 
			// res.send(user);
			//let u=user;
			//let token = generateToken(user);r
    	
		}
		
		}).catch(function(error){
			res.send(error);
		});
	//find in databse
	// if exsit , check the password .else error. 

});

api.post('/register',function(req,res){
	if(!req.body.email || !req.body.password){
		res.send("do something");
	}
	else{
		let newuser= User.build({
			email:req.body.email,
			password:req.body.password
		});
		
	newuser.save().then(function(saveduser){
			//res.json(saveduser);
		 	 res.json("saved");
		
	
}).catch(function(error){
		res.send(error);
	});
	}
});

api.get('/list',function(req,res){
	
		User.findAll().then(function(users){
			res.json(users);
		}).catch(function(error){
				res.send(error);
		});
		

});

api.post('/authe',function(req,res){
	User.findOne({where :
		{ 	
			 email : req.body.email ,
			// password :req.body.password
		}
		}).then(function(user){
			 if(user){
				 let token = jwt.sign(user,"abcd",{
					 expiresIn : 10000
				 });
			
			res.send({jwttoken : token});
			}
			 else
			 	res.json("doesnt ex or password doesnt match");
		});
		

});

api.get('/profile',requireAuth,function(req,res){

	res.send ("its working : user email" + req.user.email);
});

app.get("/", function(req, res) {
	res.json({status: " API is running!"});
});



api.get("/user",  function(req,res){
	res.send(users[req.user.id]);

});

/*
app.post("/token", function(req, res) {
if (req.body.email && req.body.password) {
	let email = req.body.email;
	let password = req.body.password;
	let user = users.find(function(u) {
	return u.email === email && u.password === password;
	});

if (user) {
	let payload = {id: user.id};
		let token = jwt.encode(payload, cfg.jwtSecret);
	res.json({token: token});
} else {
res.sendStatus(401);
}
} else {
res.sendStatus(401);
}
});
*/
app.listen(port, function() {
console.log("running at port" + port);
//console.log(payload);
});

module.exports = app;