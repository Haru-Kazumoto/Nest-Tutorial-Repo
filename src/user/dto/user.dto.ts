import { IsNotEmpty, IsEmail } from "class-validator";
 
export class UserDto{
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    age: number;

    constructor() {}
}