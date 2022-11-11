import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { Category } from 'src/app/models/category.model';
import { City } from 'src/app/models/city.model';
import { Ong } from 'src/app/models/ong.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { CitiesService } from 'src/app/services/cities.service';
import { OngService } from 'src/app/services/ong.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ong-form',
  templateUrl: './ong-form.component.html',
  styleUrls: ['./ong-form.component.scss']
})
export class OngFormComponent implements OnInit {

  categories: Category[] = []
  cities: City[] = []
  ong = new Ong();
  submitted = false;
  
  constructor(public tokenService: AngularTokenService,
              private categoriesService: CategoriesService,
              private citiesService: CitiesService,
              private ongService: OngService,
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

  onSubmit(ongForm: NgForm) {
    this.submitted = true;
    let city = this.cities.find(c => c.id == this.ong.city_id);
    if (city) {
      this.ong.province_id = city.province.id
    }
    this.ongService.addOng(this.ong).subscribe(
      res => {
        ongForm.reset();
        localStorage.setItem('entitySelected', JSON.stringify(res));
        this.sharedService.sendReloadEvent(true);
        this.router.navigate(['/ong-dashboard']);
      },
      error => { console.log(error) }
    );
  }

  newOng() {
    this.ong = new Ong();
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
