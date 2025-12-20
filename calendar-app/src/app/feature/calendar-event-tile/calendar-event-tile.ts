import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent } from '../../shared/event.model';

@Component({
    selector: 'app-calendar-event-tile',
    imports: [CommonModule],
    templateUrl: './calendar-event-tile.html',
    styleUrl: './calendar-event-tile.css',
})

export class CalendarEventTile {
 // @Input() event!: CalendarEvent;
 // Input from the parent's loop
    event = input.required<CalendarEvent>();

 // Local signal for UI state
    isExpanded = signal(false);

    toggle() {
        this.isExpanded.update(v => !v);
    }

    onEnroll(e: Event) {
        e.stopPropagation(); // Prevents the tile from closing when clicking the button
        console.log('Enrolling in:', this.event().summary);
     // You can call a service here to hit your PHP API
    }
}
