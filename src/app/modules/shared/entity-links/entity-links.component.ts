import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityLink } from 'src/app/models/entity-link.model';
import { EntityLinkService } from 'src/app/services/entity-link.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entity-links',
  templateUrl: './entity-links.component.html',
  styleUrls: ['./entity-links.component.scss']
})
export class EntityLinksComponent implements OnInit {

  entityLink = new EntityLink();
  entityLink_list: EntityLink[] = [];
  closeResult = '';
  submitted = false;

  constructor(private entityLinkService: EntityLinkService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEntityLinks()
  }

  getEntityLinks() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.entityLinkService.getEntityLinks(obj.type, obj.id).subscribe(
      res_entityLinks => { this.entityLink_list = res_entityLinks.map(i => new EntityLink(i)) }
    )
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.entityLink = new EntityLink()
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

  onSubmit(entityLinkForm: NgForm) {
    this.submitted = true;
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.entityLink.linkeable_type = obj.type;
    this.entityLink.linkeable_id = obj.id;
    this.entityLinkService.addEntityLink(this.entityLink).subscribe(
      res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Su enlace ha sido guardado correctamente.',
          showConfirmButton: true,
          //timer: 2500
        });
        this.getEntityLinks();
        this.entityLink = new EntityLink()
      },
      error => { console.log(error) }
    );
  }

  deleteEntityLink(entityLink: EntityLink) {
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
        this.entityLinkService.deleteEntityLink(entityLink).subscribe(
          res => {
            this.getEntityLinks()
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

}
