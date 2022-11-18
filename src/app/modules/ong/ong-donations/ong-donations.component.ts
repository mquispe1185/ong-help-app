import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ItemDonation } from 'src/app/models/item-donation.model';
import { ItemDonationsService } from 'src/app/services/item-donations.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ong-donations',
  templateUrl: './ong-donations.component.html',
  styleUrls: ['./ong-donations.component.scss']
})
export class OngDonationsComponent implements OnInit {

  itemDonation = new ItemDonation();
  itemDonation_list: ItemDonation[] = [];
  closeResult = '';
  submitted = false;
  reloadEventsubscription: Subscription;

  constructor(private itemDonationsService: ItemDonationsService,
              private modalService: NgbModal,
              private sharedService: SharedService) {
                this.reloadEventsubscription =
      this.sharedService.getReloadEvent().subscribe(() => {
        this.getItemDonations()
      })
               }

  ngOnInit(): void {
    this.getItemDonations();
  }

  getItemDonations() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.itemDonationsService.getItemDonations('Ong', obj.id).subscribe(
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

  onSubmit(itemDonationForm: NgForm) {
    this.submitted = true;
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.itemDonation.donatable_type = "Ong";
    this.itemDonation.donatable_id = obj.id;
    this.itemDonation.period_id = 7;
    console.log('esto tiene itemDonation', this.itemDonation);
    this.itemDonationsService.addItemDonation(this.itemDonation).subscribe(
      res => {        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Su pedido ha sido guardado correctamente',
          showConfirmButton: false,
          timer: 2500
        });
        this.sharedService.sendReloadEvent(false);
        itemDonationForm.reset()
      },
      error => { console.log(error) }
    );
  }

  edit(itemdonation: ItemDonation){
    this.itemDonationsService.updateItemDonation(itemdonation).subscribe(
      res => {
        this.sharedService.sendReloadEvent(false);
      },
      error => { console.log(error) }
    )
  }

  delete(itemdonation: ItemDonation){
    this.itemDonationsService.deleteItemDonation(itemdonation).subscribe(
      res => {
        this.sharedService.sendReloadEvent(false);
      },
      error => { console.log(error) }
    )
  }

}
