import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {

  users: User[] = [];
  length: number = 0;
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'dni', 'fullName', 'email', 'acciones'];

  page: number = 0;
  size: number = 10;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAll(this.page, this.size);
  }

  changePage(event: PageEvent){
    this.getAll(event.pageIndex, event.pageSize);
  }

  getAll(page: number, size: number){
    this.userService.getAll(page, size)
      .subscribe(
        paginationUsers => {
          this.length = paginationUsers.totalElements;
          this.users = paginationUsers.content;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;
        }
      )
  }


}
