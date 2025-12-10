import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent, } from './auth.component';
import { LoginComponent } from './logins/login.component';
import { RegistrationComponent } from './register/register.component';
import { AuthRoutingModule, } from './auth-routing.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegistrationComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  providers: [],
})
export class AuthModule { }
