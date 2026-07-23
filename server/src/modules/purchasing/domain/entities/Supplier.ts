import { SupplierId } from '../shared';
import { SupplierStatus } from '../enums';
import { SupplierQualifiedEvent } from '../events';

export class Supplier {
    private readonly _domainEvents: any[] = [];
    private _status: SupplierStatus = SupplierStatus.Active;
    private _rating: number = 0;

    constructor(
        private readonly _id: SupplierId,
        private _name: string,
        private _contactEmail: string,
        private _qualificationLevel: string = 'Pending'
    ) {}

    get id(): SupplierId { return this._id; }
    get name(): string { return this._name; }
    get contactEmail(): string { return this._contactEmail; }
    get status(): SupplierStatus { return this._status; }
    get qualificationLevel(): string { return this._qualificationLevel; }
    get rating(): number { return this._rating; }
    get domainEvents(): ReadonlyArray<any> { return this._domainEvents; }

    public qualify(level: string): void {
        this._qualificationLevel = level;
        this._domainEvents.push(new SupplierQualifiedEvent(this._id.value, level));
    }

    public updateRating(newRating: number): void {
        if (newRating < 0 || newRating > 5) {
            throw new Error('Rating must be between 0 and 5');
        }
        this._rating = newRating;
    }

    public blacklist(): void {
        this._status = SupplierStatus.Blacklisted;
    }

    public clearDomainEvents(): void {
        this._domainEvents.length = 0;
    }
}
