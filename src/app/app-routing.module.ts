import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user/user.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {RegisterComponent} from "./register/register.component";


const routes: Routes= [
  {path:'users', component: UserComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path:'detail/:username', component: UserDetailComponent},
  // {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  {path:'login', component: LoginComponent },
  {path:'register', component: RegisterComponent }
];
@NgModule({
  exports:[ RouterModule],
  imports:[RouterModule.forRoot(routes)]
})
export class AppRoutingModule {

}
