import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/services/api-call.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any;
  iserror = false;
  constructor(private fb: FormBuilder,
    private userSvc: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.iserror = false;
    console.log(this.changePasswordForm)
    if (this.changePasswordForm.invalid) {
      this.iserror = true;
      return;
    } else if (this.changePasswordForm.value.new_password != this.changePasswordForm.value.confirm_password) {
      this.toastr.error("New password and confirm password does not matched");
      return;
    }

    this.userSvc.changePassword(this.changePasswordForm.value).subscribe(
      (res: any) => {
        this.changePasswordForm.reset();
        this.toastr.success("Password has been changed successfully");
      },
      (err: any) => {
        if (err.error && err.error.message) {
          this.toastr.success(err.error.message);
        }
      }
    )
  }

}
