import bcrypt from "bcrypt"
import { prisma } from "../config/config.js"
import { userSchema } from "../schema/schema.joi.js"

export const signUp = async (req,res)=>{
    try {
        const { error , value } = userSchema.validate(req.body)
        if(error){
            console.log(error)
            throw new Error("User information is required",)
        }

        const { username,email,password } = value

        const isUserExists = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(isUserExists){
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await prisma.user.create({
            data:{
                email,
                username,
                password:hashedPassword,
                provider:"local"
            }
        })

        if(!user){
            throw new Error("User is not created")
        }
        return res.status(201).json({ message:"Successfully" })
    } catch (error) {
        return res.status(500).send(error)   
    }
}

export async function user(req,res){
    const user = req.user;
    if(!user) return res.status(401).json({ message:"Unauthorized" })
    res.status(200).json(user)
} 