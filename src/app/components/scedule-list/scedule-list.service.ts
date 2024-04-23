import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SceduleItem {
  date: Date;
  time: string;
  name: string;
  type: number;
}

@Injectable({
  providedIn: 'root'
})
export class SceduleListService {

  constructor() { }

  public sceduleList = new BehaviorSubject<SceduleItem[]>([]);

}
