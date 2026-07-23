export class ReceiveFinishedGoodsCommand {
    constructor(
        public readonly orderId: string,
        public readonly itemId: string,
        public readonly quantity: number
    ) {}
}
