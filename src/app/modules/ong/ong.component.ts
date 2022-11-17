import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ong } from 'src/app/models/ong.model';
import { OngService } from 'src/app/services/ong.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.component.html',
  styleUrls: ['./ong.component.scss']
})
export class OngComponent implements OnInit {

  ong: Ong;
  reloadEventsubscription: Subscription;

  constructor(private ongService: OngService,
              private sharedService: SharedService) {
    this.reloadEventsubscription =
      this.sharedService.getReloadEvent().subscribe(() => {
        this.getOng()
      })
  }

  ngOnInit(): void {
    this.getOng()
  }

  getOng() {
    let obj = JSON.parse(localStorage.getItem('entitySelected')|| '{}');
    this.ongService.getOng(obj.id).subscribe(
      res_ong => { this.ong = res_ong }
    )
  }

  displayOng() {
    return JSON.stringify(this.ong, null, 4)
  }

}
