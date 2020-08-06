import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {environment} from '../environments/environment';
import {SwPush, SwRegistrationOptions} from '@angular/service-worker';
import {ErrorService} from '../lib/services/error.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  notificationsEnabled: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private push: SwPush,
              private registrationOptions: SwRegistrationOptions,
              private notificationService: ErrorService) {}

  enableNotifications() {
    this.notificationsEnabled = this.push.isEnabled;
    console.log('Notifications are enabled: ', this.notificationsEnabled);
    if (this.notificationsEnabled) {
      this.notificationService.sendNotification('Uhm...', 'Pretty sure its all ready enabled.');
      return;
    }

    this.push.subscription.subscribe(
      getsub => {
        if (getsub === null) {
          this.push.requestSubscription(
            {serverPublicKey: environment.VAPID_PUBLIC_KEY})
            .then(reqsub => {
              console.log(JSON.stringify(reqsub));
              this.notificationService.sendNotification('WOOOOW!', 'Thanks for enabling notifications!');
            })
            .catch(err => console.log(err));
        } else {
          console.log('SUB ', getsub);
        }
      });
  }
}
