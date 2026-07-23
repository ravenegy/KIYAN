export class AddOperationCommand {
    constructor(
        public readonly orderId: string,
        public readonly sequence: number,
        public readonly name: string,
        public readonly workCenterId: string,
        public readonly setupTimeMinutes: number,
        public readonly runTimeMinutes: number
    ) {}
}
