import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @Length(6, 20)
    password!: string
}
