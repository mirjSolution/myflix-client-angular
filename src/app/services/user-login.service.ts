import { Injectable } from '@angular/core';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix3.herokuapp.com/auth/login/';
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor() { }
}
