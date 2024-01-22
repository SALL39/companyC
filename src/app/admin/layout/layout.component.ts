import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appInfo } from '../../appinfo';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  class:any = 'mi-expand';
  menus = [
    {
      url: '/admin',
      name: 'Home',
      icon:'fas fa-home'
    },
    {
      url: '/admin/user/add',
      name: 'Add New User',
      icon: 'fas fa-city'
    },
    {
      url: '/admin/user/bulk-import',
      name: 'Bulk Import User',
      icon: 'fas fa-city'
    },
    {
      url: '/admin/users',
      name: 'Manage User',
      icon: 'fas fa-city'
    },
    {
      url: '/admin/groups',
      name: 'Manage Groups',
      icon: 'fas fa-city'
    },
    {
      url: '/admin/assign-user-to-group',
      name: 'Assign User To Group',
      icon: 'fas fa-city'
    },
    {
      url: '/admin/change-password',
      name: 'Change Password',
      icon: 'fas fa-city'
    }
  ]
  appInfo = appInfo
  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
    this.setSidebarName()
  }

  setSidebarName(){
    const sidebarClass = sessionStorage.getItem('sidebar-class');
    if (sidebarClass ){
      this.class = sidebarClass;
    }
  }

  logout() {
    this.userSvc.logout();
    this.router.navigate(['/admin/login'])
  }

  eollapseExpand(){
    if(this.class == 'mi-expand'){
      this.class = 'mi-collapse';
    }else{
      this.class = 'mi-expand';
    }
    sessionStorage.setItem('sidebar-class',this.class);
  }

}
