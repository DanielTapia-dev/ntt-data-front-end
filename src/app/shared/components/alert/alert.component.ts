import { Component, OnInit } from '@angular/core';
import { AlertService, AlertMessage } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  message: AlertMessage | null = null;
  visible = false;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe((msg) => {
      this.message = msg;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    });
  }
}
