import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Forum} from "../models/Forum";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private url = "http://localhost:8080/JEA/api/";
  private source: EventSource;
  newForum: Subject<Forum> = new Subject<Forum>();

  constructor(private http: HttpClient) {
  }

  getAllForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.url + "forums");
  }

  postForum(forum: Forum): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem("token")
      })};
    return this.http.post<any>(this.url+"forums", forum,httpOptions);
  }

  connectToForums() {
    this.source = new EventSource(this.url + "forums/" + "subscribe");
    this.source.addEventListener('message', event => {
      // alert((message as any).data);
      const forum = JSON.parse(((event as any).data));
      this.newForum.next(forum);
    });
  }
}
