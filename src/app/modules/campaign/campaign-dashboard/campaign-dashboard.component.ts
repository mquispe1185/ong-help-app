import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subscription } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.scss']
})
export class CampaignDashboardComponent implements OnInit {
  @ViewChild('dash') dash: ElementRef<HTMLInputElement>;
  @ViewChild('btn') menuDash: ElementRef<HTMLInputElement>;
  reponse: any;
  campaignSelected: Campaign
  reloadEventsubscription: Subscription;
  public screenWidth: any;

  constructor(public tokenService: AngularTokenService,
              private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadEvent().subscribe(() => {
        this.campaignSelected = JSON.parse(localStorage.getItem('entitySelected') || '{}');
      })
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.tokenService.validateToken().subscribe(
      res => { this.reponse = res['data'] },
      error => { this.reponse = error['statusText'] }
    )
    this.campaignSelected = JSON.parse(localStorage.getItem('entitySelected') || '{}')
  }

  show() {
    if (this.dash.nativeElement.classList.contains('d-none')) {
      this.dash.nativeElement.classList.add('d-block');
      this.dash.nativeElement.classList.remove('d-none');
      this.menuDash.nativeElement.style.color = 'white'
    } else {
      this.dash.nativeElement.classList.add('d-none');
      this.dash.nativeElement.classList.remove('d-block');
      this.menuDash.nativeElement.style.color = '#293042';
    }
  }

  hideMenu() {
    if ((this.screenWidth <= 768) && (this.dash.nativeElement.classList.contains('d-block'))) {
      this.dash.nativeElement.classList.add('d-none');
      this.dash.nativeElement.classList.remove('d-block');
      this.menuDash.nativeElement.style.color = '#293042';
    }
  }
}
