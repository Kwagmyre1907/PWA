import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ErrorService} from '../lib/services/error.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router,
              private notification: ErrorService) { }

  ngOnInit(): void {
  }

  pay() {
    this.notification.sendNotification('Payment Confirmation', 'Payment has been made.');
    this.back();
  }

  back() {
    this.router.navigate(['/dashboard']).then();
  }
}
