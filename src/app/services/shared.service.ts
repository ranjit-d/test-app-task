import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private notification: NzNotificationService) { }

  successToastNotifaction(message: string) {
    this.notification.success('', message, {
      nzClass: 'text-bg-success',
    });
  }

  errorToastNotification(message: string) {
    this.notification.error('', message, {
      nzClass: 'text-bg-danger',
      nzDuration: 2000,
    });
  }

  infoToastNotification(title: string, message: string) {
    this.notification.info(title, message, {
      nzClass: 'text-bg-info',
      nzDuration: 5000,
    });
  }
}
