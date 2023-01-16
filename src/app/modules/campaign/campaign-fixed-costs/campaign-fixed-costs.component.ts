import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FixedCost } from 'src/app/models/fixed-cost.model';
import { FixedCostsService } from 'src/app/services/fixed-costs.service';
import { constants } from 'src/app/utils/periods';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign-fixed-costs',
  templateUrl: './campaign-fixed-costs.component.html',
  styleUrls: ['./campaign-fixed-costs.component.scss']
})
export class CampaignFixedCostsComponent implements OnInit {

  fixedcost = new FixedCost();
  fixedcost_list: FixedCost[] = [];
  closeResult = '';
  submitted = false;

  months = constants.MONTHS;
  years = constants.YEARS;

  constructor(private fixedcostsService: FixedCostsService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getFixedCosts()
  }

  getFixedCosts() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.fixedcostsService.getFixedCosts('Campaign', obj.id).subscribe(
      res_fixedcosts => { this.fixedcost_list = res_fixedcosts.map(i => new FixedCost(i))}
    )
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.newFixedCost();
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

  newFixedCost() {
    this.fixedcost = new FixedCost();
  }

  onSubmit(fixedcostForm: NgForm) {
    this.submitted = true;
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.fixedcost["chargeable_type"] = "Campaign";
    this.fixedcost["chargeable_id"] = obj.id;
    this.fixedcostsService.addFixedCost(this.fixedcost).subscribe(
      res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El costo fijo ha sido guardado correctamente',
          showConfirmButton: false,
          timer: 2500
        });
        this.getFixedCosts();
        this.newFixedCost();
      },
      error => { console.log(error) }
    );
  }

  setFixedCost(fc: FixedCost) {
    this.fixedcost = new FixedCost({ ...fc });
  }

  updateFixedCost() {
    this.fixedcostsService.updateFixedCost(this.fixedcost).subscribe(
      res => {
        Swal.fire(
          '¡Modificado!',
          'Su costo fijo ha sido modificado.',
          'success'
        );
        this.getFixedCosts();
        this.newFixedCost();
      },
      error => { console.log(error) }
    )
  }

  deleteFixedCost(fixedcost: FixedCost) {
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
        this.fixedcostsService.deleteFixedCost(fixedcost).subscribe(
          res => {
            this.getFixedCosts();
          },
          error => { console.log(error) }
        )
        Swal.fire(
          '¡Eliminado!',
          'Su costo fijo ha sido eliminado.',
          'success'
        )
      }
    })
  }
}
