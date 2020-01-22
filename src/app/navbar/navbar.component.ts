import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(    private router: Router,
                  private userService: UserServiceService) { }

  loggedUser;

  ngOnInit() {
    this.loggedUser = this.userService.getUser();
  }

  signOut() {
    this.userService.signOut().then(() => this.router.navigate(['/login']));
  }

  isLogged() {
    this.loggedUser = this.userService.getUser();
    return this.loggedUser !== null;
  }

}
