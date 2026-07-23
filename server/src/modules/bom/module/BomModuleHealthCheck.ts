import { IHealthCheck, IHealthCheckResult, HealthStatus } from '../../../core/health';

export class BomModuleHealthCheck implements IHealthCheck {
  public readonly name = 'BomModule';

  public async check(): Promise<IHealthCheckResult> {
    return {
      name: this.name,
      status: HealthStatus.Healthy,
      timestamp: new Date()
    };
  }
}
