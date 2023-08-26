import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable(
)
export class UserServiceService {

  private pathFindUserByPage: string =
    'http://localhost:8088/api/1.0/user/find-by-page/'; // {pageNumber}/{pageSize}

  constructor(private http: HttpClient) {}

  findUsersByPage(pageNumber: number, pageSize: number) {
    let path = this.pathFindUserByPage + pageNumber + '/' + pageSize;
    return this.http.get<any>(path).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
