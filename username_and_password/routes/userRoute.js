import express from "express"
import { signUp, user } from "../controller/userController.js"
import passport from "passport"

const router = express.Router()

router.post("/auth/sign-up",signUp)
router.post("/auth/sign-in",passport.authenticate("local"),function(req,res){
    return res.status(200).send("successfully")
})
router.get("/auth/user",user)
router.post("/auth/sign-out",)

export default router