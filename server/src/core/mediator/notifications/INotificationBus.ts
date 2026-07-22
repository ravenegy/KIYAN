import { INotification } from './INotification';
import { INotificationHandler } from './INotificationHandler';

export interface INotificationBus {
  register<TNotification extends INotification>(
    notificationType: string,
    handler: INotificationHandler<TNotification>
  ): void;
  
  publish(notification: INotification): Promise<void>;
}
