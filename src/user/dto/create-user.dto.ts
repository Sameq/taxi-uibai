import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: "Nome não pode ser vazio!"})
    @IsString({message: "Não é permitido o uso de números!"})
    name: string;

    @IsNotEmpty({message: "CPF is required"})
    cpf: string;

    @IsNotEmpty({message: "Senha é obrigatória!"})
    password: string;

    @IsNumber({}, {message: "Número de telefone deve conter apenas números!"})
    @IsNotEmpty({message: "Número de telefone é obrigatório!"})
    numberPhone: string;
}
