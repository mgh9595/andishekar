import {RequestModel} from './request.model';

export class RequestsModel{

  constructor(
    public Requestes:RequestModel[],
    public ResultCode:number,
    public ResultText:string,

  ){

  }
}
