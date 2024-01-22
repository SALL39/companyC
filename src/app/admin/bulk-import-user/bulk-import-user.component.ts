import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulk-import-user',
  templateUrl: './bulk-import-user.component.html',
  styleUrls: ['./bulk-import-user.component.scss']
})
export class BulkImportUserComponent implements OnInit {
  users: any = []
  groups: any;
  constructor(private groupSvc: GroupService,private spinner: NgxSpinnerService, private userSvc: UserService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.groupSvc.getAdminGroups().subscribe(
      (res: any) => {
        this.groups = res.data;
      }
    );
   }

  onFileChange(ev: any) {
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.users = jsonData["Sheet 1"];
      this.users = this.users.filter((p: any) => p.user_type != 1).map((p: any) => {
        if (p.user_type == 1) {
          p.user_type_name = "CEO";
        } else if (p.user_type == 2) {
          p.user_type_name = "CHIEF OF DEPARTMENT";
        } else if (p.user_type == 3) {
          p.user_type_name = "EMPLOYEE";
        }
        p.group_name = "";
        if (p.group != 0) {
          const found = this.groups.find((q: any) => q.id == p.group);
          if (found) {
            p.group_name = found.name;
          }
        }
        return p;
      })
    }
    reader.readAsBinaryString(file);
  }

  uploadUser() {
    if (!this.users || this.users.length == 0) {
      this.toastr.error("User not found");
      return;
    }

    this.spinner.show();

    this.userSvc.uploadUsers({data: this.users}).subscribe(
      (res: any) => {
          this.spinner.hide();
          this.users = []
          this.toastr.success("User import has been done successfully")
      },
      (err: any) => {
        this.spinner.hide();
      }
    )
  }

}
