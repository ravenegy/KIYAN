export class UpdateOperationStatusCommand {
    constructor(
        public readonly orderId: string,
        public readonly operationId: string,
        public readonly status: string // 'Ready', 'InProgress', 'Completed'
    ) {}
}
