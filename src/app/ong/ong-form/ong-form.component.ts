import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Category } from 'src/app/models/category.model';
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
  cities:Category[] = []
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

  // categories = ['Uno', 'Dos',
  //   'Tres', 'Cuatro'];



  onSubmit() {
    this.submitted = true;
    this.ongService.addOng(this.model).subscribe(res => { console.log(res)}); 
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
