import {Component, Input, OnInit} from '@angular/core';
import {Forum} from "../models/Forum";
import {ActivatedRoute} from "@angular/router";
import {ForumService} from "../services/forum.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/User";
import {Message} from "../models/Message";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {
  forumDetailForm: FormGroup;
  submitted = false;
  forum:Forum;
  constructor( private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               private forumService:ForumService,
               private messageService:MessageService) { }

  ngOnInit() {
    this.forumDetailForm = this.formBuilder.group({
      message_new: ['', Validators.required],
    });
    this.getForum();
  }
  get form(){
    return this.forumDetailForm.controls;
  }
  getForum(){
    const forumId = this.route.snapshot.paramMap.get('id');
    this.forumService.getForum(forumId)
      .subscribe(forum => this.forum = forum);
  }
  listenToMessages(){

  }
  postMessage(){
    this.submitted = true;
    const id = JSON.parse(localStorage.getItem("current_user")).id;
    const content = this.form.message_new.value;
    const emptyList = [];
    const message = new Message(id,content,this.forum.id,emptyList,"");
    this.messageService.postMessage(message).subscribe(resp => {
        this.forum.messageDtos.push(resp);
      });
  }

}
