import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { prisma } from "../config/config.js";

export default passport.use(
    new GithubStrategy({
        clientID:process.env.GITHUB_AUTH_CLIENT_ID,
        clientSecret:process.env.GITHUB_AUTH_CLIENT_SECRET,
        callbackURL:"http://localhost:4000/api/auth/github/callback",
        scope: ['user:email']
    },async function(accessToken,refreshToken,profile,done){
        try {
            const { displayName,username,_json:{ name },emails,provider} = profile
            const email = emails[0].value
            const user = await prisma.user.upsert({
                where:{
                    email
                },
                create:{
                    email,
                    username:displayName || name || username,
                    provider,
                },
                update:{
                    username:displayName || name || username,
                }
            })
    
            if(!user){
                throw new Error("Unexpected error")
            }
    
            done(null,user)
        } catch (error) {
            done(error,null)
        }
    })
)