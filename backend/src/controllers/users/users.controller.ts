import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { AuthUserDto, CreateUserDto, UpdateUserDto } from '../../dtos/users';
import { ApiBearerAuth, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'src/decorators';

@ApiTags('Users')
@Controller()
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  /**
   * Check if user exists and generate token
   * @param createUser 
   * @returns 
   */
  @Post('auth')
  @ApiOperation({ summary: 'Check if user exists and generate token' })
  async auth(@Body() authUserDto: AuthUserDto) {
    const { password } = authUserDto
    const user = await this.usersService.auth(authUserDto)
    if (!user.isActive)
      throw new UnauthorizedException(`The user is deactivated`)
    if (!bcrypt.compareSync(password.toString(), user.password.toString()))
      throw new UnauthorizedException(`The password entered is incorrect`)
    return { token: this.jwtService.sign({ id: user.usrId }), name: user.name, usrId: user.usrId }
  }

  /**
   * Create user and encrypt password
   * @param createUserDto 
   * @returns 
   */
  @Post('user')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto
    return await this.usersService.create({ ...userData, password: bcrypt.hashSync(password, 10) })
  }

  /**
   * Get list of all users
   * @returns 
   */
  @Get('users')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of all users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  /**
   * Get user by user id
   * @param id 
   * @returns 
   */
  @Get('user/:id')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by user id' })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  /**
   * Update user data submitted by user id
   * @param id 
   * @param updateUserDto 
   * @returns 
   */
  @Patch('user/:id')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user data submitted by user id' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  /**
   * Delete user by user id
   * @param id
   */
  @Delete('user/:id')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by user id' })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }

}