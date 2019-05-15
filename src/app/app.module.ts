import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import {AlertModule, BsModalService, ModalModule} from "ngx-bootstrap";
import { HeaderComponent } from './header/header.component';
import { ForumsComponent } from './forums/forums.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailComponent,
    LoginComponent,
    MessagesComponent,
    DashboardComponent,
    RegisterComponent,
    HeaderComponent,
    ForumsComponent,
    ForumDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
