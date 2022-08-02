import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SignUpGuard } from '../guards/sign-up/sign-up.guard';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SignUpGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class AuthModule { }
