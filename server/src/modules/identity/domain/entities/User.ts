import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { UserId } from '../value-objects/UserId';
import { Username } from '../value-objects/Username';
import { EmailAddress } from '../value-objects/EmailAddress';
import { PasswordHash } from '../value-objects/PasswordHash';
import { UserStatus } from '../enums/UserStatus';
import { Role } from './Role';
import { Claim } from './Claim';
import { Permission } from './Permission';
import { IdentityException } from '../exceptions/IdentityException';
import { IdentityConstants } from '../shared/IdentityConstants';

export class User extends AggregateRoot<UserId> {
  private _username: Username;
  private _emailAddress: EmailAddress;
  private _passwordHash: PasswordHash;
  private _status: UserStatus;
  private _roles: Role[];
  private _claims: Claim[];
  private _permissions: Permission[];
  
  private _lastLoginAt?: Date;
  private _passwordChangedAt?: Date;
  private _failedLoginAttempts: number;
  private _lockoutUntil?: Date;

  private constructor(
    id: UserId,
    username: Username,
    emailAddress: EmailAddress,
    passwordHash: PasswordHash,
    status: UserStatus,
    roles: Role[] = [],
    claims: Claim[] = [],
    permissions: Permission[] = [],
    createdAt?: Date,
    version?: number,
    lastLoginAt?: Date,
    passwordChangedAt?: Date,
    failedLoginAttempts: number = 0,
    lockoutUntil?: Date
  ) {
    super(id, createdAt, version);
    this._username = username;
    this._emailAddress = emailAddress;
    this._passwordHash = passwordHash;
    this._status = status;
    this._roles = [...roles];
    this._claims = [...claims];
    this._permissions = [...permissions];
    this._lastLoginAt = lastLoginAt;
    this._passwordChangedAt = passwordChangedAt;
    this._failedLoginAttempts = failedLoginAttempts;
    this._lockoutUntil = lockoutUntil;
  }

  // Getters
  public get username(): Username { return this._username; }
  public get emailAddress(): EmailAddress { return this._emailAddress; }
  public get passwordHash(): PasswordHash { return this._passwordHash; }
  public get status(): UserStatus { return this._status; }
  public get roles(): ReadonlyArray<Role> { return Object.freeze([...this._roles]); }
  public get claims(): ReadonlyArray<Claim> { return Object.freeze([...this._claims]); }
  public get permissions(): ReadonlyArray<Permission> { return Object.freeze([...this._permissions]); }
  public get lastLoginAt(): Date | undefined { return this._lastLoginAt; }
  public get passwordChangedAt(): Date | undefined { return this._passwordChangedAt; }
  public get failedLoginAttempts(): number { return this._failedLoginAttempts; }
  public get lockoutUntil(): Date | undefined { return this._lockoutUntil; }

  public static create(
    id: UserId,
    username: Username,
    emailAddress: EmailAddress,
    passwordHash: PasswordHash
  ): User {
    if (!username) throw new IdentityException('Username cannot be null');
    if (!emailAddress) throw new IdentityException('EmailAddress cannot be null');
    if (!passwordHash) throw new IdentityException('PasswordHash cannot be null');

    return new User(id, username, emailAddress, passwordHash, UserStatus.PENDING_VERIFICATION);
  }

  // Behavioral Methods
  public activate(): void {
    if (this._status === UserStatus.ACTIVE) {
      throw new IdentityException('User is already active');
    }
    this._status = UserStatus.ACTIVE;
  }

  public deactivate(): void {
    if (this._status === UserStatus.INACTIVE) {
      throw new IdentityException('User is already inactive');
    }
    this._status = UserStatus.INACTIVE;
  }

  public lock(until?: Date): void {
    this._status = UserStatus.LOCKED;
    if (until) {
      this._lockoutUntil = until;
    } else {
      const defaultLockout = new Date();
      defaultLockout.setMinutes(defaultLockout.getMinutes() + IdentityConstants.LOCKOUT_DURATION_MINUTES);
      this._lockoutUntil = defaultLockout;
    }
  }

  public unlock(): void {
    if (this._status !== UserStatus.LOCKED) {
      throw new IdentityException('User is not locked');
    }
    this._status = UserStatus.ACTIVE;
    this._lockoutUntil = undefined;
    this._failedLoginAttempts = 0;
  }

  public changePassword(newPasswordHash: PasswordHash): void {
    if (!newPasswordHash) {
      throw new IdentityException('New password hash cannot be null');
    }
    this._passwordHash = newPasswordHash;
    this._passwordChangedAt = new Date();
  }

  public changeEmail(newEmail: EmailAddress): void {
    if (!newEmail) {
      throw new IdentityException('New email address cannot be null');
    }
    this._emailAddress = newEmail;
    this._status = UserStatus.PENDING_VERIFICATION; // require re-verification
  }

  public changeUsername(newUsername: Username): void {
    if (!newUsername) {
      throw new IdentityException('New username cannot be null');
    }
    this._username = newUsername;
  }

  public assignRole(role: Role): void {
    if (!role) throw new IdentityException('Role cannot be null');
    const exists = this._roles.some((r) => r.equals(role));
    if (!exists) {
      this._roles.push(role);
    }
  }

  public removeRole(role: Role): void {
    if (!role) throw new IdentityException('Role cannot be null');
    this._roles = this._roles.filter((r) => !r.equals(role));
  }

  public grantPermission(permission: Permission): void {
    if (!permission) throw new IdentityException('Permission cannot be null');
    const exists = this._permissions.some((p) => p.equals(permission));
    if (!exists) {
      this._permissions.push(permission);
    }
  }

  public revokePermission(permission: Permission): void {
    if (!permission) throw new IdentityException('Permission cannot be null');
    this._permissions = this._permissions.filter((p) => !p.equals(permission));
  }

  public addClaim(claim: Claim): void {
    if (!claim) throw new IdentityException('Claim cannot be null');
    const exists = this._claims.some((c) => c.equals(claim));
    if (!exists) {
      this._claims.push(claim);
    }
  }

  public removeClaim(claim: Claim): void {
    if (!claim) throw new IdentityException('Claim cannot be null');
    this._claims = this._claims.filter((c) => !c.equals(claim));
  }

  public recordSuccessfulLogin(): void {
    if (this._status === UserStatus.LOCKED) {
      if (this._lockoutUntil && this._lockoutUntil > new Date()) {
        throw new IdentityException('Cannot login. User is currently locked.');
      } else {
        // Lockout expired, unlock automatically
        this.unlock();
      }
    }
    
    this._failedLoginAttempts = 0;
    this._lastLoginAt = new Date();
  }

  public recordFailedLogin(): void {
    this._failedLoginAttempts += 1;
    if (this._failedLoginAttempts >= IdentityConstants.MAX_FAILED_LOGIN_ATTEMPTS) {
      this.lock();
    }
  }

  public clearFailedAttempts(): void {
    this._failedLoginAttempts = 0;
  }
}
