import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthUserDto, CreateUserDto, UpdateUserDto } from '../../dtos/users';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) { }

  /**
   * Auth user by username and password
   * @param authUserDto 
   * @returns 
   */
  async auth(authUserDto: AuthUserDto) {
    const { username } = authUserDto
    const user: Users = await this.usersRepository.findOneBy({ username: username })
    if (!user) throw new UnauthorizedException(`This username does not exist`)
    return user
  }

  /**
   * Create the new user and validate that the username is unique
   * @param createUserDto 
   * @returns 
   */
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.usersRepository.save(createUserDto);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") throw new BadRequestException(`there is already a user with this username ${createUserDto.username}`)
      throw new InternalServerErrorException(`Can't create User - Check server logs`)
    }
  }

  /**
   * Get user list
   * @returns 
   */
  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  /**
   * Gets the user by id, if the user is not found it returns the error
   * @param id 
   * @returns 
   */
  async findOne(id: number): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ usrId: id })
    if (!user) throw new NotFoundException(`User with user id "${id}" not found`)
    return user
  }

  /**
   * Update the username with the data provided and check if the username exists, if not, show the error
   * @param id 
   * @param updateUserDto 
   * @returns 
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.preload({ usrId: id, ...updateUserDto })
      if (!user) throw new NotFoundException(`User with user id ${id} not found`)
      await this.usersRepository.save(user)
      delete user.password
      return user
    } catch (error) {
      throw new NotFoundException(`User with user id "${id}" not found`)
    }
  }

  /**
   * Delete the user and check if it exists, if it doesn't it returns the error
   * @param id 
   */
  async remove(id: number) {
    if (await this.findOne(id)) await this.usersRepository.delete(id);
  }
}
