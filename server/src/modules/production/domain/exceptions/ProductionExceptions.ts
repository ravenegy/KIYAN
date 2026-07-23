import { ErrorCode } from '../../../../core/results/ErrorCode';
import { ErrorDetail } from '../../../../core/results/ErrorDetail';

export class ProductionExceptions {
  public static InvalidStatusTransition(currentStatus: string, targetStatus: string): ErrorDetail {
    return {
      code: ErrorCode.BusinessRule,
      message: `Cannot transition from ${currentStatus} to ${targetStatus}.`,
    };
  }

  public static OrderNotReleased(orderId: string): ErrorDetail {
    return {
      code: ErrorCode.BusinessRule,
      message: `Production Order ${orderId} must be in Released status.`,
      target: orderId,
    };
  }

  public static InvalidOperationSequence(operationId: string): ErrorDetail {
    return {
      code: ErrorCode.BusinessRule,
      message: `Operation ${operationId} cannot be started out of sequence.`,
      target: operationId,
    };
  }

  public static ExceedsRequiredQuantity(itemId: string, requested: number, required: number): ErrorDetail {
    return {
      code: ErrorCode.BusinessRule,
      message: `Requested quantity ${requested} exceeds required quantity ${required} for item ${itemId}.`,
      target: itemId,
    };
  }
}
