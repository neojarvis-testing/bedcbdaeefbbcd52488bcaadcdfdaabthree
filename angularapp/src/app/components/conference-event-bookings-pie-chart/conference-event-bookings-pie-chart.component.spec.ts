import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceEventBookingsPieChartComponent } from './conference-event-bookings-pie-chart.component';

describe('ConferenceEventBookingsPieChartComponent', () => {
  let component: ConferenceEventBookingsPieChartComponent;
  let fixture: ComponentFixture<ConferenceEventBookingsPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConferenceEventBookingsPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceEventBookingsPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
