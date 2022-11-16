import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subscription } from 'rxjs';
import { Ong } from 'src/app/models/ong.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ong-dashboard',
  templateUrl: './ong-dashboard.component.html',
  styleUrls: ['./ong-dashboard.component.scss']
})
export class OngDashboardComponent implements OnInit {
  @ViewChild('dash') dash: ElementRef<HTMLInputElement>;
  reponse: any;
  ongSelected: Ong;
  reloadEventsubscription: Subscription;

  constructor(public tokenService: AngularTokenService,
              private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadEvent().subscribe(() => {
        this.ongSelected = JSON.parse(localStorage.getItem('entitySelected') || '{}');
      })
  }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res => { this.reponse = res['data']['name'] },
      error => { this.reponse = error['statusText'] }
    )
    this.ongSelected = JSON.parse(localStorage.getItem('entitySelected') || '{}')
  }

  show() {
    if (this.dash.nativeElement.classList.contains('d-none')) {
      this.dash.nativeElement.classList.add('d-block');
      this.dash.nativeElement.classList.remove('d-none')
    } else {
      this.dash.nativeElement.classList.add('d-none');
      this.dash.nativeElement.classList.remove('d-block')
    }
  }
}
