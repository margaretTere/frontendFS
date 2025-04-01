import { Injectable } from '@angular/core';
import { User } from '../data-models/user-type';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql/user.queries';
import { SIGNUP } from '../graphql/user.mutations';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  users: User[] = [];
 
  constructor(private router: Router, private apollo: Apollo) {}

  login(user: User) {
    const emailOrUsername = user.email;
    const password = user.password;

    return this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        emailOrUsername,
        password
      }
    }).pipe(
      tap((response: any) => {
        if (response.data?.login) {
          this.storeToken(response.data.login);
        }
      })
    );
  }

  addUser(user: User) {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        username: user.username,
        email: user.email,
        password: user.password
      }
    }).pipe(
      tap((response: any) => {
        if (response.data?.signup) {
          const { email, username } = response.data.signup;
          console.log('User signed up:', username, email);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
