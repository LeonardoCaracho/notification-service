import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entitites/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notitication.create({
      data: raw,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notifications = await this.prismaService.notitication.findMany({
      where: { recipientId: recipientId },
    });

    return notifications.length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notitication.findMany({
      where: { recipientId: recipientId },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notitication.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notitication.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
