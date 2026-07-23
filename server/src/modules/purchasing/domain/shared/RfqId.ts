export class RfqId {
    constructor(public readonly value: string) {
        if (!value) throw new Error('RfqId cannot be empty');
    }
}
