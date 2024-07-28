import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { prisma } from "../config/config.js";

export default passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret:process.env.GOOGLE_AUTH_CLIENT_SECRET,
        callbackURL:"http://localhost:4000/api/auth/google/callback",
        scope:['profile','email']
    },async function(accessToken,refreshToken,profile,done){
        try {
            const { displayName, emails,_json,provider } = profile
            const { given_name, email } = _json
            
            const user = await prisma.user.upsert({
                where:{
                    email:email || emails[0].value
                },
                create:{
                    email,
                    username:displayName || given_name,
                    provider,
                },
                update:{
                    username:displayName || given_name,
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