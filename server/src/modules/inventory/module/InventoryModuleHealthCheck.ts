import { IHealthCheck, IHealthCheckResult, HealthStatus } from '../../../core/health';

export class InventoryModuleHealthCheck implements IHealthCheck {
  public readonly name = 'InventoryModule';

  public async check(): Promise<IHealthCheckResult> {
    return {
      name: this.name,
      status: HealthStatus.Healthy,
      timestamp: new Date()
    };
  }
}
