import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SceduleItem } from '../../clasess/scedule.class';

@Injectable({
  providedIn: 'root'
})
export class SceduleListService {
 

  constructor() { }
  static eventId = 0;

  get SceduleList() {
    return this._sceduleList$.value
  }

  get SceduleList$(): Observable<SceduleItem[]> {
    return this._sceduleList$.asObservable()
  }

  get DaySelect$(): Observable<SceduleItem[]> {
    return this._daySelect$.asObservable()
  }

  private _sceduleList$ = new BehaviorSubject<SceduleItem[]>([]);
  private _daySelect$  = new Subject<any>()

  pushEvent(eventItem: SceduleItem | any) {
    const curVal = this.SceduleList
    SceduleListService.eventId++
    curVal.push({...eventItem, id: SceduleListService.eventId})
    this._sceduleList$.next(curVal)
  }

  editEvent() {}

  deleteEvent() {}

  selectDay(date: Date | string) {
    this._daySelect$.next(date)
  }

}
