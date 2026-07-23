import { IPermissionMapper } from '../IPermissionMapper';
import { PermissionDto } from '../../dto';

export class PermissionMapper implements IPermissionMapper {
  public toDto(domainEntity: any): any {

    if (!domainEntity) return null as any;
    return {
      id: domainEntity.id?.value || domainEntity.id || '',
      name: domainEntity.name?.value || domainEntity.name || '',
      code: domainEntity.code?.value || domainEntity.code || '',
      description: domainEntity.description?.value || domainEntity.description || '',
      effect: domainEntity.effect?.toString() || 'ALLOW'
    };
      }

  public toDomain(dto: any): any {

    if (!dto) return null as any;
    return {
      id: dto.id,
      name: dto.name,
      code: dto.code,
      description: dto.description,
      effect: dto.effect
    } as any;
      }
}
