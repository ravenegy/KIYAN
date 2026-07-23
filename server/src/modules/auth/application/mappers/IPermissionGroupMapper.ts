export interface IPermissionGroupMapper {
  toDto(domainEntity: any): any;
  toDomain(dto: any): any;
}
