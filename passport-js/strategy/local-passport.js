import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import { prisma } from "../config/config.js";

export default passport.use(
    new Strategy({usernameField:"email"},async function(email,passport,done){
        try {
            const user = await prisma.user.findUnique({
                where:{
                    email
                }
            })
    
            if(!user){
                throw new Error("User not found")
            }
            
            const isMatch = await bcrypt.compare(passport,user.password)
            
            if(!isMatch){
                throw new Error("invalid password")
            }
    
            done(null,user)
        } catch (error) {
            done(error,null)
        }
    })
)