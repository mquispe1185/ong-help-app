import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { SearchService } from '../services/search.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  response:any;
  init_entities: any[] = [];

  constructor(public tokenService: AngularTokenService,
              private sharedService: SharedService,
              private searchService: SearchService) { }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res =>      {console.log(res)
                   this.response = res['data']['name'];
                  },
      error =>    {console.log(error['statusText']),
                    this.response = error['statusText']}
    )
    this.sharedService.sendReloadEvent(true)
    this.getInitEntities()
  }

  getInitEntities() {
    this.searchService.getInitEntities().subscribe(
      res_initEntities => {
        this.init_entities = res_initEntities;
      }
    );
  }

  displayJSON() {
    return JSON.stringify(this.init_entities, null, 4)
  }

}
