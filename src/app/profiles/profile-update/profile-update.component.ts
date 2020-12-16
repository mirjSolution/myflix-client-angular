import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent {
  enteredPassword = '';
  enteredConfirmPassword = '';
  enteredEmail = '';
  enteredBirthday = '';
  @Output() favoriteUpdated = new EventEmitter();

  onUpdateProfile() {
    const favorite = {
      password: this.enteredPassword,
      email: this.enteredEmail,
      birthday: this.enteredBirthday,
    };
    this.favoriteUpdated.emit(favorite);
  }
}
