import { Component, input, signal , computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent } from '../../shared/event.model';
import { DomSanitizer } from '@angular/platform-browser'; // For security
@Component({
    selector: 'app-calendar-event-tile-copy',
    imports: [CommonModule],
    templateUrl: './calendar-event-tile.copy.html',
    styleUrl: './calendar-event-tile.css',
})

export class CalendarEventTile {
 // @Input() event!: CalendarEvent;
 // Input from the parent's loop
    event = input.required<CalendarEvent>();

 // Local signal for UI state
    isExpanded = signal(false);
    private sanitizer = inject(DomSanitizer);

 // Computed signal to resolve the image URL
 // En tu calendar-event-tile.ts
    eventImage = computed(() => {
        console.log('Computing image for event:', this.event().summary);
        const evt = this.event();
        const attachments = evt.attachments;
        
        if (evt.summary === 'workShop') {
            console.log('Adjuntos de workShop:', attachments);
        }

        if (attachments && attachments.length > 0) {
            // Option A: Direct use of thumbnailLink if provided by your PHP backend API
            if (attachments[0].thumbnailLink) {
                return this.sanitizer.bypassSecurityTrustUrl(attachments[0].thumbnailLink);
            }

            // Option B: High-performance CDN endpoint using backticks for interpolation
            if (attachments[0].fileId) {
                const fileId = attachments[0].fileId;
                // Modern, reliable Google CDN endpoint format for public/shared Drive files
                const cdnThumb = `https://lh3.googleusercontent.com/d/${fileId}=w600`;
                return this.sanitizer.bypassSecurityTrustUrl(cdnThumb);
            }
        }

        // Fallback: Lorem Picsum placeholder
        const seed = evt.googleEventId || 'default-seed'; //
        return `https://picsum.photos/seed/${seed}/600/600`;
    });
    eventoImage = computed(() => {
        console.log('Computing image for event:', this.event().summary);
        const evt = this.event();
        const attachments = evt.attachments;
        
     // Debug temporal: Abre la consola y busca el evento "workShop"
        if (evt.summary === 'workShop') {
            console.log('Adjuntos de workShop:', attachments);
        }

        if (attachments && attachments.length > 0 && attachments[0].fileId) {
            const fileId = attachments[0].fileId;
            const manualThumb = `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
            return this.sanitizer.bypassSecurityTrustUrl(manualThumb);
        }

     // Fallback: Asegúrate de usar el nombre exacto de la propiedad del JSON
        const seed = evt.googleEventId || 'default-seed';
        console.log('Seed:', seed);
        return `https://picsum.photos/seed/${seed}/600/600`;
    });
    toggle() {
        this.isExpanded.update(v => !v);
    }

    onEnroll(e: Event) {
        e.stopPropagation(); // Prevents the tile from closing when clicking the button
        console.log('Enrolling in:', this.event().summary);
     // You can call a service here to hit your PHP API
    }
}
