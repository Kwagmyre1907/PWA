import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ErrorService} from '../lib/services/error.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private router: Router,
              private notification: ErrorService) { }

  ngOnInit(): void {
  }

  transfer() {
    this.notification.sendNotification('Transfer Confirmation', 'Transfer has been made.');
    this.back();
  }

  back() {
    this.router.navigate(['/dashboard']).then();
  }
}
