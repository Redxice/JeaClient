import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Forum} from "../models/Forum";
import {ForumService} from "../services/forum.service";

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  forums: Forum[];
  inCreation = false;
  constructor(private router: Router,
              private forumService: ForumService) {

  }

  ngOnInit() {
    this.forumService.getAllForums().subscribe(forums => {
      this.forums = forums
    })
  }

  createForum() {

  }

}
