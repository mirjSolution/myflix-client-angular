import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErrorComponent } from './error/error.component';
import { ErrorService } from './error/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialog: MatDialog,
    private errorService: ErrorService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.text) {
          let errorText = error.error.text.split(' ');
          const error1 = errorText.includes('deleted.');
          if (error1) {
            errorMessage = 'Profile successfully deleted';
          } else if (error.error.text === 'Movie already added in the list') {
            errorMessage = 'Movie already added in the list';
          } else if (error.error.text === 'Successfully added to favourite') {
            errorMessage = 'Successfully added to favourite';
          }
        } else if (error.error.message === 'Invalid Credential') {
          errorMessage = 'Invalid Credential';
        } else if (error.status === 400) {
          errorMessage = 'Username already exists';
        } else if (error.status === 500) {
          errorMessage = 'Email already exists';
        }
        this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
        // this.errorService.throwError(errorMessage);
        return throwError(error);
      })
    );
  }
}
