export interface ISpecification<T> {
  isSatisfiedBy(candidate: T): boolean;
}


export class RoleIsActiveSpecification implements ISpecification<any> {
  public isSatisfiedBy(candidate: any): boolean {
    return true; // TODO: Implement domain logic
  }
}


export class PermissionBelongsToCategorySpecification implements ISpecification<any> {
  public isSatisfiedBy(candidate: any): boolean {
    return true; // TODO: Implement domain logic
  }
}


export class RoleCanAssignRoleSpecification implements ISpecification<any> {
  public isSatisfiedBy(candidate: any): boolean {
    return true; // TODO: Implement domain logic
  }
}


export class PermissionIsGrantedSpecification implements ISpecification<any> {
  public isSatisfiedBy(candidate: any): boolean {
    return true; // TODO: Implement domain logic
  }
}


export class PermissionIsDeniedSpecification implements ISpecification<any> {
  public isSatisfiedBy(candidate: any): boolean {
    return true; // TODO: Implement domain logic
  }
}
