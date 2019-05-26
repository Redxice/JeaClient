import {User} from "../models/User";
import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import { Location } from '@angular/common';
import {Message} from "../models/Message";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user:User;
  messages:Message[];
  constructor( private route: ActivatedRoute,
               private userService: UserService,
               private location: Location,
               private messageService:MessageService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
    this.messageService.getUserMessage(id)
      .subscribe(messages =>
      this.messages = messages)
  }
  goBack():void{
    this.location.back();
  }

}
