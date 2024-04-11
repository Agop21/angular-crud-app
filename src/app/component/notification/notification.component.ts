import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.errorMessage$.subscribe(
      (message) => (this.errorMessage = message)
    );
  }

  onClose() {
    this.notificationService.hideNotification();
  }
}
