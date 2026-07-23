export class PurchasingInfrastructureException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PurchasingInfrastructureException';
    }
}

export class PersistenceOperationFailedException extends PurchasingInfrastructureException {
    constructor(operation: string, details: string) {
        super(`Persistence operation '${operation}' failed: ${details}`);
        this.name = 'PersistenceOperationFailedException';
    }
}
