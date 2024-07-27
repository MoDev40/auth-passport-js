import express from "express"
import { signUp } from "../controller/userController.js"

const router = express.Router()

router.post("/auth/sign-up",signUp)
router.post("/auth/sign-in")
router.post("/auth/sign-out")

export default router