import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthApiService } from 'src/app/api-services/auths/auth-api.service';
import RegistrationModel from 'src/app/models/auths/registration.model';


type statusType = 'new' | 'processing' | 'error' | 'success';

/**
 * Registration Component
 */
@Component({
  selector: 'nn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegistrationComponent {

  public model: RegistrationModel = new RegistrationModel();
  public status: statusType = 'new';

  constructor(
    private route: ActivatedRoute, private apiService: AuthApiService) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.checkIfValid()) {
      this.status = 'processing';
      this.apiService.registerUser(this.model).subscribe({
        next: (res) => {
          this.status = 'success';
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
    return this.model.email && this.model.password && this.model.name;
  }
}
