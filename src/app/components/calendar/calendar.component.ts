import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';

import { SceduleListComponent } from '../scedule-list/scedule-list.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { CommonModule } from '@angular/common';
import { SceduleListService } from '../scedule-list/scedule-list.service';
import { SceduleItem } from '../../assets/scedule.class';
import { DayEvents } from '../../assets/interfase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    SceduleListComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnDestroy {
  @ViewChild('calendar') calendar!: MatCalendar<Date>;

  constructor(
    private dialog: MatDialog,
    private sceduleListService: SceduleListService
  ) {
    this.sub1 = this.sceduleListService.DaySelect$
      .subscribe(date => {
       this.selectDay(date)
      })

      this.sub2 =this.sceduleListService.SceduleList$
      .subscribe(SceduleList => {
        this.createDaysVithEvents(SceduleList)
      })
  }

  private dates: DayEvents[] = [];
  private sub1 = new Subscription()
  private sub2 = new Subscription()

  private createDaysVithEvents(SceduleList: SceduleItem[]): void {
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
    this.calendar?.updateTodaysDate();
  };

  private displayLabel() {
    setTimeout(()=>{
      const cells = document.querySelectorAll(".mat-calendar-body-cell");
      cells.forEach(cell => {
        // @ts-ignore
        const dateSearch = new Date(cell.getAttribute("aria-label"))
        const data = this.dates.find(f => f.date.toLocaleDateString() === dateSearch.toLocaleDateString());
        if (data) {
          cell.setAttribute("aria-label", data.text)
        };
      });
    })
  };

  private selectDay(date: Date) {
    this.calendar.activeDate = date
    this.calendar.selected = date
    // without it's selectedChange do not work on selected day
    setTimeout(() => {
      this.calendar.selected = null
    });
  };

  dateClass = (d: Date) => {
    if (d.getDate()==1)
      this.displayLabel()
      return this.dates.find(f => f.date.toLocaleDateString() === d.toLocaleDateString())
        ? "todays_class"
        : "";
  };

  dateClickHandler(e: Date | null) {
    this.calendar.selected = null
    this.dialog.open(AddEventComponent, {
      data: {date: e},
      maxWidth: '80vw',
    });
  };

  followToday() {
    this.selectDay(new Date)
  };

  ngOnDestroy(): void {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  };
}
