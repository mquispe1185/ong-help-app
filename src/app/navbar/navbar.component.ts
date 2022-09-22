import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Ong } from '../models/ong.model';
import { OngService } from '../services/ong.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user:any;
  ong_list:Ong[] = []

  constructor(public tokenService: AngularTokenService,
              public ongService: OngService) { }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res =>      {console.log(res)
                   this.user = res['data'];
                   this.getOngs();
                  },
      error =>    {console.log(error['statusText']),
                    this.user = error['statusText']}
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

  getOngs(){
    this.ongService.getOngs().subscribe(
      res_ongs => { this.ong_list = res_ongs}
    )
  }
}
