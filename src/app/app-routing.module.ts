import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./auth/auth.guard";
import {ForumsComponent} from "./forums/forums.component";
import {ForumDetailComponent} from "./forum-detail/forum-detail.component";


const routes: Routes= [
  {path:'profile/:id', component: UserDetailComponent,canActivate: [AuthGuard]},
  // {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  {path:'login', component: LoginComponent },
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'register', component: RegisterComponent },
  {path:'forums', component: ForumsComponent,canActivate:[AuthGuard]},
  {path:'forum/:id',component:ForumDetailComponent,canActivate: [AuthGuard]}

];
@NgModule({
  exports:[ RouterModule],
  imports:[RouterModule.forRoot(routes)]
})
export class AppRoutingModule {

}
