import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { Campaign } from 'src/app/models/campaign.model';
import { Category } from 'src/app/models/category.model';
import { City } from 'src/app/models/city.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CitiesService } from 'src/app/services/cities.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {

  categories: Category[] = []
  cities: City[] = []
  campaign = new Campaign();
  submitted = false;

  constructor(public tokenService: AngularTokenService,
              private categoriesService: CategoriesService,
              private citiesService: CitiesService,
              private campaignService: CampaignService,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.tokenService.validateToken().subscribe(
      res => {
        this.getCategories();
        this.getCities()
      }
    )
  }

  onSubmit(campaignForm: NgForm) {
    this.submitted = true;
    let city = this.cities.find(c => c.id == this.campaign.city_id);
    if (city) {
      this.campaign.province_id = city.province.id
    }
    this.campaign.concatTags();
    this.campaignService.addCampaign(this.campaign).subscribe(
      res => {
        campaignForm.reset();
        localStorage.setItem('entitySelected', JSON.stringify(res));
        this.sharedService.sendReloadEvent(true);
        this.router.navigate(['/campaign-dashboard']);
      },
      error => { console.log(error) }
    );
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(
      res_categories => { this.categories = res_categories }
    )
  }

  getCities() {
    this.citiesService.getCities().subscribe(
      res_cities => { this.cities = res_cities }
    )
  }

}
