import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit, AfterViewInit {

  users: User[] = [];
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['dni', 'fullName', 'email', 'acciones'];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {

  }

  constructor(
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe(
        paginationUsers => {
          this.users = paginationUsers.content;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;
          console.log(this.dataSource);
        }
      )
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
