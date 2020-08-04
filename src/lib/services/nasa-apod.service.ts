import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {NasaAPOD} from '../models/nasa-apod';

@Injectable({
  providedIn: 'root'
})

export class NasaApodService {
  private enviro = environment;
  private URL;
  private API_KEY = '?api_key=Sgevqbva9t3HcneQjNmW6RbBYNkiN5SmrmjCS6Vb';
  // headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
              private handelError: ErrorService) {
    this.URL = this.enviro.REST_NASA_BASE + this.enviro.REST_NASA_APOD + this.API_KEY;
    // this.headers = new HttpHeaders().set('Content Type', 'application/json');
  }

  getAllAPODs(): Observable<NasaAPOD> {
    // const headers = this.headers;
    console.log('APOD URL: ', this.URL);
    return this.httpClient.get<NasaAPOD>(`${this.URL}`)
      .pipe(
        catchError(this.handelError.handelError)
      );
  }
}
