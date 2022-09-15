import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularTokenService } from 'angular-token';
import { Campaign } from 'src/app/models/campaign.model';
import { Category } from 'src/app/models/category.model';
import { City } from 'src/app/models/city.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {

  categories:Category[] = []
  cities:City[] = []
  campaign = new Campaign();
  submitted = false;

  constructor(public tokenService: AngularTokenService, 
    public categoriesService: CategoriesService,
    public citiesService: CitiesService,
    public campaignService: CampaignService) { }

  ngOnInit(): void {
    console.log('holaaa estoy cargando')
    this.tokenService.validateToken().subscribe(
      res => { this.getCategories();
               this.getCities() }
    )

  }

  onSubmit(campaignForm:NgForm) {
    this.submitted = true;
    let city = this.cities.find(c => c.id == this.campaign.city_id);
    if (city){
      this.campaign.province_id = city.province.id
    }
    this.campaignService.addCampaign(this.campaign).subscribe(
      res => { campaignForm.reset()},
      error => { console.log(error)}); 
    console.log('nueva campania', this.campaign)
  }


  newCampaign() {
    this.campaign = new Campaign();
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe(
      res_categories => { this.categories = res_categories}
    )
  }

  getCities(){
    this.citiesService.getCities().subscribe(
      res_cities => { this.cities = res_cities}
    )
  }

}
