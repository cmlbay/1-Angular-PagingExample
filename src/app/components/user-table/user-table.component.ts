import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from 'src/app/services/user-service/userService.service';
import {PageEvent} from '@angular/material/paginator';

export interface UserPagingResponse{
  users:User[],
  totalElements:number
}

export interface User {
  id: number;
  name: string;
  surname: string;
  uniqueName: string;
  personalNumber: number;
  departmentCode: string;
  title: string;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  pagingResponse: UserPagingResponse;
  
  displayedColumns: string[] = ['id', 'ad', 'soyad', 'unvan', 'pernr'];
  pageSizeOptions:any[] = [5, 10, 25, 100];
  
  dataSource: MatTableDataSource<User>;
  
  length:number;
  pageSize:number;
  pageIndex:number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private userService: UserServiceService) {}

  ngOnInit() {
    this.userService.findUsersByPage(0, this.pageSizeOptions[0]).subscribe((data) => {
      this.pagingResponse = data;
      this.length = this.pagingResponse.totalElements;

      this.dataSource = new MatTableDataSource(this.pagingResponse.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onPageChange(event: PageEvent){

    this.userService.findUsersByPage(event.pageIndex, event.pageSize).subscribe((data) => {
      this.pagingResponse = data;
      this.length = 121;

      this.dataSource = new MatTableDataSource(this.pagingResponse.users);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
