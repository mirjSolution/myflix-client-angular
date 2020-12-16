import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { RegisterData, LoginData } from './auth.data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private username: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUser() {
    return this.username;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(
    username: string,
    password: string,
    email: string,
    birthday: Date
  ) {
    const authData: RegisterData = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };
    this.http.post('https://myflix3.herokuapp.com/users', authData).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(username: string, password: string) {
    const authData: LoginData = {
      username: username,
      password: password,
    };
    this.http
      .post<{ token: string; user: any }>(
        'https://myflix3.herokuapp.com/auth/login',
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          const username = response.user.username;
          this.token = token;
          this.username = username;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(username, token);
          this.router.navigate(['movies']);
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (authInformation.token === null) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(username: string, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return {
      token: token,
      username: username,
    };
  }
}
