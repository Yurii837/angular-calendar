import { Component, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCalendar, MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AddEventComponent } from './components/add-event/add-event.component';
import { first } from 'rxjs';
import { SceduleListComponent } from "./components/scedule-list/scedule-list.component";
import { CalendarComponent } from "./components/calendar/calendar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,
        SceduleListComponent, CalendarComponent]
})
export class AppComponent {
  
}
