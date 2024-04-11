import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();

  showNotification(message: string) {
    this.errorMessageSubject.next(message);
    console.log(message);
  }

  hideNotification() {
    this.errorMessageSubject.next(null);
  }
}
