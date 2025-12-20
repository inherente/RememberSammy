import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCollection } from './event-collection';

describe('EventCollection', () => {
  let component: EventCollection;
  let fixture: ComponentFixture<EventCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCollection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCollection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
