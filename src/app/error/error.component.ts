import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './error.component.html',
  selector: 'app-error',
})
export class ErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: string;
      genreName: string;
      genreDesc: string;
      directorName: string;
      directorBio: string;
      directorBirth: string;
      synopsis: string;
    }
  ) {}
}
