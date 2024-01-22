import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AssignUserToGroupComponent } from './assign-user-to-group/assign-user-to-group.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BulkImportUserComponent } from './bulk-import-user/bulk-import-user.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'user/add',
        component: AddUserComponent
      },
      {
        path: 'user/edit/:id',
        component: AddUserComponent
      },
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'user/bulk-import',
        component: BulkImportUserComponent
      },
      {
        path: 'groups',
        component: GroupComponent
      },
      {
        path: 'assign-user-to-group',
        component: AssignUserToGroupComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]

  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
