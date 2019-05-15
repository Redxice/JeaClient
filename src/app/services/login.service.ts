import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://localhost:8080/JEA/api/";

  constructor(private http: HttpClient) {
  }

  Login(username: string, password: string):Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+username+":"+password

      })};

    return this.http.post<any>(this.url+"authentication",{},httpOptions);
  }
  Register(username: string, password: string,email:string,twoFactorEnabled: boolean):Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+username+":"+password
      })};

    return this.http.post<any>(this.url+"users",JSON.stringify({"email":email,"twoFactorEnabled":twoFactorEnabled}),httpOptions);
  }
}
