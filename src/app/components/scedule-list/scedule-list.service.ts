import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SceduleItem } from '../../assets/scedule.class';

@Injectable({
  providedIn: 'root'
})
export class SceduleListService {
  static eventId = 0;
  
  private _sceduleList$ = new BehaviorSubject<SceduleItem[]>([]);
  private _daySelect$  = new Subject<any>()

  get SceduleList() {
    return this._sceduleList$.value
  }

  get SceduleList$(): Observable<SceduleItem[]> {
    return this._sceduleList$.asObservable()
  }

  get DaySelect$(): Observable<Date> {
    return this._daySelect$.asObservable()
  }
 
  // simulate async request
  async pushEvent (eventItem: SceduleItem | any) {
    const currentList = [...this.SceduleList]
    SceduleListService.eventId++
    currentList.push({...eventItem, id: SceduleListService.eventId})
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        this._sceduleList$.next(currentList);
        resolve();
      }, 300);
    });
    return SceduleListService.eventId;
  }

  // simulate async request
  async editEvent(eventItem: SceduleItem | any) {
    const currentList = [...this.SceduleList]
    currentList.some((item, index, arr) => {
      if (item.id === eventItem.id) {
        arr[index] = eventItem
        return true
      }
      return false
    })
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        this._sceduleList$.next(currentList);
        resolve();
      }, 300);
    });
    return true;
  }

  deleteEvent(eventItem: SceduleItem | any) {
    const currentList = [...this.SceduleList]
    const eventIndex = currentList.findIndex(e => {e.id === eventItem.id})
    currentList.splice(eventIndex, 1)
    this._sceduleList$.next(currentList);
  }

  selectDay(date: Date) {
    this._daySelect$.next(date)
  }

}
