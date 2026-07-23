export interface IPermissionMapper {
  toDto(domainEntity: any): any;
  toDomain(dto: any): any;
}
