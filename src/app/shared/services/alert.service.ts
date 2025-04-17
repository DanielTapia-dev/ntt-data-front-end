import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<AlertMessage>();
  alert$ = this.alertSubject.asObservable();

  show(type: AlertMessage['type'], text: string) {
    this.alertSubject.next({ type, text });
  }

  success(text: string) {
    this.show('success', text);
  }

  error(text: string) {
    this.show('error', text);
  }

  info(text: string) {
    this.show('info', text);
  }

  warning(text: string) {
    this.show('warning', text);
  }
}
