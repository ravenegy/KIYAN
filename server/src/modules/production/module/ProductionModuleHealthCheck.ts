import { IHealthCheck, IHealthCheckResult, HealthStatus } from '../../../core/health';

export class ProductionModuleHealthCheck implements IHealthCheck {
  public readonly name = 'ProductionModule';

  public async check(): Promise<IHealthCheckResult> {
    return {
      name: this.name,
      status: HealthStatus.Healthy,
      timestamp: new Date()
    };
  }
}
