import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AssignUserToGroupComponent } from './assign-user-to-group/assign-user-to-group.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BulkImportUserComponent } from './bulk-import-user/bulk-import-user.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    AddUserComponent,
    UserComponent,
    GroupComponent,
    AssignUserToGroupComponent,
    ChangePasswordComponent,
    BulkImportUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AdminRoutingModule,
    NgbModule
  ],
  providers: [
    
  ]
})
export class AdminModule { }
