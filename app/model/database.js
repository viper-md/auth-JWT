var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://mukul:newPassword@localhost:5432/mukul');
var bcrypt = require('bcrypt');

var User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
   // unique:true,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  password: {
    type: Sequelize.STRING
  }
},

 {
    
    freezeTableName: true // Model tableName will be the same as the model name
});
 

//dummy data for testing 

module.exports=User;


User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    email: 'mukul@mail.com',
    password: 'mukuldev' 
  });
});

