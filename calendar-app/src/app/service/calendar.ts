import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/event.model';
import { log } from 'console';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    private http = inject(HttpClient);
 // Update this to your MAMP URL
    private apiUrl = 'http://localhost:8888/development/cereza/api/event-list.php';// 'http://localhost:8888/events.php'; 
    getEvents(tenant: string): Observable<ApiResponse> {
        console.log('Before PHP call');
        return this.http.get<ApiResponse>(`${this.apiUrl}?tenant_username=${tenant}`);
    }
}