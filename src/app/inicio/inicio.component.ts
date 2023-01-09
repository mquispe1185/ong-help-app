import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  init_entities: any[] = [];

  apiLoaded = false;
  videoId = '';

  constructor(private sharedService: SharedService,
              private searchService: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this.getInitEntities();
    if (this.router.url.includes('auth_token')) {
      this.sharedService.sendReloadEvent(true);
    };
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  getInitEntities() {
    this.searchService.getInitEntities().subscribe(
      res_initEntities => {
        this.init_entities = res_initEntities;
        var url = this.init_entities[0].video_url;
        if (url.includes('www.youtube.com')) {
          this.videoId = url.split('v=')[1].split('&')[0];
        } else {
          this.videoId = url.split('.be/')[1];
        };
      }
    );
  }

  redirect(entity: any) {
    localStorage.setItem('entitySelected', JSON.stringify(entity));
    if (entity.type == 'Ong') {
      this.router.navigate(['./ong']);
      this.sharedService.sendReloadOng();
    }
    else if (entity.type == 'Campaign') {
      this.router.navigate(['./campaign']);
      this.sharedService.sendReloadCampaign();
    }
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
