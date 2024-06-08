import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject(false);
  private _userName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userName$: Observable<string> = this._userName.asObservable();

  logIn() {
    setTimeout(() => {
      this.isAuthenticated.next(true)
    }, 3000)
  }

}
