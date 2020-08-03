import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaAPODComponent } from './nasa-apod.component';

describe('NasaAPODComponent', () => {
  let component: NasaAPODComponent;
  let fixture: ComponentFixture<NasaAPODComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasaAPODComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasaAPODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
