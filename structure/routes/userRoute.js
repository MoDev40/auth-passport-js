import express from "express"

import { signUp, user } from "../../controller/userController.js"

import passport from "passport"

const router = express.Router()

//  sign-in local route
router.post("/auth/sign-in",passport.authenticate("local"),function(req,res){
    return res.status(200).json({ message:"Successfully" })
})

// sing-in github route
router.get("/auth/github",passport.authenticate('github'))
router.get("/auth/github/callback",passport.authenticate('github'),function(req,res){
    return res.sendStatus(200)
})

// sing-in google route
router.get("/auth/google",passport.authenticate('google'))
router.get("/auth/google/callback",passport.authenticate('google'),function(req,res){
    return res.sendStatus(200)
})

// get user
router.get("/auth/user",user)

// sign-out route 
router.get("/auth/sign-out",function(req,res){
    if(!req.user) return res.status(401).json({ message:"Unauthorized" })

    req.logOut((error)=>{
        if(error) return res.status(404).json({ message:"Error" })
        res.json({ message:"Successfully" })
    })
})

// sign-up route
router.post("/auth/sign-up",signUp)

export default router