import express from "express"
import passport from "passport"

const router = express.Router()

router.get("/auth/google",passport.authenticate('google'))
router.get("/auth/google/callback",passport.authenticate('google'),function(req,res){
    return res.sendStatus(200)
})

export default router