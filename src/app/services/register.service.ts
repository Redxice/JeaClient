import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = "http://localhost:8080/JEA/api/users";

  constructor(private http: HttpClient) {
  }

  Register(username: string, password: string,email:string,twoFactorEnabled: boolean):Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'username': username,
        'password':password
      })};

    return this.http.post<any>(this.url,{"email":email,"twoFactorEnabled":twoFactorEnabled},httpOptions);
  }
}
