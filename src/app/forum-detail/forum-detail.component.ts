import {Component, Input, OnInit} from '@angular/core';
import {Forum} from "../models/Forum";
import {ActivatedRoute} from "@angular/router";
import {ForumService} from "../services/forum.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/User";
import {Message} from "../models/Message";
import {MessageService} from "../services/message.service";
import {of} from "rxjs";

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {
  forumDetailForm: FormGroup;
  submitted = false;
  @Input()forum:Forum;
  content:string;

  constructor( private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               private forumService:ForumService,
               private messageService:MessageService) { }

  ngOnInit() {
    this.forumDetailForm = this.formBuilder.group({
      messageNew: ['', Validators.required]
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
  addControl(id):string{
    this.forumDetailForm.addControl(id,this.formBuilder.control(''))
    return id;
  }

  postMessage(){
    this.submitted = true;
    const content = this.form.messageNew.value;
    this.messageService.postMessage( this.createMessage(content)).subscribe(resp => {
        this.forum.messageDtos.push(resp);
      });
  }
  createMessage(content):any{
    const id = JSON.parse(localStorage.getItem("current_user")).id;
    return new Message(id,content,this.forum.id,[],"");
  }
  postReaction(id){
    this.messageService.reactMessage(this.createMessage(this.forumDetailForm.get(id.toString()).value),id.toString()).subscribe(resp => {
      this.forum.messageDtos.find(message=> message.id == resp.id).reactions = resp.reactions;
      this.forum.messageDtos.find(message=> message.id == resp.id).username = resp.username;
    });
    // console.log( this.forumDetailForm.get(id).value);

  }

}
