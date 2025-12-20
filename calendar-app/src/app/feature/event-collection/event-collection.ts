import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../service/calendar';
import { CalendarEventTile } from '../calendar-event-tile/calendar-event-tile';
import { CalendarEvent } from '../../shared/event.model';

@Component({
    selector: 'app-event-collection',
    imports: [CommonModule, CalendarEventTile],
    templateUrl: './event-collection.html',
    styleUrl: './event-collection.css',
})

export class EventCollection implements OnInit{
    private calendarService = inject(CalendarService); // We create a Signal to hold our events
    events = signal<CalendarEvent[]>([]);
    loading = signal<boolean>(true);
    ngOnInit(): void {
        console.log('EventCollection initialized');
 // For now, we hardcode 'root' or your test tenant
        this.calendarService.getEvents('tenant_acme').subscribe({
            next: (response) => {
         // We "set" the signal value, which notifies the UI
                this.events.set(response.data);
                this.loading.set(false);
                console.log('Events loaded:', response.data);
            },
            error: (err) => {
                console.error('API Error:', err);
                this.loading.set(false);
            }
        });
    }
}
