import { Component, OnInit } from '@angular/core';
import { Contribution } from 'src/app/models/contribution.model';
import { ContributionsService } from 'src/app/services/contributions.service';

@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.scss']
})
export class MyDonationsComponent implements OnInit {

  contribution_list: Contribution[] = [];

  constructor(private contributionsService: ContributionsService) { }

  ngOnInit(): void {
    this.getContributions()
  }

  getContributions() {
    this.contributionsService.myContributions().subscribe(
      res_contributions => { this.contribution_list = res_contributions }
      )
  }

}
