import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { System } from '../interfaces/system';


@Injectable({
  providedIn: 'root'
})
export class SystemService {
  constructor(private http: HttpClient, private router: Router) { }

  create(parameters: { description: string, email: string, initials: string, url: string, status: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.baseUrl}/api/system/create`, parameters)
      .pipe(
        tap(data => { console.log(data.message) })
      )
  }

  update(id, parameters: {justification:string, description: string, email: string, initials: string, url: string, status: string }): Observable<boolean> {
    return this.http.put<any>(`${environment.baseUrl}/api/system/update/${id}`, parameters)
      .pipe(
        tap(data => { console.log(data) })
      )
  }

  getSystem(): Object {
    return JSON.parse(localStorage.getItem('system')) ?? null;
  }
  
  getLastMod(): Object {
    return JSON.parse(localStorage.getItem('lastMod')) ?? null;
  }

  view(id) {
    this.http.get<any>(`${environment.baseUrl}/api/system/view/${id}`).subscribe(res => {
      return localStorage.setItem('system', JSON.stringify(res));
    })
  }

  lastMod(id) {
    this.http.get<any>(`${environment.baseUrl}/api/system/last-modification/${id}`).subscribe(res => {
      return localStorage.setItem('lastMod', JSON.stringify(res));
    })
  }
}
