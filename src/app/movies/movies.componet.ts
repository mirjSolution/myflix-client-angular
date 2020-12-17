import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  private token: string;
  movies: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  onAddToFavorite(movieName) {
    const username = localStorage.getItem('username');

    return this.http
      .post(
        `https://myflix3.herokuapp.com/users/${username}/movies/${movieName}`,
        ''
      )
      .subscribe(() => {});
  }

  getMovies() {
    this.token = localStorage.getItem('token');
    this.http
      .get('https://myflix3.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .subscribe((result: any) => {
        this.movies = result;
      });
  }

  onViewSynopsis(synopsis) {
    this.dialog.open(ErrorComponent, {
      data: { synopsis: synopsis },
    });
  }

  onViewDirector(name, bio, birth) {
    this.dialog.open(ErrorComponent, {
      data: { directorName: name, directorBio: bio, directorBirth: birth },
    });
  }

  onViewGenre(name, desc) {
    this.dialog.open(ErrorComponent, {
      data: { genreName: name, genreDesc: desc },
    });
  }
}
