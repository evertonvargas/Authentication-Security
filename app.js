require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const md5 = require('md5');
const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
  email: String,
  password:String,
});

userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});
const User = mongoose.model("User", userSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.route("/")
.get((req, res) => {
    res.locals.title = "Login";
    res.render("index");
})

.post((req,res)=>{
    const username = req.body.email
    const password = md5(req.body.password)

    User.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err)
        }else{
            if(foundUser){
                if(foundUser.password === password){
                    res.locals.title = "Site";
                    res.render("site")
                }
            }
        }
    })
})

app.route("/register")
.get((req, res) => {
    res.locals.title = "Register";                   
    res.render("register");
})

.post((req,res)=>{
    console.log(req.body)
    const user = new User({
        email: req.body.email,
        password: md5(req.body.password)
    })
    user.save().then(()=>{
        res.redirect("/")
    }).catch(err=>{
        res.send(err)
    })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
