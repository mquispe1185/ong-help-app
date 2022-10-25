import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  campaign: Campaign;
  reloadEventsubscription: Subscription;

  constructor(private campaignService: CampaignService,
              private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadEvent().subscribe(() => {
        this.getCampaign()
      })
  }

  ngOnInit(): void {
    this.getCampaign()
  }

  getCampaign() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') ?? "Default");
    this.campaignService.getCampaign(obj ? obj.id.toString() : '0').subscribe(
      res_campaign => { this.campaign = res_campaign }
    )
  }

  displayCampaign() {
    return JSON.stringify(this.campaign, null, 4)
  }

}
