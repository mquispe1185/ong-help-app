import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ong-dashboard',
  templateUrl: './ong-dashboard.component.html',
  styleUrls: ['./ong-dashboard.component.scss']
})
export class OngDashboardComponent implements OnInit {
  @ViewChild('dash') dash: ElementRef<HTMLInputElement>;
  reponse: any;

  name: string = "";
  reloadEventsubscription: Subscription;

  constructor(public tokenService: AngularTokenService,
              private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadEvent().subscribe(() => {
        this.name = JSON.parse(localStorage.getItem('entitySelected') ?? "Default").name;
      })
  }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res => { this.reponse = res['data']['name'] },
      error => { this.reponse = error['statusText'] }
    )
    this.name = JSON.parse(localStorage.getItem('entitySelected') ?? "Default").name
    this.sharedService.sendReloadEvent()
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
