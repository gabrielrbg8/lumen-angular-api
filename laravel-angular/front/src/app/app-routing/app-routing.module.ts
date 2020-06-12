import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { CreateUserComponent } from '../create-user/create-user.component';

import { CreateSystemComponent } from '../create-system/create-system.component';
import { SearchSystemComponent } from '../search-system/search-system.component';
import { UpdateSystemComponent } from '../update-system/update-system.component';


const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'create-user', component: CreateUserComponent },
    { path: 'create-system', component: CreateSystemComponent },
    { path: 'update-system/:id', component: UpdateSystemComponent },
    { path: 'search-system', component: SearchSystemComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }