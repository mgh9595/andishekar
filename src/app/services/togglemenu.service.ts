import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TogglemenuService {
active:BehaviorSubject<boolean>;
  constructor() {
    this.active=new BehaviorSubject(false);
  }
}
