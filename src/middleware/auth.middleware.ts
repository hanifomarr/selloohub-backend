import { verifyToken } from "@/util/jwt.util"
import { NextFunction, Request, Response } from "express"

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: "Unauthorize" })

    const token = authHeader.split("")[1]
    try {
        const decode = verifyToken(token)
        req.user = decode
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid" })

    }

}