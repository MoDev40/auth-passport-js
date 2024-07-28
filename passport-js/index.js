import genFunc from "connect-pg-simple"
import express, { json } from "express"
import session from "express-session"
import passport from "passport"
import userRouter from "./local/routes/userRoute.js"
import "./strategy/local-passport.js"
import "./strategy/github-passport.js"
import githubRoute from "./oauth/github/routes/githubRoute.js"

const app = express()

app.use(json())

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString:process.env.DATABASE_URL,
  tableName:"Session"
});

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1*60*60*1000
    },
    store:sessionStore
}))


app.use(passport.initialize())
app.use(passport.session())

app.get("/",(req,res)=>{
    const session = req.session;
    res.send(session)
})

app.use("/api",userRouter)
app.use("/api",githubRoute)

app.listen(4000,()=>{
    console.log("server listening port 4000")
})