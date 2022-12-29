import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { catchError, debounce, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, Subscription, switchMap, tap } from 'rxjs';
import { Campaign } from '../models/campaign.model';
import { Ong } from '../models/ong.model';
import { CampaignService } from '../services/campaign.service';
import { OngService } from '../services/ong.service';
import { SearchService } from '../services/search.service';
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
  isSearching: boolean = false;
  isFailedSearch: boolean = false;

  public entitySelected: any;

  constructor(public tokenService: AngularTokenService,
              private ongService: OngService,
              private campaignService: CampaignService,
              private sharedService: SharedService,
              private searchService: SearchService,
              private router: Router) {
    this.reloadEventsubscription =
      this.sharedService.getReloadEvent().subscribe((res) => {
        if (res === true) {
          this.ngOnInit();
        }
      })
  }

  ngOnInit(): void {
    if (this.tokenService.userSignedIn()) {
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
  }

  login() {
    localStorage.clear();
    this.tokenService.signInOAuth('google');
  }

  logout() {
    this.tokenService.signOut().subscribe(
      res => { this.router.navigate(['inicio']); }
    );    
  }

  getOngs() {
    this.ongService.myOngs().subscribe(
      res_ongs => {
        this.ong_list = res_ongs
      }
    );
  }

  getCampaigns() {
    this.campaignService.myCampaigns().subscribe(
      res_campaigns => {
        this.campaign_list = res_campaigns
      }
    );
  }

  reloadSidebarOng(ong: Ong) {
    localStorage.setItem('entitySelected', JSON.stringify(ong))
    this.router.navigate(['./ong-dashboard']);    
    this.sharedService.sendReloadEvent(false)
  }

  reloadSidebarCampaign(campaign: Campaign) {
    localStorage.setItem('entitySelected', JSON.stringify(campaign))
    this.router.navigate(['./campaign-dashboard']);    
    this.sharedService.sendReloadEvent(false)
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap(term => term.length < 3 ? [] :
        this.searchService.getEntities(term).pipe(
          tap(() => this.isFailedSearch = false),
          catchError(() => {
            this.isFailedSearch = true;
            return of([]);
          }))
      ),
      tap(() => this.isSearching = false)
    )

  formatter = (entity: any) => { return `${entity.name} (${entity.type})` }

  redirect(event: any) {
    localStorage.setItem('entitySelected', JSON.stringify(event.item));
    if (event.item.type == 'Ong') {
      this.router.navigate(['./ong']);
      this.sharedService.sendReloadOng();
    }
    else if (event.item.type == 'Campaign') {
      this.router.navigate(['./campaign']);
      this.sharedService.sendReloadCampaign();
    }
  }
}
