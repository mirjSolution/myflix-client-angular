import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent implements OnInit {
  form: NgForm;
  email: string;
  birthday: string;
  private profileSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.profileSub = this.authService
      .getProfile()
      .subscribe((profile: any) => {
        this.email = profile.email;
        this.birthday = profile.birthday.slice(0, 10);
      });
  }

  onUpdateProfile() {}
}
