import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/entities/user.entity';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>
    ) {

        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    /**
     * Validate user token
     * @param payload 
     * @returns 
     */
    async validate(payload: JwtPayload): Promise<Users> {
        const { id } = payload, user = await this.usersRepository.findOneBy({ usrId: id })
        if (!user)
            throw new UnauthorizedException('Token not valid')
        if (!user.isActive)
            throw new UnauthorizedException('User is inactive, talk with an admin');
        return user
    }

}