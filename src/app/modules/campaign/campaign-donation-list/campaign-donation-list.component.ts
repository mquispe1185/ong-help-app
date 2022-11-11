import { Component, OnInit } from '@angular/core';
import { Contribution } from 'src/app/models/contribution.model';
import { Donation } from 'src/app/models/donation.model';
import { DonationsService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-campaign-donation-list',
  templateUrl: './campaign-donation-list.component.html',
  styleUrls: ['./campaign-donation-list.component.scss']
})
export class CampaignDonationListComponent implements OnInit {

  donation_list: Donation[] = [];
  contribution_list: Contribution[] = [];

  constructor(private donationsService: DonationsService) { }

  ngOnInit(): void {
  }

  getDonations() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') ?? "Default");
    this.donationsService.getDonations('Ong', obj.id).subscribe(
      res_donations => { this.donation_list = res_donations }
    )
  }

  displayDonations() {
    return JSON.stringify(this.donation_list, null, 4)
  }

  getContributions() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') ?? "Default");
    this.donationsService.getContributions('Ong', obj.id).subscribe(
      res_contributions => { this.contribution_list = res_contributions }
    )
  }

  displayContributions() {
    return JSON.stringify(this.contribution_list, null, 4)
  }

}
