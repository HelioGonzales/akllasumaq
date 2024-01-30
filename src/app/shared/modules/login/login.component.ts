import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  isSubmitted = false
  authError = false
  authMessage = 'Email or Password are wrong'

  constructor(private authSvc: AuthService, private formBuilder: FormBuilder, private localStorageSvc: LocalstorageService, private router: Router) { }

  ngOnInit(): void {

    this._initForm()
  }


  private _initForm() {
    this.form = this.formBuilder.group({
      email: ['heliogonzalesr@gmail.com', [Validators.required, Validators.email]],
      passwordHash: ['123456', [Validators.required]],
    })
  }

  onSubmit() {
    this.isSubmitted = true

    if (this.loginForm['invalid']) return

    this.authSvc.login(this.loginForm['email'].value, this.loginForm['passwordHash'].value).subscribe(user => {
      this.authError = false
      this.localStorageSvc.setToken(user.token)
      this.router.navigateByUrl('/')

    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.authError = true

      if (err.status !== 400) {
        this.authMessage = "Error on the server, please try again later"
      }
    });

  }

  get loginForm() {
    return this.form.controls
  }
}
