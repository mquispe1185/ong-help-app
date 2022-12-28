import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.model';
import { FixedCost } from 'src/app/models/fixed-cost.model';
import { ItemDonation } from 'src/app/models/item-donation.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { FixedCostsService } from 'src/app/services/fixed-costs.service';
import { ItemDonationsService } from 'src/app/services/item-donations.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  campaign: Campaign = new Campaign();
  reloadEventsubscription: Subscription;

  apiLoaded = false;
  videoId = '';

  fixedcost_list: FixedCost[] = [];
  itemDonation_list: ItemDonation[] = [];

  constructor(private campaignService: CampaignService,
              private fixedcostsService: FixedCostsService,
              private itemDonationsService: ItemDonationsService,
              private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadCampaign().subscribe(() => {
        this.getCampaign()
      })
  }

  ngOnInit(): void {
    this.getCampaign();
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
    this.fixedcostsService.getFixedCosts('Campaign', obj.id).subscribe(
      res_fixedcosts => { this.fixedcost_list = res_fixedcosts }
    )
  }

  getItemDonations() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.itemDonationsService.getItemDonations('Campaign', obj.id).subscribe(
      res_itemDonations => { this.itemDonation_list = res_itemDonations }
    )
  }

  getCampaign() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.campaignService.getCampaign(obj ? obj.id.toString() : '0').subscribe(
      res_campaign => {
        this.campaign = res_campaign;
        var url = this.campaign.video_url;
        if (url.includes('www.youtube.com')) {
          this.videoId = url.split('v=')[1].split('&')[0];
        } else {
          this.videoId = url.split('.be/')[1];
        };
        if (!this.campaign.facebook.includes('https://')) {
          this.campaign.facebook = 'https://'.concat(this.campaign.facebook)
        };
        if (!this.campaign.twitter.includes('https://')) {
          this.campaign.twitter = 'https://'.concat(this.campaign.twitter)
        };
        if (!this.campaign.instagram.includes('https://')) {
          this.campaign.instagram = 'https://'.concat(this.campaign.instagram)
        }
      }
    )
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
