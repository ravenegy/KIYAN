export interface IRoleHierarchyMapper {
  toDto(domainEntity: any): any;
  toDomain(dto: any): any;
}
