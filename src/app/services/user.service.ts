import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {USERS} from "../mock/mock-users";
import {Observable, of} from "rxjs";
import {MessagesService} from "./messages.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8080/JEA/api/";
  constructor(private messagesService:MessagesService,
              private http: HttpClient) { }

  // getUsers():Observable<User[]>{
  //   this.messagesService.add('UserService: fetched Users');
  //   return of(USERS);
  // }
  // getUser(username:string):Observable<User>{
  //   this.messagesService.add(`UserService: fetched user name=${name}`)
  //   return of(USERS.find(user=>user.name === name));
  // }
  getUser(id):Observable<User>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      })
    };
    return this.http.get<User>(this.url + "users/"+id, httpOptions);
  }
}
