import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {UserService} from '../services/users/user.service';
import { User } from '../services/interfaces/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, public router : Router, private authService : AuthService, private userService : UserService) { }
  
  f : FormGroup;
  errorAttributes = false;
  successForm = false;
  messageForm = '';
  isLoading = false;

  ngOnInit(): void {
    if(this.authService.checkAuth()){ 
      this.f = this.formBuilder.group({
        name : [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password :[null, [Validators.required]],
        profile_id :[null, [Validators.required]]

      });
    } else{
      this.router.navigate(['']);
    }
  }

  onSubmit(){
    this.isLoading = true;

    this.userService.create(this.f.value).subscribe(
      (res) => {
        this.isLoading = false;

        let resp = JSON.stringify(res);
        this.messageForm = 'Operação realizada com sucesso.';
        if(JSON.parse(resp).id != '' || JSON.parse(resp).id != undefined || JSON.parse(resp).id != null){
          this.successForm = true;
          this.f.reset();
        } else{
          this.errorAttributes = true;
        }
      },
      (err : HttpErrorResponse) => {
        this.isLoading = false;

        console.log(err);
        const erro = JSON.stringify(err);
        this.messageForm = 'Falha ao criar usuário.';
        this.errorAttributes = true;
      }
    );
  }
  formReset() {
    this.f.reset();
    this.successForm = false;
    this.messageForm = '';
    this.errorAttributes = false;
  }

}
