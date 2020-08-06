import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NasaApodService} from '../lib/services/nasa-apod.service';
import {NasaAPOD} from '../lib/models/nasa-apod';
import {SwPush, SwRegistrationOptions, SwUpdate} from '@angular/service-worker';
import {log} from 'util';
import {Test} from '../lib/models/test';

@Component({
  selector: 'app-nasa-apod',
  templateUrl: './nasa-apod.component.html',
  styleUrls: ['./nasa-apod.component.scss']
})
export class NasaAPODComponent implements OnInit {

  // Test object for background sync
  testData: Test = new class implements Test {
    name: string;
    number: number;
    surname: string;
  };

  constructor(private nasaApodService: NasaApodService,
              private router: Router) {
    this.nasaApod = null;
  }

  nasaApod: NasaAPOD;

  ngOnInit() {
    // Get data form NASA API
    this.nasaApodService.getAllAPODs().subscribe(
      data => {
        if (data) {
          this.nasaApod = data;
          console.log(data);
        }
      }
    );
  }

  alert() {
    alert('Functionality coming soon');
  }

  // Test data for background sync
  postData() {
    this.testData.name = 'Rayno';
    this.testData.surname = 'Stuff';
    this.testData.number = 980719;
    this.nasaApodService.postData(this.testData);
  }
}
