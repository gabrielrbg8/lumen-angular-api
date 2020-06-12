import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private router: Router) { }

  create(credentials : {name : string, email : string, password : string , password_confirmation : string, profile_id: number}): Observable<boolean>{
    return this.http.post<any>(`${environment.baseUrl}/api/user/create`, credentials)
      .pipe(
        tap(data =>{ console.log(data)})
      )
    }
  }
