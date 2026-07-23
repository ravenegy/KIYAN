import { IContainer, Container, Token, Lifetime } from "../di";
import { IEnvironment, Environment } from "../environment";
import { IConfiguration, Configuration } from "../config";
import { IFeatureRegistry, FeatureRegistry } from "../features";
import { IHealthRegistry, HealthRegistry } from "../health";
import { 
  IMediator, Mediator, 
  ICommandBus, CommandBus, 
  IQueryBus, QueryBus, 
  INotificationBus, NotificationBus 
} from "../mediator";
import { IRequestContextAccessor, RequestContextAccessor } from "../context";
import { z } from "zod";

export const CoreTokens = {
  Environment: new Token<IEnvironment>("IEnvironment"),
  Configuration: new Token<IConfiguration<unknown>>("IConfiguration"),
  FeatureRegistry: new Token<IFeatureRegistry>("IFeatureRegistry"),
  HealthRegistry: new Token<IHealthRegistry>("IHealthRegistry"),
  Mediator: new Token<IMediator>("IMediator"),
  CommandBus: new Token<ICommandBus>("ICommandBus"),
  QueryBus: new Token<IQueryBus>("IQueryBus"),
  NotificationBus: new Token<INotificationBus>("INotificationBus"),
  RequestContextAccessor: new Token<IRequestContextAccessor>("IRequestContextAccessor"),
};

export interface BootstrapperOptions<TConfig> {
  configSchema: z.ZodType<TConfig>;
  configSource?: unknown;
  environment?: NodeJS.ProcessEnv;
}

export class Bootstrapper {
  private readonly container: IContainer;
  private isReady: boolean = false;

  constructor() {
    this.container = new Container();
  }

  public bootstrap<TConfig>(options: BootstrapperOptions<TConfig>): IContainer {
    if (this.isReady) {
      throw new Error("Application is already bootstrapped.");
    }

    // 1. Environment
    const env = new Environment(options.environment || process.env);
    this.container.registerInstance(CoreTokens.Environment, env);

    // 2. Configuration
    const configSource = options.configSource || process.env;
    const config = new Configuration<TConfig>(options.configSchema, configSource);
    this.container.registerInstance(CoreTokens.Configuration, config as IConfiguration<unknown>);
    
    // 3. Feature Registry
    const featureRegistry = new FeatureRegistry();
    this.container.registerInstance(CoreTokens.FeatureRegistry, featureRegistry);

    // 4. Health Registry
    const healthRegistry = new HealthRegistry();
    this.container.registerInstance(CoreTokens.HealthRegistry, healthRegistry);

    // 5. Mediator & Buses
    const commandBus = new CommandBus();
    const queryBus = new QueryBus();
    const notificationBus = new NotificationBus();
    const mediator = new Mediator(commandBus, queryBus, notificationBus);
    
    this.container.registerInstance(CoreTokens.CommandBus, commandBus);
    this.container.registerInstance(CoreTokens.QueryBus, queryBus);
    this.container.registerInstance(CoreTokens.NotificationBus, notificationBus);
    this.container.registerInstance(CoreTokens.Mediator, mediator);

    // 6. Request Context Accessor
    const requestContextAccessor = new RequestContextAccessor();
    this.container.registerInstance(CoreTokens.RequestContextAccessor, requestContextAccessor);

    this.isReady = true;

    return this.container;
  }

  public getContainer(): IContainer {
    if (!this.isReady) {
      throw new Error("Cannot get container before bootstrapping.");
    }
    return this.container;
  }
}
