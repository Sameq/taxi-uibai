import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserRequestDto } from './dto/user-request.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{message: string}> {
    try {
      if(await this.userRepository.findOne({ where: { cpf: createUserDto.cpf } })) {
        throw new ConflictException('CPF já cadastrado!');
      }
        const user = await this.userRepository.create(createUserDto);
        await this.userRepository.save(user)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar usuário.', error.message);
    }
    return {message: 'Usuário criado com sucesso!'};
  }

 async findAllUsers(): Promise<GetUserRequestDto[]> {
  const users = await this.userRepository.find({select: ['name', 'cpf', 'numberPhone']});

  return plainToInstance(GetUserRequestDto, users, {
    excludeExtraneousValues: true,
  });
}

  async findOneUser(id: string): Promise<GetUserRequestDto[]> {
    const user = await this.userRepository.findOne({ where: { id }, select: ['name', 'cpf', 'numberPhone'] });
    if (!user) {
      throw new InternalServerErrorException('Usuário não encontrado.');
    }
    return plainToInstance(GetUserRequestDto, [user], {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{message: string }> {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new InternalServerErrorException('Usuário não encontrado para atualização.');
    }
    await this.userRepository.create({
      cpf: updateUserDto.cpf ?? user.cpf,
      name: updateUserDto.name ?? user.name,
      password: updateUserDto.password ?? user.password,
    });
     await this.userRepository.save(user);
    return {message: 'Usuário atualizado com sucesso!'};
  }

  async removeUser(id: string): Promise<{message: string}> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new InternalServerErrorException('Usuário não encontrado.');
    }
    return {message: 'Usuário removido com sucesso!'};
  }
}
