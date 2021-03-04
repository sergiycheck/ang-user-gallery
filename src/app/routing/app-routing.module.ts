import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import { UserMessagesComponent } from "../user-messages/user-messages.component";
import { PersonalProfileComponent } from "../personal-profile/personal-profile.component";
import { ExploreComponent } from "../explore/explore.component";


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'messages',component:UserMessagesComponent},
  {path:'profile',component:PersonalProfileComponent},
  {path:'explore',component:ExploreComponent},
  {path:'',redirectTo: '/home',pathMatch: 'full'},//default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
