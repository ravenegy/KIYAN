export interface IUserMapper {
  toDto(domainEntity: any): any;
  toDomain(dto: any): any;
}
