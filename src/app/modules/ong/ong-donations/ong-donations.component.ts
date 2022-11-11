import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemDonation } from 'src/app/models/item-donation.model';
import { DonationsService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-ong-donations',
  templateUrl: './ong-donations.component.html',
  styleUrls: ['./ong-donations.component.scss']
})
export class OngDonationsComponent implements OnInit {

  itemDonation_list: ItemDonation[] = [];
  closeResult = '';

  constructor(private donationsService: DonationsService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getItemDonations();
  }

  getItemDonations() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') ?? "Default");
    this.donationsService.getItemDonations('Ong', obj.id).subscribe(
      res_itemDonations => { this.itemDonation_list = res_itemDonations }
    )
  }

  displayItemDonations() {
    return JSON.stringify(this.itemDonation_list, null, 4)
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
