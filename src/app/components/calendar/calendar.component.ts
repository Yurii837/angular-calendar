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

import { first } from 'rxjs';
import { SceduleListComponent } from '../scedule-list/scedule-list.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { CommonModule } from '@angular/common';
import { SceduleListService } from '../scedule-list/scedule-list.service';
import { SceduleItem } from '../../assets/scedule.class';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule, SceduleListComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  @ViewChild('myCalendar') myCalendar!: MatCalendar<Date>;
  constructor(
    private dialog: MatDialog,
    private sceduleListService: SceduleListService
  ) {

    this.sceduleListService.DaySelect$
      .subscribe(date => {
       this.selectDay(date)
      })

    this.sceduleListService.SceduleList$
      .subscribe(SceduleList => {
        this.createDaysVithEvents(SceduleList)
      })
  }

  today = new Date()
  
  dates: {date: Date, text: string}[] = [
    // { date: new Date("2024-04-01"), text: ' \nToday1fgdbabe wefxEF \n aa' },
    // { date: new Date("2024-04-20"), text: 'Today2 \n bb' }
  ];

  createDaysVithEvents(SceduleList: SceduleItem[]): void {
    this.dates = []
    SceduleList.forEach(item => {
      const serchingDateIndex = this.dates.findIndex(d => d.date?.toLocaleDateString() === item.date.toLocaleDateString())
      if (serchingDateIndex > -1) {
        // const txt = dates[serchingDateIndex].text
        if(this.dates[serchingDateIndex]?.text) {
          this.dates[serchingDateIndex].text += '\n'+item.name
        }
      } else {
        this.dates.push({
          date: item.date,
          text: item.name
        })
      }
    })
    this.myCalendar?.updateTodaysDate();
  }

    dateClass = (d: Date) => {
      if (d.getDate()==1)
        this.displayLabel()
        return this.dates.find(f => f.date.toLocaleDateString() === d.toLocaleDateString())
        ? "todays_class"
        : "";

    };
  
  
    displayLabel() {
      setTimeout(()=>{
      const cells = document.querySelectorAll(".mat-calendar-body-cell");
      cells.forEach(cell => {
        const dateSearch = 
          // @ts-ignore
          new Date(cell.getAttribute("aria-label"))
        ;
        const data = this.dates.find(f => f.date.toLocaleDateString() === dateSearch.toLocaleDateString());
      
        if (data) cell.setAttribute("aria-label", data.text);
      });
  
      })
    }

    dateClickHandler(e: Date | null) {
      this.myCalendar.selected = null
      this.dialog.open(AddEventComponent, {
        data: {date: e},
        maxWidth: '80vw',
      });
    }

    selectDay(date: Date) {
      this.myCalendar.activeDate = date
      this.myCalendar.selected = date
      // without it's selectedChange do not work on selected day
      setTimeout(() => {
        this.myCalendar.selected = null
      });
    }

    followToday() {}
}
