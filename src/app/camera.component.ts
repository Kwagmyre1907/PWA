import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {ErrorService} from '../lib/services/error.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @Output() public pictureTaken = new EventEmitter<WebcamImage>();
  elementWidth: number;
  private breakpoint: number;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor(private notification: ErrorService,
              private router: Router) {
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    this.elementWidth = document.getElementById('matCard').clientWidth - 32;
    // console.log(this.multipleWebcamsAvailable);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log(document.getElementById('matCard').clientWidth - 32);
    this.elementWidth = document.getElementById('matCard').clientWidth - 32;
  }
  // onResize(event) {
  //   // this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  //   this.elementWidth = document.getElementById('matCard').clientWidth;
  //   console.log(this.elementWidth);
  // }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.notification.sendNotification('NICE!', 'That is a keeper!');
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
    // console.log('ERROR------------');
    // console.log(this.errors);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    if (this.webcamImage) {
      // console.log('--------------IMAGE----------------');
      // console.log(this.webcamImage.imageData);
      // console.log(this.webcamImage.imageAsDataUrl);
      // console.log(this.webcamImage);
    }
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    // console.log(this.trigger);
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    // console.log(this.nextWebcam);
    return this.nextWebcam.asObservable();
  }

  back() {
    this.router.navigate(['/dashboard']).then();
  }

  close() {
    this.webcamImage = null;
  }
}
