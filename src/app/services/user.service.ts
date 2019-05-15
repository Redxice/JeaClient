import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {USERS} from "../mock/mock-users";
import {Observable, of} from "rxjs";
import {MessagesService} from "./messages.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private messagesService:MessagesService) { }

  getUsers():Observable<User[]>{
    this.messagesService.add('UserService: fetched Users');
    return of(USERS);
  }
  getUser(username:string):Observable<User>{
    this.messagesService.add(`UserService: fetched user username=${username}`)
    return of(USERS.find(user=>user.username ===username));
  }

}
