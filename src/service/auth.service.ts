import { AppDataSource } from "@/data-source"
import { hashPassword } from "@/util/bcrypt.util";
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
}

export const authService = new AuthService();