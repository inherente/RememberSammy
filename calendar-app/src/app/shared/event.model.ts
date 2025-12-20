export interface CalendarEvent {
    google_event_id: string;
    summary: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    is_all_day: number;
}

export interface ApiResponse {
    status: string;
    data: CalendarEvent[];
}