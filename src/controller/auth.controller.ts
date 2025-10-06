import { LoginDto } from "@/dto/auth/login-user.dto";
import { RegisterDto } from "@/dto/auth/register-user.dto";
import { authService } from "@/service/auth.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {

    const registerDto = plainToInstance(RegisterDto, req.body)
    const error = await validate(registerDto)

    if (error.length > 0) {

        const formatedError = error.map(err => {
            return Object.values(err.constraints || {})
        }).flat()

        return res.status(400).json({ status: "error", error: formatedError })
    }

    try {
        const result = await authService.Register(registerDto);
        res.status(201).json(result)
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {

    const loginDto = plainToInstance(LoginDto, req.body)
    const error = await validate(loginDto)
    if (error.length > 0) {
        const formatedError = error.map(err => {
            return Object.values(err.constraints || {})
        }).flat()
        return res.status(400).json({ status: "error", error: formatedError })
    }

    try {
        const result = await authService.Login(req.body)
        res.status(201).json(result)
    } catch (error: any) {
        res.status(401).json({ message: error.message })

    }
}
