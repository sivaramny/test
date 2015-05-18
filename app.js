var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
var path = require('path');


/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport("SMTP",{
service: "Gmail",
debug: true,
auth: {
	user: "sivaram.nyayapati@gmail.com",
	pass: "9248321987"
	}
});


/*------------------SMTP Over-----------------------------*/

app.use(express.static(path.join(__dirname, 'public')));


/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
         res.sendfile('views/index.html');
});

app.get('/send',function(req,res){
	var mailOptions={
	     to : req.query.to,
	     subject : req.query.subject,
	     text : req.query.text
	} 
 	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
		 if(error){
		  console.log(error);
		  res.end("error");
		 } else{
		   console.log("Message sent: " + response.message);
		   res.end("sent");
		}
	});

});

/*--------------------Routing Over----------------------------*/

app.listen(5000, function(){
	console.log("Express Started on Port 5000");
});
