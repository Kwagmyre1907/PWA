import { Component } from '@angular/core';
import {SwPush, SwRegistrationOptions, SwUpdate} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PWA APP';
  sampleData = {
    data: 'sample',
    moreData: 'more samples'
  };

  constructor(private updates: SwUpdate) {
    updates.available.subscribe(
      data => {
        console.log('Current PWA Version: ', data.current);
        console.log('Available PWA Version', data.available);
      });

    updates.activated.subscribe(
      data => {
        console.log('PWA Version Updated: ', data.current);
      });
  }
}
