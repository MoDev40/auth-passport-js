import express from "express"

const route = express.Router()

route.post("/auth/sign-up")
route.post("/auth/sign-in")
route.post("/auth/sign-out")

export default route