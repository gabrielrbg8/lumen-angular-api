import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  f:FormGroup;
  errorCredentials = false;

  constructor(private formBuilder : FormBuilder, private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.checkAuth()){ this.router.navigate(['search-system']); }
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password :[null, [Validators.required]]
    });
  }

  onSubmit(){
      this.authService.login(this.f.value).subscribe(
        (res) => {this.router.navigate(['search-system'])},
        (err : HttpErrorResponse) => {
          if(err.status == 401){
            this.errorCredentials = true;
          }
        }
      );
    }

  }


