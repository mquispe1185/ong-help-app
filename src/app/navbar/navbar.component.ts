import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subscription } from 'rxjs';
import { Campaign } from '../models/campaign.model';
import { Ong } from '../models/ong.model';
import { CampaignService } from '../services/campaign.service';
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
  campaign_list: Campaign[] = [];


  constructor(public tokenService: AngularTokenService,
              public ongService: OngService,
              public campaignService: CampaignService,
    private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadEvent().subscribe(() => {
        this.getOngs();
        this.getCampaigns()
      })
  }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res => {
        this.user = res['data'];
        this.getOngs();
        this.getCampaigns()
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
    this.ongService.myOngs().subscribe(
      res_ongs => { this.ong_list = res_ongs;
        localStorage.setItem('entitySelected', JSON.stringify(res_ongs[0])) }
    );
  }

  getCampaigns() {
    this.campaignService.myCampaigns().subscribe(
      res_campaigns => { this.campaign_list = res_campaigns;
        localStorage.setItem('entitySelected', JSON.stringify(res_campaigns[0])) }
    );
  }

  reloadOngSidebar(ong: any) {
    localStorage.setItem('entitySelected', JSON.stringify(ong))
    this.sharedService.sendReloadEvent()
  }
}
