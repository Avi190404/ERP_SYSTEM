import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { signInDto, userDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: userDto) {
    const exsistingRole = await this.prismaService.rolePermission.findUnique({
      where: { role: dto.roleName },
    });
    if (!exsistingRole) {
      throw new ConflictException(`Role: ${dto.roleName} does not exisist`);
    }
    const exsistingUser = await this.prismaService.user.findUnique({
      where: { username: dto.userName },
    });
    if (exsistingUser) {
      throw new ConflictException(`User: ${dto.userName} already exisist`);
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        name: dto.name,
        username: dto.userName,
        password: hashPassword,
        roleName: dto.roleName,
      },
    });

    const payload = {
      id: newUser.id,
      userName: newUser.username,
      role: newUser.roleName,
    };

    const token = await this.jwtService.signAsync(payload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return { ...result, accessToken: token };
  }

  async signIn(dto: signInDto) {
    const user = await this.prismaService.user.findUnique({
      where: { username: dto.userName },
    });

    const validPassword = user
      ? await bcrypt.compare(dto.password, user.password)
      : false;

    if (!user || !validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.roleName,
    };
    const token = await this.jwtService.signAsync(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return { ...result, accessToken: token };
  }
}
