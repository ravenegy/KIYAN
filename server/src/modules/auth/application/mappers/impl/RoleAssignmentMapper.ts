import { IRoleAssignmentMapper } from '../IRoleAssignmentMapper';

export class RoleAssignmentMapper implements IRoleAssignmentMapper {
  public toDto(domainEntity: any): any {
    if (!domainEntity) return null as any;
    return {
      id: domainEntity.id?.value || domainEntity.id || '',
    } as any;
  }

  public toDomain(dto: any): any {
    if (!dto) return null as any;
    return {
      id: dto.id,
    } as any;
  }
}
