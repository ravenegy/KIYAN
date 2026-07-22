export enum HealthStatus {
  Healthy = "Healthy",
  Degraded = "Degraded",
  Unhealthy = "Unhealthy",
}

export interface IHealthCheckResult {
  name: string;
  status: HealthStatus;
  message?: string;
  error?: Error;
  timestamp: Date;
}

export interface IHealthCheck {
  name: string;
  check(): Promise<IHealthCheckResult>;
}

export interface IHealthReport {
  status: HealthStatus;
  totalDurationMs: number;
  results: IHealthCheckResult[];
  timestamp: Date;
}

export interface IHealthRegistry {
  registerLivenessCheck(check: IHealthCheck): void;
  registerReadinessCheck(check: IHealthCheck): void;
  registerStartupCheck(check: IHealthCheck): void;
  checkLiveness(): Promise<IHealthReport>;
  checkReadiness(): Promise<IHealthReport>;
  checkStartup(): Promise<IHealthReport>;
}

export class HealthRegistry implements IHealthRegistry {
  private livenessChecks: IHealthCheck[] = [];
  private readinessChecks: IHealthCheck[] = [];
  private startupChecks: IHealthCheck[] = [];

  public registerLivenessCheck(check: IHealthCheck): void {
    this.livenessChecks.push(check);
  }

  public registerReadinessCheck(check: IHealthCheck): void {
    this.readinessChecks.push(check);
  }

  public registerStartupCheck(check: IHealthCheck): void {
    this.startupChecks.push(check);
  }

  public async checkLiveness(): Promise<IHealthReport> {
    return this.executeChecks(this.livenessChecks);
  }

  public async checkReadiness(): Promise<IHealthReport> {
    return this.executeChecks(this.readinessChecks);
  }

  public async checkStartup(): Promise<IHealthReport> {
    return this.executeChecks(this.startupChecks);
  }

  private async executeChecks(checks: IHealthCheck[]): Promise<IHealthReport> {
    const startTime = Date.now();
    const results: IHealthCheckResult[] = [];
    let overallStatus = HealthStatus.Healthy;

    for (const check of checks) {
      try {
        const result = await check.check();
        results.push(result);
        if (result.status === HealthStatus.Unhealthy) {
          overallStatus = HealthStatus.Unhealthy;
        } else if (result.status === HealthStatus.Degraded && overallStatus === HealthStatus.Healthy) {
          overallStatus = HealthStatus.Degraded;
        }
      } catch (error) {
        overallStatus = HealthStatus.Unhealthy;
        results.push({
          name: check.name,
          status: HealthStatus.Unhealthy,
          error: error instanceof Error ? error : new Error(String(error)),
          timestamp: new Date(),
        });
      }
    }

    const totalDurationMs = Date.now() - startTime;

    return {
      status: overallStatus,
      totalDurationMs,
      results,
      timestamp: new Date(),
    };
  }
}
