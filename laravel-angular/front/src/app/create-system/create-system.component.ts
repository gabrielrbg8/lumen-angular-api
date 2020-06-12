import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { SystemService } from '../services/system/system.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-system',
  templateUrl: './create-system.component.html',
  styleUrls: ['./create-system.component.css']
})
export class CreateSystemComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, public router : Router, private authService : AuthService, private systemService : SystemService) { }
  
  f : FormGroup;
  errorAttributes = false;
  successForm = false;
  messageForm = '';
  isLoading = false;


  ngOnInit(): void {
    if(this.authService.checkAuth()){ 
      this.f = this.formBuilder.group({
        description : [null, [Validators.required]],
        email: [null, [Validators.email]],
        initials :[null, [Validators.required]],
        status :[null, [Validators.required]],
        url :[null, []],

      });
    } else{
      this.router.navigate(['']);
    }
  }

  onSubmit(){
    this.isLoading = true;

    this.systemService.create(this.f.value).subscribe(
      (res) => {
        this.isLoading = false;

        let resp = JSON.stringify(res);
        this.messageForm = JSON.parse(resp).message;
        if(JSON.parse(resp).status_code == 200){
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
        this.messageForm = err.message;
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
