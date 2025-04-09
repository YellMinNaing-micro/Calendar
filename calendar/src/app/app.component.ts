import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'; // Import timeGridPlugin
import listPlugin from '@fullcalendar/list';
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";

@Component({
	selector: 'app-root',
	imports: [RouterOutlet,
		CommonModule, // Add CommonModule to imports
		ButtonModule,
		FullCalendarModule,
		DialogModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	calendarOptions: CalendarOptions | undefined;
	visible: boolean = false; // Control the visibility of the dialog
	selectedEvent: any; // Store the clicked event data

	constructor(@Inject(PLATFORM_ID) private platformId: Object) {
		if (isPlatformBrowser(this.platformId)) {
			this.calendarOptions = {
				initialView: 'dayGridMonth', // Ensure this view is available
				plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin], // Add timeGridPlugin and listPlugin
				headerToolbar: {
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
				},
				editable: false,
				selectable: true,
				selectMirror: true,
				dayMaxEvents: true,
				events: [
					{ title: 'All Day Event', start: '2025-04-01' },
					{ title: 'Conference', start: '2025-04-06' },
					{ title: 'Long Event', start: '2025-04-07' },
					{ title: 'Meeting', start: '2025-04-07T10:30:00', allDay: false },
					{ title: 'Lunch', start: '2025-04-07T12:00:00', allDay: false },
					{ title: 'Birthday Party', start: '2025-04-08T07:00:00' },
					{ title: 'Repeating Event', start: '2025-04-08T16:00:00', groupId: '999' },
					{ title: 'Repeating Event', start: '2025-04-15T16:00:00', groupId: '999' },
					{ title: 'Click for Google', url: 'http://google.com/', start: '2025-04-07' },
					{ title: 'Private Party', start: '2025-04-07T07:00:00' },
					{ title: 'Dinner Party', start: '2025-04-07T07:00:00' },
					{ title: 'Booby Party', start: '2025-04-07T07:00:00' },
				],
				dayHeaderDidMount: (info) => {
					const dayOfWeek = info.date.getDay(); // 0 for Sunday, 6 for Saturday
					if (dayOfWeek === 0) {
						info.el.textContent = 'Sunday';
						info.el.style.color = 'red'; // Add color for Sunday
					} else if (dayOfWeek === 6) {
						info.el.textContent = 'SatDay';
						info.el.style.color = 'red'; // Add color for Saturday
					}
				},
				dayCellDidMount: (info) => {
					const dayOfWeek = info.date.getDay(); // 0 for Sunday, 6 for Saturday
					if (dayOfWeek === 0 || dayOfWeek === 6) {
						const dayNumberElement = info.el.querySelector('.fc-daygrid-day-number') as HTMLElement;
						if (dayNumberElement) {
							dayNumberElement.style.color = 'red';
						}
					}
				},
				eventClick: this.handleEventClick.bind(this)
			};
		}
	}

	handleEventClick(clickInfo: EventClickArg) {
		this.selectedEvent = clickInfo.event;
		this.visible = true; // Show the dialog
	}
}
