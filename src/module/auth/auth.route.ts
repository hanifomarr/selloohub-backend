import { login, register } from "@/module/auth/auth.controller";
import { Router } from "express";

const router = Router()

router.post("/register", register)
router.post("/login", login)

export default router;