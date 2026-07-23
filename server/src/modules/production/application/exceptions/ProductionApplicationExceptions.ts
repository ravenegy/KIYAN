export class ProductionApplicationExceptions {
    static orderNotFound(orderId: string): Error {
        return new Error(`Production order ${orderId} was not found.`);
    }
    
    static invalidCommand(message: string): Error {
        return new Error(`Invalid command: ${message}`);
    }
}
