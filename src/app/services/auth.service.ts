import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080/JEA/api/";

  constructor(private http: HttpClient) {
  }

  Login(username: string, password: string):Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+username+":"+password})

    return this.http.post<any>(this.url+"authentication",{},{headers:headers,
      observe:"response" as 'body'});
  }
  Register(username: string, password: string,email:string,twoFactorEnabled: boolean):Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+username+":"+password
      })};

    return this.http.post<any>(this.url+"users",
      JSON.stringify({"email":email,"twoFactorEnabled":twoFactorEnabled}),httpOptions);
  }

  SendTwoFactorCode(code: string,username: string, password: string):Observable<HttpResponse<any>>  {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+username+":"+password});

    return this.http.post<any>(this.url+"authentication/2fa",code,{headers:headers,
      observe:"response" as 'body'});
  }
}
