let express = require('express');
let app = express();
let bodyparser=require('body-parser');
let passport=require('passport');
let jwt =require('jsonwebtoken');
let port =8080;

app.use(bodyparser.urlencoded({extended : false }));
app.use(bodyparser.json());


app.get('/',function(req,res){
    res.send("hello");
});

app.listen(port);
console.log('your server running on port' +  port);