import { authService } from "@/service/auth.service";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    try {
        const result = await authService.Register(req.body);
        res.status(201).json(result)
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.Login(req.body)
        res.status(201).json(result)
    } catch (error: any) {
        res.status(401).json({ message: error.message })

    }
}
