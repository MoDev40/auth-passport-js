import genFunc from "connect-pg-simple"
import express, { json } from "express"
import session from "express-session"
import passport from "passport"
import userRouter from "./local/routes/userRoute.js"
import "./strategy/local-passport.js"
import "./strategy/github-passport.js"
import githubRoute from "./oauth/github/routes/githubRoute.js"
import { prisma } from "./config/config.js"

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

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(async function(id,done){
    try {
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
    
        if(!user){
            throw new Error("User not found")
        }
        user.password = undefined;
        done(null,user)
    } catch (error) {
        done(error,null)
    }
})


app.use("/api",userRouter)
app.use("/api",githubRoute)

app.listen(4000,()=>{
    console.log("server listening port 4000")
})