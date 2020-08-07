import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {}
  // Route to camera component
  camera() {
    this.router.navigate(['/camera']).then();
  }
  // Route to payment component
  payment() {
    this.router.navigate(['/pay']).then();
  }
  // Route to transfer component
  transfer() {
    this.router.navigate(['/transfer']).then();
  }
  // Route to cashsend component
  cashsend() {
    this.router.navigate(['/cashsend']).then();
  }
  // Route to account component
  currAccount() {
    this.router.navigate(['/acc', 1]).then();
  }

  saveAccount() {
    this.router.navigate(['/acc', 2]).then();
  }
}
