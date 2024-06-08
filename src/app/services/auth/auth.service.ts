import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authWebviewEvent!: any;
  public isAuthenticated = false;
  public validCredentials: Subject<boolean> = new Subject<boolean>();
  protected _userName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userName$: Observable<string> = this._userName.asObservable();
  public securityFactor: string = '';

  getToken() {
    const identityHandler = (event: any) => {
      this.authWebviewEvent = event;
      this.validateSesionEvent(event);
    };
  }

  validateSesionEvent(detail: any) {
    if (this.isValidAuthEventWeb(detail)) {
      this.isAuthenticated = true;
      this.validCredentials.next(true);
    }
  }

  isValidAuthEventWeb(event: any) {
    this.authWebviewEvent = {
      ...event,
    };
    return event.channel && event.cif && event.device && event.xsrf;
  }

}
