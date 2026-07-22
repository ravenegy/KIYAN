const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'server/src/modules/auth/domain');

const dirs = [
  'entities',
  'value-objects',
  'permissions',
  'roles',
  'policies',
  'specifications',
  'services',
  'events',
  'exceptions',
  'factories'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
});

// Helper for writing files
function write(filePath, content) {
  fs.writeFileSync(path.join(baseDir, filePath), content.trim() + '\n');
}

// 1. Exceptions
write('exceptions/AuthorizationDomainException.ts', `
import { DomainException } from '../../../../core/domain/exceptions/DomainException';

export class AuthorizationDomainException extends DomainException {
  constructor(message: string, code?: string, metadata?: Record<string, unknown>) {
    super(message, code, metadata);
    this.name = 'AuthorizationDomainException';
  }
}
`);

const exceptions = [
  'RoleAlreadyExistsException',
  'RoleNotFoundException',
  'PermissionAlreadyExistsException',
  'PermissionNotFoundException',
  'RoleHierarchyException',
  'PermissionConflictException'
];

exceptions.forEach(exc => {
  write(`exceptions/${exc}.ts`, `
import { AuthorizationDomainException } from './AuthorizationDomainException';

export class ${exc} extends AuthorizationDomainException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, '${exc.toUpperCase().replace(/EXCEPTION$/, '')}', metadata);
    this.name = '${exc}';
  }
}
`);
});

write('exceptions/index.ts', `
export * from './AuthorizationDomainException';
${exceptions.map(e => `export * from './${e}';`).join('\n')}
`);


// 2. Value Objects
const stronglyTypedIds = ['RoleId', 'PermissionId'];
stronglyTypedIds.forEach(id => {
  write(`value-objects/${id}.ts`, `
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';

export class ${id} extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): ${id} {
    if (!value || value.trim().length === 0) {
      throw new Error('${id} cannot be empty');
    }
    return new ${id}(value);
  }
}
`);
});

const stringValueObjects = [
  'PermissionCode', 'RoleCode', 'RoleName', 'PermissionName', 
  'PermissionScope', 'PermissionCategory', 'PermissionDescription'
];

stringValueObjects.forEach(vo => {
  write(`value-objects/${vo}.ts`, `
import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface ${vo}Props {
  value: string;
}

export class ${vo} extends ValueObject<${vo}Props> {
  private constructor(props: ${vo}Props) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): ${vo} {
    if (!value || value.trim().length === 0) {
      throw new Error('${vo} cannot be empty');
    }
    return new ${vo}({ value });
  }
}
`);
});

write('value-objects/index.ts', `
${stronglyTypedIds.map(e => `export * from './${e}';`).join('\n')}
${stringValueObjects.map(e => `export * from './${e}';`).join('\n')}
`);


// 3. Events
const events = [
  'RoleCreated', 'RoleUpdated', 'RoleDeleted',
  'PermissionCreated', 'PermissionUpdated', 'PermissionDeleted',
  'PermissionGranted', 'PermissionRevoked',
  'RoleAssigned', 'RoleUnassigned', 'HierarchyChanged'
];

events.forEach(ev => {
  write(`events/${ev}.ts`, `
import { IDomainEvent } from '../../../../core/domain/events/IDomainEvent';

export class ${ev} implements IDomainEvent {
  public readonly occurredOn: Date;
  
  constructor(public readonly aggregateId: string, public readonly payload: Record<string, unknown> = {}) {
    this.occurredOn = new Date();
  }
}
`);
});

write('events/index.ts', `
${events.map(e => `export * from './${e}';`).join('\n')}
`);


// 4. Entities
write('entities/Permission.ts', `
import { Entity } from '../../../../core/domain/entities/Entity';
import { PermissionId } from '../value-objects/PermissionId';
import { PermissionName } from '../value-objects/PermissionName';
import { PermissionCode } from '../value-objects/PermissionCode';
import { PermissionCategory } from '../value-objects/PermissionCategory';
import { PermissionDescription } from '../value-objects/PermissionDescription';

export class Permission extends Entity<PermissionId> {
  private constructor(
    id: PermissionId,
    private _name: PermissionName,
    private _code: PermissionCode,
    private _category: PermissionCategory,
    private _description?: PermissionDescription
  ) {
    super(id);
  }

  public get name(): PermissionName { return this._name; }
  public get code(): PermissionCode { return this._code; }
  public get category(): PermissionCategory { return this._category; }
  public get description(): PermissionDescription | undefined { return this._description; }

  public static create(
    id: PermissionId,
    name: PermissionName,
    code: PermissionCode,
    category: PermissionCategory,
    description?: PermissionDescription
  ): Permission {
    return new Permission(id, name, code, category, description);
  }
}
`);

write('entities/Role.ts', `
import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { RoleId } from '../value-objects/RoleId';
import { RoleName } from '../value-objects/RoleName';
import { RoleCode } from '../value-objects/RoleCode';

export class Role extends AggregateRoot<RoleId> {
  private constructor(
    id: RoleId,
    private _name: RoleName,
    private _code: RoleCode,
    private _isActive: boolean = true
  ) {
    super(id);
  }

  public get name(): RoleName { return this._name; }
  public get code(): RoleCode { return this._code; }
  public get isActive(): boolean { return this._isActive; }

  public static create(id: RoleId, name: RoleName, code: RoleCode): Role {
    return new Role(id, name, code, true);
  }

  public deactivate(): void {
    this._isActive = false;
  }

  public activate(): void {
    this._isActive = true;
  }
}
`);

write('entities/PermissionGroup.ts', `
import { Entity } from '../../../../core/domain/entities/Entity';
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { PermissionId } from '../value-objects/PermissionId';

export class PermissionGroupId extends StronglyTypedId<string> {
  private constructor(value: string) { super(value); }
  public static create(value: string): PermissionGroupId { return new PermissionGroupId(value); }
}

export class PermissionGroup extends Entity<PermissionGroupId> {
  private _permissions: Set<string> = new Set();
  
  private constructor(id: PermissionGroupId, private _name: string) {
    super(id);
  }

  public get name(): string { return this._name; }
  public get permissions(): ReadonlyArray<string> { return Array.from(this._permissions); }

  public static create(id: PermissionGroupId, name: string): PermissionGroup {
    return new PermissionGroup(id, name);
  }

  public addPermission(permissionId: PermissionId): void {
    this._permissions.add(permissionId.value);
  }
}
`);

write('entities/RoleAssignment.ts', `
import { Entity } from '../../../../core/domain/entities/Entity';
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { RoleId } from '../value-objects/RoleId';

export class RoleAssignmentId extends StronglyTypedId<string> {
  private constructor(value: string) { super(value); }
  public static create(value: string): RoleAssignmentId { return new RoleAssignmentId(value); }
}

export class RoleAssignment extends Entity<RoleAssignmentId> {
  private constructor(
    id: RoleAssignmentId,
    private _roleId: RoleId,
    private _assigneeId: string,
    private _assignedAt: Date
  ) {
    super(id);
  }

  public get roleId(): RoleId { return this._roleId; }
  public get assigneeId(): string { return this._assigneeId; }
  public get assignedAt(): Date { return this._assignedAt; }

  public static create(id: RoleAssignmentId, roleId: RoleId, assigneeId: string): RoleAssignment {
    return new RoleAssignment(id, roleId, assigneeId, new Date());
  }
}
`);

write('entities/PermissionAssignment.ts', `
import { Entity } from '../../../../core/domain/entities/Entity';
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { PermissionId } from '../value-objects/PermissionId';

export class PermissionAssignmentId extends StronglyTypedId<string> {
  private constructor(value: string) { super(value); }
  public static create(value: string): PermissionAssignmentId { return new PermissionAssignmentId(value); }
}

export class PermissionAssignment extends Entity<PermissionAssignmentId> {
  private constructor(
    id: PermissionAssignmentId,
    private _permissionId: PermissionId,
    private _assigneeId: string,
    private _isGranted: boolean
  ) {
    super(id);
  }

  public get permissionId(): PermissionId { return this._permissionId; }
  public get assigneeId(): string { return this._assigneeId; }
  public get isGranted(): boolean { return this._isGranted; }

  public static create(id: PermissionAssignmentId, permissionId: PermissionId, assigneeId: string, isGranted: boolean): PermissionAssignment {
    return new PermissionAssignment(id, permissionId, assigneeId, isGranted);
  }
}
`);

write('entities/RoleHierarchy.ts', `
import { Entity } from '../../../../core/domain/entities/Entity';
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { RoleId } from '../value-objects/RoleId';
import { RoleHierarchyException } from '../exceptions/RoleHierarchyException';

export class RoleHierarchyId extends StronglyTypedId<string> {
  private constructor(value: string) { super(value); }
  public static create(value: string): RoleHierarchyId { return new RoleHierarchyId(value); }
}

export class RoleHierarchy extends Entity<RoleHierarchyId> {
  private constructor(
    id: RoleHierarchyId,
    private _parentRoleId: RoleId,
    private _childRoleId: RoleId
  ) {
    super(id);
  }

  public get parentRoleId(): RoleId { return this._parentRoleId; }
  public get childRoleId(): RoleId { return this._childRoleId; }

  public static create(id: RoleHierarchyId, parentRoleId: RoleId, childRoleId: RoleId): RoleHierarchy {
    if (parentRoleId.equals(childRoleId)) {
      throw new RoleHierarchyException('A role cannot be its own parent.');
    }
    return new RoleHierarchy(id, parentRoleId, childRoleId);
  }
}
`);

write('entities/index.ts', `
export * from './Permission';
export * from './Role';
export * from './PermissionGroup';
export * from './RoleAssignment';
export * from './PermissionAssignment';
export * from './RoleHierarchy';
`);

// 5. Specifications
const specifications = [
  'RoleIsActiveSpecification',
  'PermissionBelongsToCategorySpecification',
  'RoleCanAssignRoleSpecification',
  'PermissionIsGrantedSpecification',
  'PermissionIsDeniedSpecification'
];

write('specifications/index.ts', `
export interface ISpecification<T> {
  isSatisfiedBy(candidate: T): boolean;
}

${specifications.map(s => `
export class ${s} implements ISpecification<any> {
  public isSatisfiedBy(candidate: any): boolean {
    return true; // TODO: Implement domain logic
  }
}
`).join('\n')}
`);

// 6. Policies
const policies = [
  'CanAssignRolePolicy',
  'CanDeleteRolePolicy',
  'CanGrantPermissionPolicy',
  'CanRevokePermissionPolicy',
  'CanManageUsersPolicy'
];

write('policies/index.ts', `
export interface IPolicy<TCtx, TRes> {
  evaluate(context: TCtx): TRes;
}

${policies.map(p => `
export class ${p} implements IPolicy<any, boolean> {
  public evaluate(context: any): boolean {
    return false; // TODO: Implement domain logic
  }
}
`).join('\n')}
`);

// 7. Domain Services
const services = [
  'RoleAuthorizationService',
  'PermissionResolver',
  'EffectivePermissionCalculator',
  'RoleHierarchyResolver',
  'PermissionConflictResolver',
  'AuthorizationPolicyEvaluator'
];

write('services/index.ts', `
${services.map(s => `
export interface I${s} {
  // Domain behavior definition
}

export class ${s} implements I${s} {
  // Implement pure domain logic here
}
`).join('\n')}
`);

// 8. Factories
const factories = [
  'RoleFactory',
  'PermissionFactory',
  'RoleAssignmentFactory',
  'PermissionFactoryBase'
];

write('factories/index.ts', `
${factories.map(f => `
export class ${f} {
  // Factory methods
}
`).join('\n')}
`);

// empty permissions and roles exports
write('permissions/index.ts', `// Space for specific permission sets`);
write('roles/index.ts', `// Space for specific roles sets`);

write('index.ts', `
export * from './entities';
export * from './events';
export * from './exceptions';
export * from './factories';
export * from './policies';
export * from './services';
export * from './specifications';
export * from './value-objects';
`);

