import { INotification } from './INotification';

export interface INotificationHandler<TNotification extends INotification> {
  handle(notification: TNotification): Promise<void>;
}
