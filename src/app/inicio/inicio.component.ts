import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  init_entities: any[] = [];

  constructor(private sharedService: SharedService,
              private searchService: SearchService) { }

  ngOnInit(): void {
    this.getInitEntities();
    this.sharedService.sendReloadEvent(true);    
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
