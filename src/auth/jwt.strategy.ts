import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "./auth.service";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'My-very-secret-pass',
        });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.usersService.findUserById(payload.sub);
        user.password = undefined;
        return user;
    }
}