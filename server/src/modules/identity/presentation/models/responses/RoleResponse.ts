export interface RoleResponse {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly permissions: ReadonlyArray<string>;
}
