import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { SystemService } from '../services/system/system.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


class System {
  id: number;
  initials: string;
  email: string;
  description: string;
  url: string;
  status: string;
  created_at: string;
  updated_at: string;
}


@Component({
  selector: 'search-system',
  templateUrl: './search-system.component.html',
  styleUrls: ['./search-system.component.css']
})
export class SearchSystemComponent implements OnInit {

  f: FormGroup;
  isLoading = false;
  email: '';
  initials: '';
  description: '';
  errorAttributes = false;
  existsData = false;
  errorAttributesMessage = '';
  systems: System[];
  pag: number = 1;
  firstPage: number = 1;
  lastPage: number = 0;
  counter: number = 5;

  constructor(private http: HttpClient, public systemService: SystemService, public formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    if (!this.authService.checkAuth()) { this.router.navigate(['']); }
    localStorage.removeItem('system');
    localStorage.removeItem('lastMod');
    this.f = this.formBuilder.group({
      email: [null, [Validators.email]],
      description: [null, []],
      initials: [null, []],

    });
  }
  onSubmit() {
    this.isLoading = true;
    const email = this.email;
    const initials = this.initials;
    const description = this.description;
    this.http.post<any>(`${environment.baseUrl}/api/system/search`, { email, initials, description }).subscribe(res => {
      this.lastPage = res.data.total / 5;
      if (res.message) {
        if (res.error !== '') {
          this.isLoading = false;
        }
        this.errorAttributes = true;
        this.errorAttributesMessage = res.message;

      } else {
        this.isLoading = false;
        this.systems = res.data.data;
        this.existsData = true;
      }
    })
  }

  formReset() {
    this.f.reset();
    this.systems = null;
    this.existsData = false;
    this.errorAttributes = false;
  }

  newSystem() {
    if (!this.authService.checkAuth()) { this.router.navigate(['']); }
    this.router.navigate(['create-system']);
  }

  editSystem(id) {
    this.router.navigate(['update-system', id])
  }

}



