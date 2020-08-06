import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ErrorService} from '../lib/services/error.service';

@Component({
  selector: 'app-cash-send',
  templateUrl: './cash-send.component.html',
  styleUrls: ['./cash-send.component.css']
})
export class CashSendComponent implements OnInit {

  constructor(private router: Router,
              private notification: ErrorService) { }

  ngOnInit(): void {
  }

  // Send notification when transfer is done
  send() {
    this.notification.sendNotification('CashSend Confirmation', 'Funds has been sent');
    this.back();
  }

  back() {
    this.router.navigate(['/dashboard']).then();
  }

}
