var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://mukul:newPassword@localhost:5432/mukul');

var User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
   // unique:true,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    email: 'mukul@mail.com',
    password: 'mukuldev'
  });
});
module.exports=User;