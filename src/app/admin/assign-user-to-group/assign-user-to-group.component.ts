import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assign-user-to-group',
  templateUrl: './assign-user-to-group.component.html',
  styleUrls: ['./assign-user-to-group.component.scss']
})
export class AssignUserToGroupComponent implements OnInit {
  groups: any;
  users: any;
  user: any;
  addusermodal: any;
  group: any;
  groupusers: any;
  constructor(private groupSvc: GroupService, private modalSvc: NgbModal, private userSvc: UserService,
    private spinnerSvc: SpinnerVisibilityService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getGroups();
    this.getAllUsers();
  }

  getGroups() {
    this.groupSvc.getAdminGroups().subscribe(
      (res: any) => {
        this.groups = res.data;
        if (this.groups.length > 0) {
          this.group = this.groups[0];
          this.getGroupUsers();
        }
      }
    );
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

  getGroupUsers() {
    this.groupSvc.getGroupUsers(this.group.id).subscribe(
      (res: any) => {
        this.groupusers = res.data;
        this.groupusers.map((p: any) => {
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

  selectGroup(event: any) {
    const found = this.groups.find((p: any) => Number(p.id) == Number(event.target.value))
    if (found) {
      this.group = found;
      this.getGroupUsers();
    }
  }

  openAddUserModal(modal: any) {
   this.addusermodal = this.modalSvc.open(modal);
  }

  addUserToGroup() {
    if (this.user) {
      this.groupSvc.assignUserToGroup({user_id: this.user, group_id: this.group.id}).subscribe(
        (res: any) => {
          this.toastr.success("User has been added to group successfully")
          if (this.addusermodal) {
            this.addusermodal.dismiss();
          }
          this.getGroupUsers();
        },
        (err: any) => {
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message);
          }
        }
      )
    }
  }

  delete(item: any) {
    if (confirm("Are you sure to delete?")) {
      this.groupSvc.deleteGroupUser({userid: item.user_id, groupid: this.group.id}).subscribe(
        (res: any) => {
          this.toastr.success("User deleted successfully from group")
          this.getGroupUsers();
        }
      )
    }
  }
}
