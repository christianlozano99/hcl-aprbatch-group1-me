import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from "@okta/okta-angular";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName:string
  constructor(private oktaAuthService:OktaAuthService) { }

  ngOnInit(): void {
    // Subscribe to authentication state chagnes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    )
  }


  getUserDetails() {
    // Fetch the logged in user details (user's claims)
    // user full name is exposed as a property name
    this.oktaAuthService.getUser().then(
      (res) => {
        // @ts-ignore
        this.userFullName = res.name.split(" ")[0];
      }
    )
  }
  logout() {
    // Terminates the session with okta and removes current tokens.
    this.oktaAuthService?.signOut();
  }
}