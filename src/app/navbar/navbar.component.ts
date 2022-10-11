import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subscription } from 'rxjs';
import { Ong } from '../models/ong.model';
import { OngService } from '../services/ong.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  reloadEventsubscription: Subscription;
  user: any;
  ong_list: Ong[] = [];


  constructor(public tokenService: AngularTokenService,
    public ongService: OngService,
    private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadEvent().subscribe(() => {
        this.getOngs();
      })
  }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res => {
        this.user = res['data'];
        this.getOngs();
      },
      error => {
          this.user = error['statusText']
      }
    )
  }

  login() {
    this.tokenService.signInOAuth('google');
  }

  logout() {
    this.tokenService.signOut().subscribe(
      res => { location.reload(); }
    );
  }

  getOngs() {
    this.ongService.getOngs().subscribe(
      res_ongs => { this.ong_list = res_ongs }
    )
  }

  reloadOngSidebar(ong: Ong) {
    localStorage.setItem('ongSelected', JSON.stringify(ong))
    this.sharedService.sendReloadEvent()
  }
}
