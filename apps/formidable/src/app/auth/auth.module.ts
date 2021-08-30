import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalSharedModule } from '@formidable/shared';
import { FormBuilderSharedModule } from '@builder/shared';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'register', component: RegisterPageComponent, canActivate: [NotAuthenticatedGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    GlobalSharedModule,
    FormBuilderSharedModule,
  ],
})
export class AuthModule {}
