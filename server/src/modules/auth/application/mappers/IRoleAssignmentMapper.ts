export interface IRoleAssignmentMapper {
  toDto(domainEntity: any): any;
  toDomain(dto: any): any;
}
