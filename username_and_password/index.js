import express, { json } from "express"
import session from "express-session"
import passport from "passport"


const app = express()
app.use(json())
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:true,
        maxAge:1*60*60*1000
    }
}))

app.use(passport.initialize())

app.get("/",(req,res)=>{
    const session = req.session;
    res.send(session)
})

app.listen(4000,()=>{
    console.log("server listening port 4000")
})