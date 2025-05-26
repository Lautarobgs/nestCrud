import { User } from 'src/users/entities/user.entity';
import { Body, Controller, Get, Post, Req, UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorators/role.decorator';
import { Role } from './enums/role.enum';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request { ///mover a interfaces, no dejar aca
    user: {
        email: string;
        role: string;
    };
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}
    @Post('register')
    register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }   


    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    // @Get('profile')
    // @Roles(Role.USER)
    // @UseGuards(AuthGuard, RolesGuard)
    // profile(
    //     @Req() req: RequestWithUser,
    // ){
    //     return this.authService.profile(req.user);
    // }

    @Get('profile')
    @Auth(Role.USER)
    profile(
        @Req() req: RequestWithUser,
    ){
        return this.authService.profile(req.user);
    }
}
