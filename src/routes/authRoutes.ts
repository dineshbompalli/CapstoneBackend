import express from 'express'
import { login, signup } from '../controllers/authControlle'
import { loginValidation, signUpValidation } from '../middlewares/userAuthMiddlewares'
const router = express.Router()

router.post("/login",loginValidation, login)
router.post("/signup", signUpValidation ,signup)

export const userAuthRouter = router;