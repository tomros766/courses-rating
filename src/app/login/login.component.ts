import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  error: boolean;

  registerInfo = '';

  constructor(
    private router: Router,
    private userService: UserServiceService,
    ) {this.error = false; }

  login(email, password) {
    this.credentials.email = email.value;
    this.credentials.password = password.value;
    this.userService.login(this.credentials.email, this.credentials.password)
      .then(() => this.router.navigate(['/main']))
      .catch(err => this.error = true);
  }

  register(email, password) {
    this.credentials.email = email.value;
    this.credentials.password = password.value;
    this.userService.register(this.credentials.email, this.credentials.password)
      .then(() => this.registerInfo = 'ACCOUNT CREATED, PLZ LOGIN IN!')
      .catch(err => this.error = true);
  }

}
