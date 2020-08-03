import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NasaApodService} from '../lib/services/nasa-apod.service';
import {NasaAPOD} from '../lib/models/nasa-apod';

@Component({
  selector: 'app-nasa-apod',
  templateUrl: './nasa-apod.component.html',
  styleUrls: ['./nasa-apod.component.scss']
})
export class NasaAPODComponent implements OnInit {

  constructor(private nasaApodService: NasaApodService,
              private router: Router) {
    this.nasaApod = null;
  }

  nasaApod: NasaAPOD;

  ngOnInit() {
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
}
