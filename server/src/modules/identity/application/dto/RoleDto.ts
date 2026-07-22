export interface RoleDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly permissions: ReadonlyArray<string>;
}
