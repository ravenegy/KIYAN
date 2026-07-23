export interface PurchaseOrderLinePersistenceModel {
    id: string;
    itemId: string;
    quantity: number;
    unitPrice: number;
    expectedDeliveryDate: Date;
    receivedQuantity: number;
}
