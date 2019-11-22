import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Securities, Logouts } from './securities'
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { ApidataService } from './apidata.service';

//this code handles login and logout authentication
//the securities interface looks like:
// export interface Securities {
//    accessToken: string
//    expiresAt: string
//    state: boolean
//    userIdentifier: string
//    userType: string
//} 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private httpClient:HttpClient, private router:Router, private apidata:ApidataService) { }
  apiUrl: string = 'http://xx.xx.xx.xx:9000/'
  logoutInfo: Logouts =  {tokenn: localStorage.getItem('accessToken')}
  headers = new HttpHeaders({'No-Auth':'True'});


  login(data) {
    return this.httpClient.post<Securities>(this.apiUrl+'auth/login',data,{headers: this.headers})
    .pipe(tap<any>((res)=>{
      if(res.state){
        try {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('expiresAt', res.expiresAt);
          this.router.navigate(['home']);
        } catch (error) {
          //handle error
        }
      }
    }))
  }

  logout(){
    try {
      this.apidata.postAuthData(this.logoutInfo,'user/logOut').subscribe(
        (res)=>{
          if(res.code === 200){
            localStorage.removeItem('accessToken')
            localStorage.removeItem('expiresAt')
            localStorage.clear()
            this.router.navigate(['login']);
          }else{
            //handle error
          }
        },
        (err)=>{
            //handle error
        }
      )
    } catch (error) {
        //handle error
    }
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('accessToken') !==  null;
  }

  public isAuthenticated(){
    if(localStorage.getItem('accessToken') == null){
      return false
    }else{
      let date: Date = new Date()
      date.setTime(date.getTime()+(date.getTimezoneOffset()*60*1000)+10800000)
      let expiry = new Date(localStorage.getItem('expiresAt'))
      if(!expiry){
        return false
      }else{
        return (expiry > date)
      }
    }
  }
}
