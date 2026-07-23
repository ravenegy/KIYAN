import { INotificationBus } from './INotificationBus';
import { INotification } from './INotification';
import { INotificationHandler } from './INotificationHandler';

export class NotificationBus implements INotificationBus {
  private readonly handlers = new Map<string, INotificationHandler<any>[]>();

  public register<TNotification extends INotification>(
    notificationType: string,
    handler: INotificationHandler<TNotification>
  ): void {
    const existingHandlers = this.handlers.get(notificationType) || [];
    existingHandlers.push(handler);
    this.handlers.set(notificationType, existingHandlers);
  }

  public async publish(notification: INotification): Promise<void> {
    const notificationHandlers = this.handlers.get(notification.type) || [];
    await Promise.all(notificationHandlers.map(handler => handler.handle(notification)));
  }
}
