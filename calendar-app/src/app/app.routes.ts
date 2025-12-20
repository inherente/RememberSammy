import { Routes } from '@angular/router';
import { EventCollection } from './feature/event-collection/event-collection';

export const routes: Routes = [
    {
        path: 'events',
        component: EventCollection
    },
    {
        path: '',
        redirectTo: '/events',
        pathMatch: 'full'
    } // Redirect base URL to events
];