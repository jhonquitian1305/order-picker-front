import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';

import { UsersRoutingModule } from './users-routing.module';

import { ListUsersComponent } from './pages/list-users/list-users.component';


@NgModule({
  declarations: [
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatIconModule,
    MatSortModule
  ]
})
export class UsersModule { }
