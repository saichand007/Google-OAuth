const passport=require("passport");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
const keys=require("./keys");
const User=require("../model/user-model");


//passport serialize
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
   
});

passport.use(new GoogleStrategy({

    //options for google  strategy
   
    clientID:keys.google.clientId,
    clientSecret:keys.google.clientSecret,
    callbackURL:"/sd/google/redirect"

},(accessToken,refreshToken,profile,done)=>{
     // passport callback function 

    //check if user already exits in db
    User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
            //already have the user
            console.log("already exists");
            done(null,currentUser);
        }
        else{
            //if not create user  in our db
            console.log("passport callback fired");
            console.log(profile);
            new User({
                username:profile.displayName,
                googleId:profile.id,
                pic:profile._json.image.url
            }).save().then((newUser)=>{
                
                console.log("NEW USER:",newUser);
                done(null,newUser);
            });
        }

    })
   
  
})
);