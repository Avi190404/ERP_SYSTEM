import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { roleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}

  async getAllRoles() {
    const roles = await this.prismaService.rolePermission.findMany();
    if (roles.length === 0) {
      throw new ConflictException(`No Role Exists! Please create role first`);
    }
    return { roles: roles };
  }

  async getRole(id: string) {
    const role = await this.prismaService.rolePermission.findUnique({
      where: { id: id },
    });
    if (!role) {
      throw new NotFoundException(`Role does not exist`);
    }

    return { role: role };
  }

  async createRole(dto: roleDto) {
    const existingRole = await this.prismaService.rolePermission.findUnique({
      where: { role: dto.roleName },
    });
    if (existingRole) {
      throw new ConflictException(`Role: ${dto.roleName} already exists`);
    }

    const newRole = await this.prismaService.rolePermission.create({
      data: {
        role: dto.roleName,
        permissions: dto.permissions,
      },
    });

    return { message: 'Role created successfully', data: newRole };
  }

  async updateRole(id: string, dto: roleDto) {
    const role = await this.prismaService.rolePermission.findUnique({
      where: { id: id },
    });
    if (!role) {
      throw new ConflictException(`Role: ${dto.roleName} does not exisist`);
    }

    const updatedRole = await this.prismaService.rolePermission.update({
      where: { id: id },
      data: {
        permissions: dto.permissions,
      },
    });

    return { message: 'Role Updated Successfull', Role: updatedRole };
  }
}
