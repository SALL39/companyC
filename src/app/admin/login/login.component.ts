import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CredentialsService } from '../../services/credentials.service';
import { appInfo } from '../../../app/appinfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  iserror = false;
  appInfo = appInfo
  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder,
              private router: Router, private credentialsSvc: CredentialsService,
              private userSvc: UserService, private toastr: ToastrService) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    // this.spinner.show()
    if (this.credentialsSvc.isAuthenticated()) {
      this.router.navigate(['/'])
    }
  }

  login(): any {
    this.iserror = false;
    if (this.loginForm.invalid) {
      this.iserror = true;
      this.toastr.error("Validation Error!")
      return false;
    }
    this.spinner.show()
    this.userSvc.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.router.navigate(['/'])
      },
      (err: any) => {
        console.log(err, "oo")
        this.spinner.hide()
        if(err.error.hasOwnProperty('message')) {
          this.toastr.error(err.error.message)
        }
      }
    )
  }

}
