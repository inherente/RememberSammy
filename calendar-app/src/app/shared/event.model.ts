
export interface CalendarAttachment {
    fileId: string;
    fileUrl: string;
    title: string;
    mimeType: string;
    iconLink?: string;
 // Agregamos este campo para soportar el método de previsualización que planeas usar
    thumbnailLink?: string; 
}

export interface CalendarEvent {
    googleEventId: string;
    summary: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    isAllDay: number; // Mantenemos number por tu implementación en DB/PHP
 // El signo '?' indica que es opcional, ya que no todos los eventos tendrán archivos
    attachments?: CalendarAttachment[];
}

export interface ApiResponse {
    status: string;
    data: CalendarEvent[];
}