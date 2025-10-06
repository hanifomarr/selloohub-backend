import { AppDataSource } from "@/data-source"
import { comparePassword, hashPassword } from "@/util/bcrypt.util";
import { generateToken } from "@/util/jwt.util";

const userRepository = AppDataSource.getRepository("User");

class AuthService {

    async Register(data: { email: string, password: string }) {

        const existingUser = await userRepository.findOneBy({ email: data.email })

        if (existingUser) throw new Error('Email already registered ')

        const newUser = userRepository.create({
            email: data.email,
            password: await hashPassword(data.password)
        })

        const savedUser = await userRepository.save(newUser)

        delete savedUser.password

        const token = await generateToken({ id: savedUser.id, email: savedUser.email })

        return { user: savedUser, token }
    }

    async Login(data: { email: string, password: string }) {

        const user = await userRepository.findOneBy({ email: data.email })
        if (!user) throw new Error("Invalid email or password")

        const isPasswordValid = await comparePassword(data.password, user.password)
        if (!isPasswordValid) throw new Error("Invalid email or password")

        delete user.password

        const token = await generateToken({ id: user.id, email: user.email })
        return { user, token }

    }
}

export const authService = new AuthService();