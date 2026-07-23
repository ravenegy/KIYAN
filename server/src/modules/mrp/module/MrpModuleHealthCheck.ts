import { IHealthCheck, IHealthCheckResult, HealthStatus } from '../../../core/health';

export class MrpModuleHealthCheck implements IHealthCheck {
  public readonly name = 'MrpModule';

  public async check(): Promise<IHealthCheckResult> {
    return {
      name: this.name,
      status: HealthStatus.Healthy,
      timestamp: new Date()
    };
  }
}
