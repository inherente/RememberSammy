import { Component, input, signal, computed, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent } from '../../shared/event.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // 1. Import HttpClient
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-calendar-event-tile',
    imports: [CommonModule, FormsModule], // Ensure FormsModule remains for ngModel
    templateUrl: './calendar-event-tile.html',
    styleUrl: './calendar-event-tile.css',
})
export class CalendarEventTile {
    event = input.required<CalendarEvent>();
    isExpanded = signal(false);

 // 1. Track mobile state as a reactive signal
    isMobileScreen = signal(false);

 // UI feedback tracking state
    isSubmitting = signal(false); 
    userEmail = '';
    userPhone = '';

    private sanitizer = inject(DomSanitizer);
    private http = inject(HttpClient); // 2. Inject HttpClient

    // Grab a reference to the native <dialog> element from the template
    @ViewChild('enrollmentDialog') dialogRef!: ElementRef<HTMLDialogElement>;

 // Keep your high-performance CDN eventImage computed signal exactly as is
 // 2. Update your computed signal to dynamically determine image resolution parameters
    eventImage = computed(() => {
        const evt = this.event();
        const attachments = evt.attachments;
        
        // Determine the optimal width quality parameter based on screen layout
        const targetWidth = this.isMobileScreen() ? '350' : '800';
        
        if (attachments && attachments.length > 0 && attachments[0].fileId) {
            const fileId = attachments[0].fileId;
            // Dynamically inject the resolution width into your CDN target string
            const cdnThumb = `https://lh3.googleusercontent.com/d/${fileId}=w${targetWidth}`;
            return this.sanitizer.bypassSecurityTrustUrl(cdnThumb);
        }

        const seed = evt.googleEventId || 'default-seed';
        // Apply the same dynamic optimization strategy to your fallback random generation service
        return `https://picsum.photos/seed/${seed}/${targetWidth}/${targetWidth}`;
    });
    toggle() {
        this.isExpanded.update(v => !v);
    }

    onEnroll(e: Event) {
        e.stopPropagation(); // Prevents accordion tile toggle
        this.userEmail = '';
        this.userPhone = '';
        this.isSubmitting.set(false);
        this.dialogRef.nativeElement.showModal();
    }

    closeDialog() {
        this.dialogRef.nativeElement.close();
    }
// 3. Initialize window listener using standard lifecycle hooks
    ngOnInit() {
        if (typeof window !== 'undefined') {
            this.checkScreenSize();
            window.addEventListener('resize', this.checkScreenSize.bind(this));
        }
    }

    ngOnDestroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.checkScreenSize.bind(this));
        }
    }

    private checkScreenSize() {
        // Aligns precisely with our CSS media query breakpoint (768px)
        this.isMobileScreen.set(window.innerWidth <= 768);
    }

 // 3. Complete the implementation to hit your Hostinger PHP backend
    submitEnrollment(e: Event) {
        e.preventDefault();
        
        if (!this.userEmail || !this.userPhone) {
            alert('Please fill out all fields.');
            return;
        }

        // Set loading state to true
        this.isSubmitting.set(true);

        const payload = {
            googleEventId: this.event().googleEventId,
            email: this.userEmail,
            phone: this.userPhone
        };

        const apiUrl = `${environment.apiUrl}/enroll.php`;

        this.http.post(apiUrl, payload).subscribe({
            next: (response: any) => {
                this.isSubmitting.set(false);
                alert(response.message || `Successfully requested enrollment in ${this.event().summary}!`);
                this.dialogRef.nativeElement.close();
            },
            error: (err) => {
                this.isSubmitting.set(false);
                console.error('Enrollment submission error:', err);
                
                // Show clean validation messaging depending on status code (like the 409 Conflict)
                if (err.status === 409) {
                    alert(err.error?.message || 'You are already enrolled or have a pending request for this event. /n Check your email for next steps.');
                } else {
                    alert('There was a technical issue queuing your registration. Please try again.');
                }
            }
        });
    }
    getMapsUrl(location: string | null | undefined): string {
        if (!location) return '#';
        
        const trimmedLocation = location.trim();

     // 1. If it's already an absolute web link (HTTP/HTTPS), return it directly
        if (/^https?:\/\//i.test(trimmedLocation)) {
            return trimmedLocation;
        }

     // 2. Otherwise, treat it as a physical address text and generate a universal query search link
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmedLocation)}`;
    }
}