import express from "express"
import { signUp, user } from "../../controller/userController"
import passport from "passport"

const router = express.Router()

router.post("/auth/sign-up",signUp)
router.post("/auth/sign-in",passport.authenticate("local"),function(req,res){
    return res.status(200).json({ message:"Successfully" })
})
router.get("/auth/user",user)
router.get("/auth/sign-out",function(req,res){
    if(!req.user) return res.status(401).json({ message:"Unauthorized" })

    req.logOut((error)=>{
        if(error) return res.status(404).json({ message:"Error" })
        res.json({ message:"Successfully" })
    })
})

export default router