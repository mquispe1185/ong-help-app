import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  response:any;

  constructor(public tokenService: AngularTokenService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res =>      {console.log(res)
                   this.response = res['data']['name'];
                  },
      error =>    {console.log(error['statusText']),
                    this.response = error['statusText']}
    )
    this.sharedService.sendReloadEvent()
  }  

}
