import { register } from "@/controller/auth.controller";
import { Router } from "express";

const router = Router()

router.post("/register", register)

export default router;