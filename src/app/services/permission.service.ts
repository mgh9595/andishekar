import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private auth:AuthService) { }



  public load():Promise<any>{
    // this.loadingService.loadingStatus.next(true);
    return new Promise<any> (resolve=>{
        this.getStatus().subscribe(
          result=>{
            console.log(result);
            if(result){
              if(result.ResultCode==1){
                const permisson=['USER'];
                resolve(permisson)
              }
              else{
                const permisson=['GUEST'];
                resolve(permisson)
              }

            }
            else{
              const permisson=['GUEST'];
              resolve(permisson)
            }
          }
        );
      }
    )

  }




  public getStatus():Observable<any>{
    if(localStorage.getItem('Token'))
    {
      const data={
        Token:localStorage.getItem('Token')
      }
      return this.auth.SelectMyRequest(data).pipe(res=>res)
    }
    else return of(null);
  }

}
