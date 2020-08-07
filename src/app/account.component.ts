import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
/*
* THIS COMPONENT IS PURELY FOR PRESENTATION PURPOSES
* */
export class AccountComponent implements OnInit {
  accountname: string;
  accountnum: string;
  balance: string;
  date: Date = new Date();
  amount: number;
  random: number;

  places = [
    'Cornucopia',
    'The Corner Store',
    'Sweet Spot',
    'Decorama Boutique',
    'One of a Kind Studio',
    'Not Just Groceries',
    'The Full Cart',
    'Dollar Savings Store',
    'Healthy Treats',
    'Farm to Shelf',
  ];

  constructor(private route: ActivatedRoute,
              private router: Router) {
    if (this.route.snapshot.params.id === '1') {
      this.accountname = 'Current Account';
      this.accountnum = '123456790';
      this.balance = 'R6511.42';
    } else {
      this.accountname = 'Savings Account';
      this.accountnum = '9874563210';
      this.balance = 'R226.10';
    }
  }

  ngOnInit(): void {
    this.amount = Math.floor((Math.random() * 1000) + 1);
  }

  getAmount(): number {
    this.amount = Math.floor((Math.random() * 1000) + 1);
    return this.amount;
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  getDate(): Date {
    return this.randomDate(new Date(2012, 0, 1), this.date);
  }

  back() {
    this.router.navigate(['/dashboard']).then();
  }
}
