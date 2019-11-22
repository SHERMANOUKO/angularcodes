import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApidataService {
  //sets the base url
  apiUrl: string = 'http://xx.xx.xx.xx:9000/'

  constructor(private httpClient:HttpClient) { }
  
  //set the no auth custom header for request that wont need authorization
  headers = new HttpHeaders({'No-Auth':'True'});
    
  //posts data to open routes
  postUnauthData(data,apiEndPoint){
    return this.httpClient.post<any>(this.apiUrl+apiEndPoint,data,{headers: this.headers});
  }

  //posts data to closed routes
  postAuthData(data,apiEndPoint){
    return this.httpClient.post<any>(this.apiUrl+apiEndPoint,data)
  }

  //put request to closed routes
  putAuthData(data,apiEndPoint){
    return this.httpClient.put<any>(this.apiUrl+apiEndPoint,data)
  }

  //handles post requests whose content-type is formdata
  postAuthDataFormData(data,apiEndPoint){
    return this.httpClient.post<any>(this.apiUrl+apiEndPoint,data)
  }

  //get request to closed routes
  getAuth(apiEndPoint){
    return this.httpClient.get<any>(this.apiUrl+apiEndPoint)
  }

  //get request to open routes
  getUnauth(apiEndPoint){
    return this.httpClient.get<any>(this.apiUrl+apiEndPoint,{headers: this.headers})
  }

  //get request for images
  getImages(apiEndPoint):Observable<Blob>{
    return this.httpClient.get(this.apiUrl+apiEndPoint,{responseType: "blob"})
  }
}
