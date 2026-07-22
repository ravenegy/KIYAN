export interface IRoleMapper {
  toDto(domainEntity: any): any;
  toDomain(dto: any): any;
}
