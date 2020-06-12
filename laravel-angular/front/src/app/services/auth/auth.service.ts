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
export class AuthService {

  constructor(private http : HttpClient, private router: Router) { }

  checkAuth () : boolean {return localStorage.getItem('token') ? true : false }

  login(credentials : {email : string, password : string }): Observable<boolean>{
    return this.http.post<any>(`${environment.baseUrl}/auth/login`, credentials)
      .pipe(
        tap(data =>{ localStorage.setItem('token', data.access_token); this.setUser()})
      )
    }

  logout() : void {
    this.http.post<any>(`${environment.baseUrl}/auth/logout`, '').subscribe(res => {
      localStorage.clear();
      this.router.navigate(['']);
    });
  }

  getUser() : User{
    return JSON.parse(localStorage.getItem('user')) ?? null;
  }

  setUser() {
    this.http.post<any>(`${environment.baseUrl}/auth/me`, '').subscribe(res => {
      return localStorage.setItem('user', JSON.stringify(res));
    })
  }
}
