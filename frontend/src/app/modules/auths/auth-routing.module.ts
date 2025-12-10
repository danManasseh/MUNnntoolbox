import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './logins/login.component';
import { RegistrationComponent } from './register/register.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: AuthComponent, // This can be your default tab or landing page
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: '', component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }

