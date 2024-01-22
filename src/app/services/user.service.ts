import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiCallService } from './api-call.service';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiCallSvc: ApiCallService, private credentialsService: CredentialsService) { }

  login(formValue: any) {
    return this.apiCallSvc.postCall('login', formValue).pipe(
      map(
        (res: any) => {
          this.credentialsService.setCredentials(res, formValue.remember);
          sessionStorage.setItem('userName', res.user.username);
          return res;
        },
        (err: any) => {
          return err;
        }
      ))
  }

  storeAddUser(formValue: any) {
    return this.apiCallSvc.postCall('storeUser', formValue)
  }

  getAllUser() {
    return this.apiCallSvc.getCall('users')
  }

  getUserById(id: number) {
    return this.apiCallSvc.getCall('user', `?id=${id}`)
  }

  deleteUserById(id: number) {
    return this.apiCallSvc.getCall('deleteUser', `?id=${id}`)
  }

  changePassword(formValue: any) {
    return this.apiCallSvc.postCall('changePassword', formValue)
  }

  uploadUsers(formValue: any) {
    return this.apiCallSvc.postCall('uploadUsers', formValue)
  }

  logout() {
    this.credentialsService.setCredentials(undefined);
    sessionStorage.clear();
  }
}
