import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SceduleListComponent } from "./components/scedule-list/scedule-list.component";
import { CalendarComponent } from "./components/calendar/calendar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SceduleListComponent, CalendarComponent]
})
export class AppComponent {}
