import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) { }

  async executeSeed() {
    const usr = await this.usersRepository.findOne({ where: { username: "admin" } })
    if (usr) return { message: "The user admin was already created" }
    return await this.usersRepository.save({
      name: "Luis Cruz",
      username: "admin",
      password: bcrypt.hashSync("Admin123", 10)
    })
  }
}
