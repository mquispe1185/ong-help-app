import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign.model';
import { Category } from 'src/app/models/category.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss']
})
export class CampaignEditComponent implements OnInit {
  campaign:Campaign;
  submitted = false;
  cities: any;
  model: any;
  router: any;
  categories: Category[] = [];

  constructor(private campaignService: CampaignService,
              private categoriesService: CategoriesService,
              private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getCampaign();
    this.getCategories();
  }

  getCampaign(){
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.campaignService
        .getCampaign(obj.id)
        .subscribe((res_campaign) =>{
          this.campaign = res_campaign;
        })
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res_categories) => {
      this.categories = res_categories;
    });
  }

  updateCampaign(){
    this.campaignService.updateCampaign(this.campaign).subscribe((res) =>{
      this.campaign = res;
      localStorage.setItem('entitySelected', JSON.stringify(this.campaign));
      this.sharedService.sendReloadEvent(true);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Campaña Actualizada',
        showConfirmButton: false,
        timer: 2000
      })
    });
  }
}
