import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FullCalendarModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  calendarOptions: CalendarOptions | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.calendarOptions = {
        initialView: 'dayGridMonth', // Ensure this view is available
        plugins: [dayGridPlugin, interactionPlugin], // Load required plugins
        editable: true,
        selectable: true,
        events: [
          { title: 'Event 1', date: '2025-03-07' },
          { title: 'Event 2', date: '2025-03-12' }
        ]
      };
    }
  }
}
