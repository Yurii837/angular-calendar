import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SceduleListService } from './scedule-list.service';
import { SceduleItem } from '../../clasess/scedule.class';

@Component({
  selector: 'app-scedule-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scedule-list.component.html',
  styleUrl: './scedule-list.component.scss'
})
export class SceduleListComponent {

  constructor(
    private sceduleListService: SceduleListService
  ) {
    this.sceduleListService.SceduleList$
    .subscribe((sceduleList) => {
      this.events = sceduleList.sort((prevEventItem, currEventItem) => {
        const prevHours = +prevEventItem.time.slice(0,2)
        const prevMinutes = +prevEventItem.time.slice(3)
        const curHours = +currEventItem.time.slice(0,2)
        const curMinutes = +currEventItem.time.slice(3)
        prevEventItem.date?.setHours(prevHours) 
        prevEventItem.date?.setMinutes(prevMinutes) 
        currEventItem.date?.setHours(curHours) 
        currEventItem.date?.setMinutes(curMinutes) 
          return prevEventItem.date?.getTime() - currEventItem.date.getTime()
      })
    })
  }

  public events!: SceduleItem[];

   
}
