import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/event.model';
import { log } from 'console';
import { environment } from '../../environments/environment'; // 1. Import your environment interface
@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    private http = inject(HttpClient);
 // Update this to your MAMP URL
 // private apiUrl = 'http://localhost:8888/development/cereza/online/event-list.php';
 // 'http://localhost:8888/events.php'; 
 // 2. Dynamically stitch the base URL together with your file endpoint
    private apiUrl = `${environment.apiUrl}/event-list.php`;
    getEvents(tenant: string): Observable<ApiResponse> {
        console.log('Before PHP call');
        return this.http.get<ApiResponse>(`${this.apiUrl}?tenant_username=${tenant}`);
    }
}