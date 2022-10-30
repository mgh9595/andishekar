import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = 'http://car.nojansoft.com/api/';
  API_ENDPOINT_REGISTER = 'signup';
  API_ENDPOINT_LOGIN = 'signin';
  API_ENDPOINT_FORGET = 'changePassword';
  API_ENDPOINT_RESET_PASSWORD = 'changePassword2';
  API_ENDPOINT_GET_ADDRESS = 'getaddress';
  API_ENDPOINT_REQUEST_CAR = 'requestcar';
  API_ENDPOINT_UPDATE_REQUEST_CAR = 'Updaterequestcar';
  API_ENDPOINT_SAVED_ADDRESS = 'InsertSavedAddress';
  API_ENDPOINT_SELECT_SAVED_ADDRESS = 'SelectSavedAddresses';
  API_ENDPOINT_SELECT_MY_REQUEST = 'SelectMyRequest';
  API_ENDPOINT_DELETE_MY_REQUEST = 'DeleteRequest';
  API_ENDPOINT_SELECT_PROFILE_DRIVER = 'SelectProfileDriver';
  API_ENDPOINT_DELETE_ADDRESS= 'DeleteAddress';
  API_ENDPOINT_Check_Comment= 'SelectMainRequestClient';
  API_ENDPOINT_INSERT_DRIVER_Comment= 'InsertComment';
  constructor(private http:HttpClient) {

  }
  getToken=()=>{
    return localStorage.getItem('Token');
  };
  public Login(data:{Email:string,Password:any,Device:string}){
    data.Device='Web';
    return this.http.post(this.API_URL+ this.API_ENDPOINT_LOGIN,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }

  public Register(data:{Email:string,Password:any,Device:string,FirstName?:string,LastName?:string,Mobile?:number}){
    data.Device='Web';
    return this.http.post(this.API_URL+ this.API_ENDPOINT_REGISTER,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }
  public Forget(data:{Email:string}){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_FORGET,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }

  public ResetPasword(data:{OldPassword:string,NewPassword:string,Token:string}){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_RESET_PASSWORD,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }
  public GetAddress(data:{Latitude:number,Longitude:number}){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_GET_ADDRESS,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }

  public RequestCar(
    data:{
      FromLatitude:any,
      FromLongitude:any,
      FromText:string,
      KindTarh:number,
      Date:any,
      FromTime:any,
      ToTime:any,
      Description:any,
      Destinations:any,
      Token:string,
      RequestId?:number,

  }){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_REQUEST_CAR,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }

  public UpdateRequestCar(
    data:{
      RequestId?:number,
      FromLatitude:any,
      FromLongitude:any,
      FromText:string,
      KindTarh:number,
      Date:any,
      FromTime:any,
      ToTime:any,
      Description:any,
      Destinations:any,
      Token:string,

  }){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_UPDATE_REQUEST_CAR,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }

  public InsertSavedAddress(
    data:{
      Latitude:number,
      Longitude:number,
      AddressGoogle:string,
      AddressName:string,
      Token:string,

  }){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_SAVED_ADDRESS,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }
  public SelectSavedAddress(
    data:{
      Token:string,
  }){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_SELECT_SAVED_ADDRESS,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }
    public DeleteSavedAddress(
    data){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_DELETE_ADDRESS,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }
  public getAutoCompleteResult(
    lat,lang,search){
    let header =  new HttpHeaders().set('Api-Key', 'service.256bca0eabe743fbb4afa4e7cfc1f35a');
    return this.http.get(`https://api.neshan.org/v1/search?term=${search}&lat=${lat}&lng=${lang}`,{headers:header}).pipe( catchError(error => {
      console.log(error);
      return of(error)})
    )
  }
  public SelectMyRequest(
    data:{
      Token:string,
  }){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_SELECT_MY_REQUEST,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }

 public DeleteMyRequest(
    data){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_DELETE_MY_REQUEST,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }
 public SelectProfile_Driver(
    data:{
      RequestId:number,
      Token:string,
  }){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_SELECT_PROFILE_DRIVER,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }

 public Check_Comment(
    data:{
      Token:string,
  }){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_Check_Comment,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }
 public Insert_Comment(
    data:{
      Token:string,
      Rank:number,
      RequestId:any,
      Comment:string
  }){
    return this.http.post(this.API_URL+ this.API_ENDPOINT_INSERT_DRIVER_Comment,data).pipe(catchError(error => {
      console.log(error);
      return of(error)})
    )
  }


}
