const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){

   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;

   const data ={
     members: [
       {
         email_address: email,
         status: "subscribed",
         marge_fields:{
           FNAME:firstName,
           LNAME:lastName
         }
       }
     ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us9.api.mailchimp.com/3.0/lists/f7f97d4167";

   const options  ={
     method:"POST",
     auth:"adarsh:035307a5f7f28b801b8197b31b25b0d6-us9"
   };

   const request = https.request(url,options,function(response){

     if(response.statusCode === 200){
       res.sendFile(__dirname + "/success.html");
     }

     else{
       res.sendFile(__dirname + "/failure.html");
     }

     response.on("data",function(data){
       // console.log(JSON.parse(data));
     })
   });

   request.write(jsonData);
   request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
})


//api key 035307a5f7f28b801b8197b31b25b0d6-us9
//audience id = f7f97d4167
