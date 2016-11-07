# auth-JWT
Use Postman or curl as the client to test the API's.

curl : 
To get the token: 
  POST -H 'Content-Type: application/json' -d '{ "email": "mukul@mail.com", "password": "mukul1" }' localhost:8080/token

To view the user using token granted before :
  curl -H   'Authorization: JWT token ' localhost:8080/user

