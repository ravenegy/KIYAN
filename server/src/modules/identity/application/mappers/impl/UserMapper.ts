import { IUserMapper } from '../IUserMapper';
import { UserDto } from '../../dto';

export class UserMapper implements IUserMapper {
  public toDto(domainEntity: any): any {

    if (!domainEntity) return null as any;
    return {
      id: domainEntity.id?.value || domainEntity.id || '',
      username: domainEntity.username?.value || domainEntity.username || '',
      email: domainEntity.emailAddress?.value || domainEntity.emailAddress || '',
      status: domainEntity.status?.toString() || 'UNKNOWN',
      roles: domainEntity.roles ? domainEntity.roles.map((r: any) => r.id?.value || r.id) : [],
      permissions: domainEntity.permissions ? domainEntity.permissions.map((p: any) => p.id?.value || p.id) : [],
      lastLoginAt: domainEntity.lastLoginAt,
      createdAt: domainEntity.createdAt || new Date()
    };
      }

  public toDomain(dto: any): any {

    if (!dto) return null as any;
    // Basic mapping without complex ValueObject instantiation
    return {
      id: dto.id,
      username: dto.username,
      emailAddress: dto.email,
      status: dto.status,
      roles: dto.roles || [],
      permissions: dto.permissions || [],
      createdAt: dto.createdAt,
      lastLoginAt: dto.lastLoginAt
    } as any;
      }
}
