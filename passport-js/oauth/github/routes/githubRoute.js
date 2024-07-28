import express from "express"
import passport from "passport"

const router = express.Router()

router.get("/auth/github",passport.authenticate('github'))
router.get("/auth/github/callback",passport.authenticate('github'),function(req,res){
    return res.sendStatus(200)
})

export default router