import {Injectable} from '@angular/core';
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
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      })
    };
    return this.http.post<any>(this.url + "forums", forum, httpOptions);
  }

  connectToForums() {
    this.source = new EventSource(this.url + "forums/" + "subscribe");
    this.source.addEventListener('message', message => {
        const forum = JSON.parse(((message as any).data));
        if (forum.owner_id != JSON.parse(localStorage.getItem("current_user")).id) {
          this.newForum.next(forum);
        }
      }
    );
  }

  getForum(forumId: string): Observable<Forum>{
    return this.http.get<Forum>(this.url + "forums"+"/"+forumId);
  }

  deleteForum(forum: Forum):Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      })
    };
    return this.http.delete(this.url+"forums/"+forum.id,httpOptions);
  }
}
