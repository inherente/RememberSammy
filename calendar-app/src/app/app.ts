import { Component, Inject, signal, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('calendar-app');
    isNight = true;
    isBrowser: boolean;
    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    toggleMode() {
        this.isNight = !this.isNight;
        if (this.isBrowser) {
            document.body.classList.toggle('night', this.isNight);
            document.body.classList.toggle('day', !this.isNight);
        }
    }

}