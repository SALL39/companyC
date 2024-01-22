import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { objectToFormData } from './ObjectToFormData';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  apiURL = environment.serverURL
  endpoints: any = {
    login: 'admin/login',
    storeUser: 'admin/store-user',
    users: 'admin/users',
    user: 'admin/user',
    deleteUser: 'admin/delete-user',
    storeGroup: 'admin/group/store',
    getGroupsByAdmin: 'admin/groups',
    deleteGroupsByAdmin: 'admin/group/delete',
    assignUserToGroup: 'admin/group/assign-user',
    getGroupUsers: 'admin/group/users',
    deleteGroupUser: 'admin/group/user/delete',
    changePassword: 'admin/change-password',
    uploadUsers: 'admin/upload-user'
  }
  constructor(private http: HttpClient) { }

  postCall(endpointKey: string, formValue: any, isFile = false) {
    console.log(this.apiURL + this.endpoints[endpointKey])
    if (isFile) {
      formValue = objectToFormData(formValue)
    }
    return this.http.post(this.apiURL + this.endpoints[endpointKey], formValue)
  }

  getCall(endpointKey: string, queryParams = '') {
    return this.http.get(this.apiURL + this.endpoints[endpointKey] + queryParams)
  }
}
