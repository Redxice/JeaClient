import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Forum} from "../models/Forum";
import {ForumService} from "../services/forum.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/User";

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  forums: Forum[];
  forumForm: FormGroup;
  submitted = false;
  error = false;
  user: User;
  filterForums: Forum[];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private forumService: ForumService) {

  }

  ngOnInit() {
    this.forumForm = this.formBuilder.group({
      title: ['', Validators.required],
      tag: ['', Validators.required]
    });
    this.forumService.getAllForums().subscribe(forums => {
      this.forums = forums;
      this.filterForums = this.forums;
    });
    this.forumService.connectToForums()
    this.getNewForums();
  }

  get form() {
    return this.forumForm.controls;
  }

  getNewForums() {
    this.forumService.newForum.subscribe(forum => {
      this.forums.unshift(forum);
    });
  }

  createForum() {
    this.submitted = true;
    const id = JSON.parse(localStorage.getItem("current_user")).id;
    const forum = new Forum(this.form.tag.value, id, this.form.title.value,[]);
    this.forumService.postForum(forum).subscribe(resp => {
        this.forums.push(resp);
        this.error = false;
      },
      error => this.error = true)
  }
  goToForum(forum:Forum){
    this.router.navigateByUrl("forum/"+forum.id)
}
  search(tag: string) {
    if (!tag) {
      this.filterForums = this.forums;
    } else {
      this.filterForums = this.forums.filter(forum =>
        forum.tag.trim().toLowerCase().includes(tag.trim().toLowerCase())
      );
    }
  }
}
