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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('myCalendar') myCalendar!: MatCalendar<Date>;
  constructor(
    private dialog: MatDialog
  ) {}
  Today  = [{ date: this.dateToString(new Date()), text: 'Today \n aa'}]

  dates = [
    { date: "2020-09-01", text: "Special Day 1" },
    { date: "2020-09-20", text: "Special Day 2" }
  ];

    dateClass = (d: Date) => {
      if (d.getDate()==1)
        this.displayLabel()
      const dateSearch = this.dateToString(d);
      if (this.Today.find(f => f.date == dateSearch)) {
        return this.Today.find(f => f.date == dateSearch)
        ? "todays_class"
        : "normal";
      } else {
        return this.dates.find(f => f.date == dateSearch)
        ? "example-custom-date-class"
        : "normal";
      }

    };
  
  
    displayLabel() {
      setTimeout(()=>{
      const cells = document.querySelectorAll(".mat-calendar-body-cell");
      cells.forEach(cell => {
        const dateSearch = this.dateToString(
          // @ts-ignore
          new Date(cell.getAttribute("aria-label"))
        );
        const data = this.dates.find(f => f.date == dateSearch);
        const data_today = this.Today.find(f => f.date == dateSearch);
        if (data) cell.setAttribute("aria-label", data.text);
        // @ts-ignore
        if (data_today) cell.setAttribute("aria-label", data_today.text);
      });
  
      })
    }
    dateToString(date: any) {
      return (
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2)
      );
    }

    dateClickHandler(e: any) {
      this.myCalendar.selected = null
      // console.log(e.getDate())
      const dialogRef = this.dialog.open(AddEventComponent, {
        data: {date: e},
        maxWidth: '80vw',
      });
      dialogRef.afterClosed()
        .pipe(first())
        .subscribe(result => {
          if (result === true) {
            console.log(result)
          }
        });
    }

    handleMonthSelected(e: any) {
      console.log(e.getMonth())
    }

    dateChange(e: any) {
      console.log(e)
      this.myCalendar.activeDate = new Date('2020-09-01')
      // this.myCalendar.startAt = new Date('2020-09-13')
      this.myCalendar.selected = new Date('2020-09-01')
    }
}
