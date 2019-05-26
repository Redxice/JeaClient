import { Injectable } from '@angular/core';
import {Message} from "../models/Message";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = "http://localhost:8080/JEA/api/";
  private source: EventSource;
  constructor(private http: HttpClient) {
  }

  postMessage(message: Message):Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      })
    };
    return this.http.post<any>(this.url + "messages", message, httpOptions);

  }

  reactMessage(message: any,id:string):Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      })
    };
    return this.http.post<any>(this.url + "messages/"+id, message, httpOptions);
  }

  getUserMessage(id: string) :Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      })
    };
    return this.http.get<any>(this.url + "users/"+id+"/messages", httpOptions);
  }
}
