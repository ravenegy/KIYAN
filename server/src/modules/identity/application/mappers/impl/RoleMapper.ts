import { IRoleMapper } from '../IRoleMapper';
import { RoleDto } from '../../dto';

export class RoleMapper implements IRoleMapper {
  public toDto(domainEntity: any): any {

    if (!domainEntity) return null as any;
    return {
      id: domainEntity.id?.value || domainEntity.id || '',
      name: domainEntity.name?.value || domainEntity.name || '',
      description: domainEntity.description?.value || domainEntity.description || '',
      permissions: domainEntity.permissions ? domainEntity.permissions.map((p: any) => p.id?.value || p.id) : []
    };
      }

  public toDomain(dto: any): any {

    if (!dto) return null as any;
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      permissions: dto.permissions || []
    } as any;
      }
}
