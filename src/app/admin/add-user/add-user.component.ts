import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup
  iserror = false;
  user: any;
  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private userSvc: UserService,
    private toastr: ToastrService, private route: ActivatedRoute) { 
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      user_type: ['', [Validators.required]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getUser(Number(id));
    } 
  }

  ngOnInit(): void {

  }

  getUser(id: number) {
    this.userSvc.getUserById(id).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.user = res.data[0];
          this.userForm = this.fb.group({
            first_name: [this.user.first_name, [Validators.required]],
            last_name: [this.user.last_name, [Validators.required]],
            phone_number: [this.user.phone_number, [Validators.required]],
            user_type: [this.user.user_type, [Validators.required]],
          });
        } else {
          this.user = null;
        }
      }
    );
  }

  onSubmit() {
    this.iserror = false;
    if (this.userForm.invalid) {
      this.iserror = true;
      return;
    }

    this.spinner.show();
    const data = this.userForm.value;
    if (this.user) {
      data.id = this.user.id;
    }
    this.userSvc.storeAddUser(data).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.userForm.reset();
        this.user = null;
        if (data.id) {
          this.toastr.success("User updated successfully")
        } else {
          this.toastr.success("User added successfully")
        }
      },
      (err: any) => {
        this.spinner.hide();
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message);
        } else if (err.error && err.error.validationError && err.error.validationError.phone_number) {
          this.toastr.error(err.error.validationError.phone_number);
        }
      }
    )

  }

}
