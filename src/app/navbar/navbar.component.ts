import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public tokenService: AngularTokenService) { }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res => { console.log('status user signed in?', this.tokenService.userSignedIn())},
      error => { console.log('User signed out', this.tokenService.userSignedIn()); }
    )
  }

  login(){
    this.tokenService.signInOAuth('google');
  }

  logout(){
    this.tokenService.signOut().subscribe(
      res => { location.reload(); }
    );
  }
}
