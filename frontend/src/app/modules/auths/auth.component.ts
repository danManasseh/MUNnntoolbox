import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Auth Component - wrapper component for register and login
 */
@Component({
  selector: 'nn-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
