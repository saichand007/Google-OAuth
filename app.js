const express=require("express");
const authRoutes=require("./routes/auth-routes")
const passportSetup=require("./config/passport-setup");
const mongoose=require("mongoose");
const cookieSession=require("cookie-session");
const passport=require("passport");
const keys=require("./config/keys");
const app=express();


//set up view engine
app.set("view engine","ejs");

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

mongoose.connect(keys.mongodb.dbURL,()=>{
    console.log("connected to mongodb");
});

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use("/sd",authRoutes)

//create home route
app.get("/",(req,res)=>{
   
    res.render("home")
})

//check url authorization
const authcheck=(req,res,next)=>{
    if(!req.user)
    {
        res.redirect("/sd/login");
    }
    else{
        next();
    }
}

app.get("/data",authcheck,(req,res)=>{
    res.render("profile",{user:req.user});
   // res.send("Hi user"+" "+req.user.username);
});



app.listen(3000,()=>{
    console.log("listening on 3000");
})