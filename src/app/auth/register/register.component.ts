import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading = false;

  onRegister(form: NgForm) {
    console.log(form.value);
  }
}
