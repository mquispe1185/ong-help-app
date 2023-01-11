import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityLink } from 'src/app/models/entity-link.model';
import { FixedCost } from 'src/app/models/fixed-cost.model';
import { ItemDonation } from 'src/app/models/item-donation.model';
import { Ong } from 'src/app/models/ong.model';
import { EntityLinkService } from 'src/app/services/entity-link.service';
import { FixedCostsService } from 'src/app/services/fixed-costs.service';
import { ItemDonationsService } from 'src/app/services/item-donations.service';
import { OngService } from 'src/app/services/ong.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.component.html',
  styleUrls: ['./ong.component.scss']
})
export class OngComponent implements OnInit {

  ong: Ong = new Ong();
  reloadEventsubscription: Subscription;

  apiLoaded = false;
  videoId = '';

  fixedcost_list: FixedCost[] = [];
  itemDonation_list: ItemDonation[] = [];
  entityLink_list: EntityLink[] = [];
  metadata_list: any[] = [];

  metadata: any;

  constructor(private ongService: OngService,
              private fixedcostsService: FixedCostsService,
              private itemDonationsService: ItemDonationsService,
              private entityLinksService: EntityLinkService,
              private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadOng().subscribe(() => {
        this.ngOnInit();
      })
  }

  ngOnInit(): void {
    this.getOng();
    this.getFixedCosts();
    this.getItemDonations();
    this.getEntityLinks();
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  getFixedCosts() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.fixedcostsService.getFixedCosts('Ong', obj.id).subscribe(
      res_fixedcosts => { this.fixedcost_list = res_fixedcosts }
    )
  }

  getItemDonations() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.itemDonationsService.getItemDonations('Ong', obj.id).subscribe(
      res_itemDonations => { this.itemDonation_list = res_itemDonations }
    )
  }

  getEntityLinks() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.entityLinksService.getEntityLinks('Ong', obj.id).subscribe(
      res_entityLinks => {
        this.entityLink_list = res_entityLinks;
        this.entityLink_list.forEach(entitylink => {
          this.entityLinksService.getMetadata(entitylink.id).subscribe(
            res => {
              this.metadata = res;
              this.metadata.dbId = entitylink.id;
              this.metadata.dbCreated_at = entitylink.created_at;
              this.metadata_list.push(this.metadata);
              this.metadata_list.sort((a, b) => (a.dbId < b.dbId) ? 1 : -1)
            }
          )
        });
      }
    )
  }

  getOng() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.ongService.getOng(obj.id).subscribe(
      res_ong => {
        this.ong = res_ong;
        var url = this.ong.video_url;
        if (url.includes('www.youtube.com')) {
          this.videoId = url.split('v=')[1].split('&')[0];
        } else {
          this.videoId = url.split('.be/')[1];
        };
        if (this.ong.facebook != "" && !this.ong.facebook.includes('https://')) {
          this.ong.facebook = 'https://'.concat(this.ong.facebook)
        };
        if (this.ong.twitter != "" && !this.ong.twitter.includes('https://')) {
          this.ong.twitter = 'https://'.concat(this.ong.twitter)
        };
        if (this.ong.instagram != "" && !this.ong.instagram.includes('https://')) {
          this.ong.instagram = 'https://'.concat(this.ong.instagram)
        }
      }
    )
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
