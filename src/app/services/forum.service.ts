import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Forum} from "../models/Forum";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private url = "http://localhost:8080/JEA/api/";

  constructor(private http: HttpClient) {
  }

  getAllForums():Observable<Forum[]> {
    return this.http.get<Forum[]>(this.url+"forums");
  }
}
