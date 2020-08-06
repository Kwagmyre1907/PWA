import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSendComponent } from './cash-send.component';

describe('CashSendComponent', () => {
  let component: CashSendComponent;
  let fixture: ComponentFixture<CashSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
