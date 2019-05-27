import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggledesService {
isSource:BehaviorSubject<boolean>;
  coordinate_marker_source_txt:BehaviorSubject<any>;
  coordinate_marker_source_loc:BehaviorSubject<any[]>;
  coordinate_marker_end_txt:BehaviorSubject<any[]>;
  coordinate_marker_end_loc:BehaviorSubject<any[]>;
  Type_final_req:BehaviorSubject<boolean>;
  Final_req:BehaviorSubject<any>;
  EDIT_TYPE:BehaviorSubject<boolean>;
  req_Id:BehaviorSubject<number>;
  getRequest:BehaviorSubject<number>;
  constructor() {
    this.Final_req=new BehaviorSubject(null);
    this.Type_final_req=new BehaviorSubject<boolean>(false);
    this.coordinate_marker_source_txt=new BehaviorSubject(null);
    this.coordinate_marker_source_loc=new BehaviorSubject(null);
    this.coordinate_marker_end_txt=new BehaviorSubject(null);
    this.coordinate_marker_end_loc=new BehaviorSubject(null);
    this.EDIT_TYPE=new BehaviorSubject<boolean>(false);
    this.req_Id=new BehaviorSubject<number>(0);
  this.isSource=new BehaviorSubject(true)
    this.getRequest=new BehaviorSubject<number>(0);

  }
}
