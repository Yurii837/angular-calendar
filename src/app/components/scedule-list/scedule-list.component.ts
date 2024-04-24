import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SceduleListService } from './scedule-list.service';
import { SceduleItem } from '../../assets/scedule.class';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ColorType } from '../../assets/type.enum';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';

@Component({
  selector: 'app-scedule-list',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatListModule, MatIconModule],
  templateUrl: './scedule-list.component.html',
  styleUrl: './scedule-list.component.scss'
})
export class SceduleListComponent {

  public ColorType=ColorType
  constructor(
    private sceduleListService: SceduleListService,
    private dialog: MatDialog
  ) {
    this.sceduleListService.SceduleList$
    .subscribe((sceduleList) => {
      if (sceduleList.length === 1) {
        const item = sceduleList[0]
        item.date?.setHours(+item.time.slice(0,2)) 
        item.date?.setMinutes(+item.time.slice(3)) 
        this.events = sceduleList
      }
      this.events = sceduleList.sort((prevEventItem, currEventItem) => {
        const prevHours = +prevEventItem.time.slice(0,2)
        const prevMinutes = +prevEventItem.time.slice(3)
        const curHours = +currEventItem.time.slice(0,2)
        const curMinutes = +currEventItem.time.slice(3)
        // if(!(prevHours && prevMinutes && curHours && curMinutes)) {
          prevEventItem.date?.setHours(prevHours) 
          prevEventItem.date?.setMinutes(prevMinutes) 
          currEventItem.date?.setHours(curHours) 
          currEventItem.date?.setMinutes(curMinutes) 
        // }
          return prevEventItem.date?.getTime() - currEventItem.date.getTime()
      })
    })
  }

  public events!: SceduleItem[];

  differenceInDays(date1: Date, date2: Date = new Date()): string {
    const timestamp1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const timestamp2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const differenceInMilliseconds = Math.abs(timestamp1 - timestamp2);

    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    return timestamp1>timestamp2 ? differenceInDays.toString() + ' days' : 'event expired';
  }

  edit(event: SceduleItem) {
    console.log('edit', event)
    this.dialog.open(AddEventComponent, {
      data: event,
      maxWidth: '80vw',
    });
  }
  remove(event: SceduleItem) {
    this.sceduleListService.deleteEvent(event)
  }
   
  followDate(event: SceduleItem) {
    this.sceduleListService.selectDay(event.date)
  }
}
