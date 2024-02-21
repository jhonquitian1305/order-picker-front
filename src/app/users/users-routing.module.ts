import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { NewUserComponent } from './pages/new-user/new-user.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListUsersComponent
  },
  {
    path: 'new',
    component: NewUserComponent
  },
  {
    path: 'edit/:id',
    component: NewUserComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
