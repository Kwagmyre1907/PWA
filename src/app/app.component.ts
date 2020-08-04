import { Component } from '@angular/core';
import construct = Reflect.construct;
import {Router} from '@angular/router';
import {SwPush, SwRegistrationOptions, SwUpdate} from '@angular/service-worker';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PWA APP';

  constructor(private updates: SwUpdate,
              private push: SwPush,
              private registrationOptions: SwRegistrationOptions) {
    updates.available.subscribe(
      data => {
        console.log('Current PWA Version: ', data.current);
        console.log('Available PWA Version', data.available);
      });

    updates.activated.subscribe(
      data => {
        console.log('PWA Version Updated: ', data.current);
      });

    console.log('Notifications are enabled: ', this.push.isEnabled);
    if (!this.push.isEnabled) {
      this.push.requestSubscription(
        {serverPublicKey: 'BK6iHZcQ3qxgV279cqk2IZWIm4Ym8MekBgeL2CFxJBXWFOEoMu7z-y9o5MW2RyHr4IZtaAwh0Kr1yw-L-K0YibI'})
        .then(
          sub => {
            console.log(sub);
          }
        );
    }
  }
}
