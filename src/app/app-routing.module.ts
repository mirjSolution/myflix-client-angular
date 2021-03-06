import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MoviesComponent } from './movies/movies.componet';
import { AuthGuard } from './auth/auth.guard';
import { ProfileUpdateComponent } from './auth/profile-update/profile-update.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile/:username',
    component: ProfileUpdateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
