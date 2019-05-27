import {DestinationsModel} from './destinations.model';

export class RequestModel{

  constructor(
    public FromLatitude:number,
    public FromLongitude:number,
    public FromText:string,
    public KindTarh:number,
    public Date:string,
    public Description:string,
    public FromTime:string,
    public RequestId:number,
    public Destinations:DestinationsModel[],
    public Status:string,

  ){

  }
}
