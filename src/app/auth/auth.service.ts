import {Injectable, NgZone} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  User,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged
}
  from '@angular/fire/auth';
import {Firestore, doc, setDoc} from '@angular/fire/firestore';
import {BehaviorSubject, from, Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null);
  private token$ = new BehaviorSubject<string | null>(null);

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private ngZone: NgZone
  ) {
    this.initializeAuthState();
    this.loadTokenFromStorage();
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap((userCredential) => {
          const user = userCredential.user;
          return this.updateTokenObservable(user);
        })
      )
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        this.user$.next(null);
        this.token$.next(null);
        localStorage.removeItem('token');
      });
  }

  private initializeAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      console.log('User from Firebase:', user);
      this.ngZone.run(() => {
        this.user$.next(user);
        if (user) {
          this.updateToken(user);
        } else {
          this.token$.next(null);
          localStorage.removeItem('token');
        }
      })
    })
  }

  private loadTokenFromStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token$.next(token);
    }
  }

  private updateToken(user: User) {
    from(user.getIdToken(true)).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.token$.next(token);
      },
      error: (err) => {
        this.token$.next(null);
        localStorage.removeItem('token');
      }
    })
  }

  registerUser(email: string, password: string, firstName: string, lastName: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(userCredential => {
          const user = userCredential.user;
          return from(updateProfile(user, {displayName: `${firstName} ${lastName}`}))
            .pipe(
              switchMap(() => this.saveUserToFirestore(user)),
              switchMap(() => this.updateTokenObservable(user))
            )
        })
      )
  }

  private saveUserToFirestore(user: User): Observable<void> {
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return from(setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      createdAt: new Date()
    }))
  }

  private updateTokenObservable(user: User): Observable<User> {
    return from(user.getIdToken(true)).pipe(
      switchMap((token) => {
        localStorage.setItem('token', token);
        this.token$.next(token);
        return of(user);
      })
    );
  }

  get isAuth() {
    if (!this.token$.value) {
      this.token$.next(localStorage.getItem('token'));
    }
    return !!this.token$.value;
  }

  getCurrentUser() {
    return this.user$.asObservable();
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
