import { IHealthCheck, IHealthCheckResult, HealthStatus } from '../../../core/health';

export class PurchasingModuleHealthCheck implements IHealthCheck {
  public readonly name = 'PurchasingModule';

  public async check(): Promise<IHealthCheckResult> {
    return {
      name: this.name,
      status: HealthStatus.Healthy,
      timestamp: new Date()
    };
  }
}
