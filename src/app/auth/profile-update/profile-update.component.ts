import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  form: NgForm;
  email: string;
  birthday: string;
  buttonType: string;
  favorites = [];
  username = localStorage.getItem('username');
  token = localStorage.getItem('token');
  data: { message: string };

  private profileSub: Subscription;

  constructor(public authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.profileSub = this.authService
      .getProfile(this.username, this.token)
      .subscribe((profile: any) => {
        this.email = profile.email;
        this.birthday = profile.birthday.slice(0, 10);
        this.favorites = profile.favoriteMovies;
      });
  }

  onDeleteFavorite(movieName) {
    this.dialog.open(ErrorComponent, {
      data: { message: 'Movie successfully removed from list!' },
    });
    this.authService.deleteFavorite(movieName).subscribe(() => {
      this.ngOnInit();
    });
  }

  onDeleteProfile() {
    const username = localStorage.getItem('username');
    this.authService.deleteProfile(username);
    this.authService.logout();
  }

  onUpdateProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.password !== form.value.confirmPassword) {
      this.dialog.open(ErrorComponent, {
        data: { message: 'Password and Confirm Password do not match!' },
      });
      return;
    } else {
      const username = localStorage.getItem('username');
      this.authService.updateProfile(
        username,
        form.value.email,
        form.value.password,
        form.value.birthday
      );
    }
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }
}
