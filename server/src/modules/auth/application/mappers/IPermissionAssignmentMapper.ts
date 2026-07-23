export interface IPermissionAssignmentMapper {
  toDto(domainEntity: any): any;
  toDomain(dto: any): any;
}
