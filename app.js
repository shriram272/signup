//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
const firstName = req.body.fname;
const lastName = req.body.lname;
const email = req.body.email;

const data = {
  members: [
    {
      email_address:email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }
  ]
};
const jsonData = JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/lists/e68762c710";
const options = {
  method: "POST",
  auth: "hackmol:c9570883ad25b34a99b899061d9ff0b8-us14"
};
const request= https.request(url, options, function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  } else{
    res.sendFile(__dirname + "/failiure.html");
  }

  });



});
app.post("/failiure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT|| 3000, function(){
  console.log("server is running on 3000");
});


// api keyc9570883ad25b34a99b899061d9ff0b8-us14
// list id e68762c710
