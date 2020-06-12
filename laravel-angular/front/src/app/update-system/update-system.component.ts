import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SystemService } from '../services/system/system.service';
import { System } from '../services/interfaces/system';
import { TryCatchStmt } from '@angular/compiler';


@Component({
  selector: 'update-system',
  templateUrl: './update-system.component.html',
  styleUrls: ['./update-system.component.css']
})
export class UpdateSystemComponent implements OnInit {

  f: FormGroup;
  id = '';
  initials = '';
  email = '';
  description = '';
  url = '';
  status = '';
  created_at = '';
  updated_at = '';
  system: Object;
  jsonSystem ;
  jsonLast;
  lastMod: Object;
  lastModDate = '';
  lastModUser = '';
  lastModJust = '';

  errorAttributes = false;
  successForm = false;
  messageForm = '';
  isLoading = false;
  noMod = false;
  existsData = false;
  systemId = this.route.snapshot.paramMap.get('id');

  constructor(private formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute, private authService: AuthService, public systemService: SystemService) { }
  ngOnInit(): void {
    if (this.authService.checkAuth()) {

      this.systemService.view(this.systemId);
      this.systemService.lastMod(this.systemId);
      this.system = this.systemService.getSystem();
      this.lastMod = this.systemService.getLastMod();

      const temp = JSON.stringify(this.system);
      this.jsonSystem = JSON.parse(temp);

      const temp1 = JSON.stringify(this.lastMod);
      this.jsonLast = JSON.parse(temp1);

      if(this.jsonLast.data === 'Nenhuma alteração foi feita nesse sistema.'){
        this.noMod = true;
      }
      this.existsData = true;


      this.f = this.formBuilder.group({
        description: [this.jsonSystem.data.description, [Validators.required]],
        email: [this.jsonSystem.data.email, [Validators.email]],
        initials: [this.jsonSystem.data.initials, [Validators.required]],
        status: [this.jsonSystem.data.status, [Validators.required]],
        url: [this.jsonSystem.data.url, []],
        justification: [null, [Validators.required]],
      });



    } else {
      this.router.navigate(['']);
    }
  }

  initForm() {
    this.isLoading = true;
    const data = this.systemService.getSystem();

    const temp = JSON.stringify(data);
    const resp = JSON.parse(temp);

    this.description = resp.data.description;
    this.initials = resp.data.initials;
    this.email = resp.data.email;
    this.url = resp.data.url;
    this.status = resp.data.status;
    this.existsData = true;

    const data2 = this.systemService.getLastMod();
    const temp2 = JSON.stringify(data2);
    const resp2 = JSON.parse(temp2);

    if (resp.data == "Nenhuma alteração foi feita nesse sistema.") {
      this.noMod = true;
    } else {
      this.lastModDate = resp2.data.date;
      this.lastModJust = resp2.data.justification;
      this.lastModUser = resp2.data.user;
    }

    this.isLoading = false;

  }


  initLastMod() {

    this.systemService.lastMod(this.systemId);
    const data = this.systemService.getLastMod();
    const temp = JSON.stringify(data);
    const resp = JSON.parse(temp);

    if (resp.data == "Nenhuma alteração foi feita nesse sistema.") {
      this.noMod = true;
    } else {
      this.lastModDate = resp.data.date;
      this.lastModJust = resp.data.justification;
      this.lastModUser = resp.data.user;
    }
  }



  onSubmit(id) {
    this.isLoading = true;

    this.systemService.update(id, this.f.value).subscribe(
      (res) => {
        this.isLoading = false;
        let resp = JSON.stringify(res);
        this.messageForm = JSON.parse(resp).message;
        if (JSON.parse(resp).status_code == 200) {
          this.successForm = true;
          this.f.reset();
        } else {
          this.errorAttributes = true;
        }
      },
      (err: HttpErrorResponse) => {
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
