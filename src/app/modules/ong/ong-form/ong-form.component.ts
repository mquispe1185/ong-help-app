import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularTokenService } from 'angular-token';
import { Category } from 'src/app/models/category.model';
import { City } from 'src/app/models/city.model';
import { Ong } from 'src/app/models/ong.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { CitiesService } from 'src/app/services/cities.service';
import { OngService } from 'src/app/services/ong.service';

@Component({
  selector: 'app-ong-form',
  templateUrl: './ong-form.component.html',
  styleUrls: ['./ong-form.component.scss']
})
export class OngFormComponent implements OnInit {

  categories:Category[] = []
  cities:City[] = []
  model = new Ong();
  submitted = false;
  constructor(public tokenService: AngularTokenService, 
              public categoriesService: CategoriesService,
              public citiesService: CitiesService,
              public ongService: OngService) { }

  ngOnInit(): void {
    console.log('holaaa estoy cargando')
    this.tokenService.validateToken().subscribe(
      res => { this.getCategories();
               this.getCities() }
    )
    
  }

  onSubmit(ongForm:NgForm) {
    this.submitted = true;
    let city = this.cities.find(c => c.id == this.model.city_id);
    if (city){
      this.model.province_id = city.province.id
    }
    this.ongService.addOng(this.model).subscribe(
      res => { ongForm.reset()},
      error => { console.log(error)}); 
    console.log('nueva ong', this.model)
  }


  newOng() {
    this.model = new Ong();
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
