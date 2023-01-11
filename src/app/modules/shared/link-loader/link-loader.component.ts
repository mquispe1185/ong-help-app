import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-loader',
  templateUrl: './link-loader.component.html',
  styleUrls: ['./link-loader.component.scss']
})
export class LinkLoaderComponent implements OnInit {

  obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
  entity = this.obj.type;

  constructor() { }

  ngOnInit(): void {
  }

}
