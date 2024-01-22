import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any
  constructor(private spinner: NgxSpinnerService, private userSvc: UserService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userSvc.getAllUser().subscribe(
      (res: any) => {
        this.users = res.data;
        this.users.map((p: any) => {
          if (p.user_type == 1) {
            p.user_type_name = "CEO";
          } else if (p.user_type == 2) {
            p.user_type_name = "CHIEF OF DEPARTMENT";
          } else if (p.user_type == 3) {
            p.user_type_name = "EMPLOYEE";
          }
        })
      }
    )
  }

  edit(item: any) {
    this.router.navigate(['/admin/user/edit', item.id])
  }

  delete(item: any) {
    if (confirm("Are you sure to delete?")) {
      this.userSvc.deleteUserById(item.id).subscribe(
        (res: any) => {
          this.toastr.success("User deleted successfully");
          this.getAllUsers()
        }
      )
    }
  }

}
