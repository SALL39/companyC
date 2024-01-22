import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiCallService } from './api-call.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  apiURL = environment.serverURL
  constructor(private apiCallSvc: ApiCallService) { }

  storeGroup(formValue: any) {
    return this.apiCallSvc.postCall('storeGroup', formValue)
  }

  getAdminGroups() {
    return this.apiCallSvc.getCall('getGroupsByAdmin')
  }

  deleteGroupByAdmin(id: any) {
    return this.apiCallSvc.getCall('deleteGroupsByAdmin', `?id=${id}`)
  }

  assignUserToGroup(formValue: any) {
    return this.apiCallSvc.postCall('assignUserToGroup', formValue);
  }

  getGroupUsers(group_id: number) {
    return this.apiCallSvc.getCall('getGroupUsers', `?group_id=${group_id}`)
  }

  deleteGroupUser(formValue: any) {
    return this.apiCallSvc.postCall('deleteGroupUser', formValue);
  }
}
