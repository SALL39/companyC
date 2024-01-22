import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private credentailsSvc: CredentialsService, private router: Router) { }
  canActivate() {
    if (!this.credentailsSvc.isAuthenticated()) {
      this.router.navigate(['/admin/login']);
      return false;
    }
    return true;
  }
}
