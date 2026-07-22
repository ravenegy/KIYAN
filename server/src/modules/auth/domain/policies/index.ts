export interface IPolicy<TCtx, TRes> {
  evaluate(context: TCtx): TRes;
}


export class CanAssignRolePolicy implements IPolicy<any, boolean> {
  public evaluate(context: any): boolean {
    return false; // TODO: Implement domain logic
  }
}


export class CanDeleteRolePolicy implements IPolicy<any, boolean> {
  public evaluate(context: any): boolean {
    return false; // TODO: Implement domain logic
  }
}


export class CanGrantPermissionPolicy implements IPolicy<any, boolean> {
  public evaluate(context: any): boolean {
    return false; // TODO: Implement domain logic
  }
}


export class CanRevokePermissionPolicy implements IPolicy<any, boolean> {
  public evaluate(context: any): boolean {
    return false; // TODO: Implement domain logic
  }
}


export class CanManageUsersPolicy implements IPolicy<any, boolean> {
  public evaluate(context: any): boolean {
    return false; // TODO: Implement domain logic
  }
}
