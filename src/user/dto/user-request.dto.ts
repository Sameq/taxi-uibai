import { Expose } from "class-transformer";

export class GetUserRequestDto {
    @Expose()
    name: string;
    @Expose()
    cpf: string;
    @Expose()
    numberPhone: string;
}