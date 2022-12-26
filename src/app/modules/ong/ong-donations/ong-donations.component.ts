import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemDonation } from 'src/app/models/item-donation.model';
import { ItemDonationsService } from 'src/app/services/item-donations.service';
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

  constructor(private itemDonationsService: ItemDonationsService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getItemDonations()
  }

  getItemDonations() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.itemDonationsService.getItemDonations('Ong', obj.id).subscribe(
      res_itemDonations => { this.itemDonation_list = res_itemDonations.map(i => new ItemDonation(i)) }
    )
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.itemDonation = new ItemDonation()
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
   // this.itemDonation.period_id = 7;
    this.itemDonationsService.addItemDonation(this.itemDonation).subscribe(
      res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Su pedido ha sido guardado correctamente.',
          showConfirmButton: true,
          //timer: 2500
        });
        this.getItemDonations();
        this.itemDonation = new ItemDonation()
      },
      error => { console.log(error) }
    );
  }

  updateItemDonation() {
    this.itemDonationsService.updateItemDonation(this.itemDonation).subscribe(
      res => {
        Swal.fire(
          '¡Modificado!',
          'Su pedido ha sido modificado.',
          'success'
        );
        this.getItemDonations();
        this.itemDonation = new ItemDonation()
      },
      error => { console.log(error) }
    )
  }

  deleteItemDonation(itemdonation: ItemDonation) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemDonationsService.deleteItemDonation(itemdonation).subscribe(
          res => {
            this.getItemDonations()
          },
          error => { console.log(error) }
        )
        Swal.fire(
          '¡Eliminado!',
          'Su pedido ha sido eliminado.',
          'success'
        )
      }
    })
  }

  setItemDonation(item: ItemDonation) {
    this.itemDonation =  new ItemDonation({...item})
  }

}
