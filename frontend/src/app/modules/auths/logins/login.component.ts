import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from 'src/app/api-services/auths/auth-api.service';
import { AuthStoreService } from 'src/app/api-services/auths/auth.store.service';
import LoginModel, { LoginResponseModel } from 'src/app/models/auths/login.model';

type statusType = 'new' | 'processing' | 'error' | 'success';

/**
 * Login Component
 */
@Component({
  selector: 'nn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  public model: LoginModel = new LoginModel();
  public status: statusType = 'new';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: AuthApiService,
    private authStoreService: AuthStoreService
  ) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.checkIfValid()) {
      this.status = 'processing';
      this.apiService.sign_in(this.model).subscribe({
        next: (res: LoginResponseModel) => {
          this.status = 'success';
          this.authStoreService.setSession(res.token!);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.status = 'error';
        },
        complete: () => {

        }
      });
    }
  }

  checkIfValid() {
    return this.model.email && this.model.password;
  }
}