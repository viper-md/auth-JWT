// index.js
let express = require("express");
let bodyParser = require("body-parser");
let jwt = require("jwt-simple");
let auth = require("./config/auth.js")();
let users = require("./app/model/users.js");
let cfg = require("./config/config.js");
let app = express();
let port=8080;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(auth.initialize());

app.get("/", function(req, res) {
res.json({status: "My API is alive!"});
});

app.get("/user", auth.authenticate() , function(req,res){
	res.json(users[req.user.id]);

});


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

app.listen(port, function() {
console.log("running at port" + port);
});

module.exports = app;