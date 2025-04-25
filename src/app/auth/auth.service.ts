import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, User, getAuth, updateProfile } from '@angular/fire/auth';
import {BehaviorSubject, from, Observable, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null);

  constructor(private auth: Auth) { }

  register(email: string, password: string, firstName: string, lastName:string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap((userCredential) => {
          const user = userCredential.user;
          return from(updateProfile(user, {displayName: `${firstName} ${lastName}`} ))
            .pipe(
              switchMap(() => {
                this.user$.next(user);
                return [user];
              })
            );
        })
      );
  }

  getCurrentUser() {
    return this.user$.asObservable();
  }
}
