import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Credentials {
  // Customize received credentials here
  token: string;
  user: { first_name: string; last_name: string; username: string; email: string; usertype: number, id: number };
}

const credentialsKey = 'rapidadmin_key';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private _credentials: Credentials | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    console.log(savedCredentials)
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      if (this._credentials?.token) {
        sessionStorage.setItem("rapidadmin_key", JSON.stringify(this._credentials));
      }
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
      if (this._credentials?.token) {
        sessionStorage.setItem("rapidadmin_key", JSON.stringify(this._credentials));
      }    
    } else {
      localStorage.removeItem(credentialsKey);
      sessionStorage.removeItem(credentialsKey);
    }
  }
  // tslint:disable: jsdoc-format
  /**
   * Gets the user token from credentials.
   * @return The user token or null if the user is not authenticated.
   */
  get token(): any {
    return this._credentials ? this._credentials.token : null;
  }

  get userType(): number | null {
    return this._credentials ? this._credentials.user.usertype : null;
  }

  get userId() {
    return this._credentials ? this._credentials.user.id : null;
  }

  get policeStationName() {
    return this._credentials ? this._credentials.user.first_name : null;
  }
}
