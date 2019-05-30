import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TogglemenuService {
active:BehaviorSubject<boolean>;
isWork:BehaviorSubject<boolean>
  Excute_get_Adresses:BehaviorSubject<boolean>;
  constructor() {
    this.active=new BehaviorSubject(false);
    this.isWork=new BehaviorSubject(false);
    this.Excute_get_Adresses=new BehaviorSubject(false);
  }
}
