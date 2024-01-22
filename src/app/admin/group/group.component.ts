import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  iserror = false;
  groupForm: FormGroup;
  groups: any = []
  selectedItem: any;

  constructor(private fb: FormBuilder, private groupSvc: GroupService,
    private loaderSvc: SpinnerVisibilityService, private toastr: ToastrService) { 
    this.groupForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

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

   edit(item: any) {
    this.selectedItem = item;
    this.groupForm.get('name')?.setValue(item.name);
   }

   delete(item: any) {
    if (confirm('Are you sure to delete?')) {
      this.groupSvc.deleteGroupByAdmin(item.id).subscribe(
        (res: any) => {
          this.toastr.success('Data deleted successfully')
          this.getGroups();
        },
        (err: any) => {
          console.log(err.error)
          if (err.error.hasOwnProperty('message')) {
            this.toastr.error(err.error.message);
          }
        }
      );
    }
   }

   onSubmit(): any{
     this.iserror = false;
     if (this.groupForm.invalid) {
       this.iserror = true;
       return false;
     }

     this.loaderSvc.show();
     const data = this.groupForm.value;
     if (this.selectedItem) {
       data.id = this.selectedItem.id;
     }
     this.groupSvc.storeGroup(data).subscribe(
       (res: any) => {
         this.loaderSvc.hide();
         this.toastr.success("Group has been saved successfully");
         this.groupForm.reset();
         this.selectedItem = null;
         this.getGroups();
       },
       (err: any) => {
         this.loaderSvc.hide();
         if (err.error.hasOwnProperty('message')) {
           this.toastr.error(err.error.message);
         }
         if (err.error.hasOwnProperty('validationError')) {
           if (err.error.validationError.hasOwnProperty('name')) {
            this.toastr.error(err.error.validationError.name);
           }
         }
       }
     );
   }
}
