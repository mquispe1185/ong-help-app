import { Component, OnInit } from '@angular/core';
import { FixedCost } from 'src/app/models/fixed-cost.model';
import { FixedCostsService } from 'src/app/services/fixed-costs.service';

@Component({
  selector: 'app-campaign-fixed-costs',
  templateUrl: './campaign-fixed-costs.component.html',
  styleUrls: ['./campaign-fixed-costs.component.scss']
})
export class CampaignFixedCostsComponent implements OnInit {

  fixedcost_list: FixedCost[] = [];

  constructor(private fixedcostsService: FixedCostsService) { }

  ngOnInit(): void {
    this.getFixedCosts()
  }

  getFixedCosts() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') ?? "Default");
    this.fixedcostsService.getFixedCosts('Campaign', obj.id).subscribe(
      res_fixedcosts => { this.fixedcost_list = res_fixedcosts }
    )
  }

  displayFixedCosts() {
    return JSON.stringify(this.fixedcost_list, null, 4)
  }

}
