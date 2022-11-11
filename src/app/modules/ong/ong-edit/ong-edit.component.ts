import { Component, OnInit } from '@angular/core';
import { OngService } from 'src/app/services/ong.service';
import { Ong } from 'src/app/models/ong.model';
import { NgForm } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { SearchService } from 'src/app/services/search.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-ong-edit',
  templateUrl: './ong-edit.component.html',
  styleUrls: ['./ong-edit.component.scss'],
})
export class OngEditComponent implements OnInit {
  ong: Ong;
  submitted = false;
  cities: any;
  model: any;
  router: any;
  categories: Category[] = [];

  constructor(private ongService: OngService,
              private categoriesService: CategoriesService,
              private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getOng();
    this.getCategories();
  }

  getOng() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') ?? 'Default');
    this.ongService
      .getOng(obj ? obj.id.toString() : '0')
      .subscribe((res_ong) => {
        this.ong = res_ong;
      });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res_categories) => {
      this.categories = res_categories;
    });
  }

  updateOng() {
    this.ongService.updateOng(this.ong).subscribe((res) => {
      this.ong = res;
      localStorage.setItem('entitySelected', JSON.stringify(this.ong));
      this.sharedService.sendReloadEvent();
    });
  }
}
