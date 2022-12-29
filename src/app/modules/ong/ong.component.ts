import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FixedCost } from 'src/app/models/fixed-cost.model';
import { ItemDonation } from 'src/app/models/item-donation.model';
import { Ong } from 'src/app/models/ong.model';
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

  constructor(private ongService: OngService,
              private fixedcostsService: FixedCostsService,
              private itemDonationsService: ItemDonationsService,
              private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadOng().subscribe(() => {
        this.getOng()
      })
  }

  ngOnInit(): void {
    this.getOng();
    this.getFixedCosts();
    this.getItemDonations();
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
        if (!this.ong.facebook.includes('https://')) {
          this.ong.facebook = 'https://'.concat(this.ong.facebook)
        };
        if (!this.ong.twitter.includes('https://')) {
          this.ong.twitter = 'https://'.concat(this.ong.twitter)
        };
        if (!this.ong.instagram.includes('https://')) {
          this.ong.instagram = 'https://'.concat(this.ong.instagram)
        }
      }
    )
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
