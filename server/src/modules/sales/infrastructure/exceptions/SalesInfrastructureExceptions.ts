export class SalesInfrastructureException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SalesInfrastructureException';
    }
}

export class DatabaseConnectionException extends SalesInfrastructureException {
    constructor(message: string = 'Failed to connect to the database') {
        super(message);
        this.name = 'DatabaseConnectionException';
    }
}
