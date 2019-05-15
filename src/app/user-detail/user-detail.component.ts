import {User} from "../models/User";
import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user:User;
  constructor( private route: ActivatedRoute,
               private userService: UserService,
               private location: Location) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(username)
      .subscribe(user => this.user = user);
  }
  goBack():void{
    this.location.back();
  }

}
