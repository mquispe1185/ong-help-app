import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-ong-dashboard',
  templateUrl: './ong-dashboard.component.html',
  styleUrls: ['./ong-dashboard.component.scss']
})
export class OngDashboardComponent implements OnInit {
  @ViewChild('dash') dash: ElementRef<HTMLInputElement>;
  reponse: any;

  constructor(public tokenService: AngularTokenService) { }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res => { this.reponse = res['data']['name'] },
      error => { this.reponse = error['statusText'] }
    )
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
