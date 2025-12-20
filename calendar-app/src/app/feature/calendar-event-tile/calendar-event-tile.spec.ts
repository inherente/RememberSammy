import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventTile } from './calendar-event-tile';

describe('CalendarEventTile', () => {
  let component: CalendarEventTile;
  let fixture: ComponentFixture<CalendarEventTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEventTile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
