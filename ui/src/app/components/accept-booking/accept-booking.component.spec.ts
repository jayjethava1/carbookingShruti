import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptBookingComponent } from './accept-booking.component';

describe('AcceptBookingComponent', () => {
  let component: AcceptBookingComponent;
  let fixture: ComponentFixture<AcceptBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
