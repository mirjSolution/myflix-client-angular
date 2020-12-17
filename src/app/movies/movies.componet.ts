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
  public movies: any[] = [];

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
}
