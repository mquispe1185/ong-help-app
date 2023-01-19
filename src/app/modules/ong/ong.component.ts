import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Subscription } from 'rxjs';
import { EntityLink } from 'src/app/models/entity-link.model';
import { FixedCost } from 'src/app/models/fixed-cost.model';
import { ItemDonation } from 'src/app/models/item-donation.model';
import { Ong } from 'src/app/models/ong.model';
import { User } from 'src/app/models/user.model';
import { EntityLinkService } from 'src/app/services/entity-link.service';
import { FixedCostsService } from 'src/app/services/fixed-costs.service';
import { ItemDonationsService } from 'src/app/services/item-donations.service';
import { OngService } from 'src/app/services/ong.service';
import { SharedService } from 'src/app/services/shared.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.component.html',
  styleUrls: ['./ong.component.scss'],
	providers: [NgbModalConfig, NgbModal],
})

export class OngComponent implements OnInit{

  ong: Ong = new Ong();
  reloadEventsubscription: Subscription;

  apiLoaded = false;
  videoId = '';

  fixedcost_list: FixedCost[] = [];
  itemDonation_list: ItemDonation[] = [];
  entityLink_list: EntityLink[] = [];
  metadata_list: any[] = [];
  preference_id: string;
  script: any;
  metadata: any;

  constructor(private ongService: OngService,
              private fixedcostsService: FixedCostsService,
              private itemDonationsService: ItemDonationsService,
              private entityLinksService: EntityLinkService,
              private sharedService: SharedService,
              public tokenService: AngularTokenService,
              config: NgbModalConfig,
              private modalService: NgbModal) {
    this.reloadEventsubscription =
      this.sharedService.getReloadOng().subscribe(() => {
        this.ngOnInit();
      })
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit(): void {
    this.getOng();
    this.getFixedCosts();
    this.getItemDonations();
    this.getEntityLinks();
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  getFixedCosts() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.fixedcostsService.getFixedCosts('Ong', obj.id).subscribe(
      res_fixedcosts => { this.fixedcost_list = res_fixedcosts }
    )
  }

  getItemDonations() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.itemDonationsService.getItemDonations('Ong', obj.id).subscribe(
      res_itemDonations => { this.itemDonation_list = res_itemDonations }
    )
  }

  getEntityLinks() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.entityLinksService.getEntityLinks('Ong', obj.id).subscribe(
      res_entityLinks => {
        this.entityLink_list = res_entityLinks;
        this.entityLink_list.forEach(entitylink => {
          this.entityLinksService.getMetadata(entitylink.id).subscribe(
            res => {
              this.metadata = res;
              this.metadata.dbId = entitylink.id;
              this.metadata.dbCreated_at = entitylink.created_at;
              this.metadata_list.push(this.metadata);
              this.metadata_list.sort((a, b) => (a.dbId < b.dbId) ? 1 : -1)
            }
          )
        });
      }
    )
  }

  getOng() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.ongService.getOng(obj.id).subscribe(
      res_ong => {
        this.ong = res_ong;
        var url = this.ong.video_url;
        if (url.includes('www.youtube.com')) {
          this.videoId = url.split('v=')[1].split('&')[0];
        } else {
          this.videoId = url.split('.be/')[1];
        };
        if (this.ong.facebook != "" && !this.ong.facebook.includes('https://')) {
          this.ong.facebook = 'https://'.concat(this.ong.facebook)
        };
        if (this.ong.twitter != "" && !this.ong.twitter.includes('https://')) {
          this.ong.twitter = 'https://'.concat(this.ong.twitter)
        };
        if (this.ong.instagram != "" && !this.ong.instagram.includes('https://')) {
          this.ong.instagram = 'https://'.concat(this.ong.instagram)
        }
      }
    )
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  // old function to save donation
  // saveDonation(fc: FixedCost, amount: string) {
  //   let userData = this.tokenService.currentUserData;
  //   console.log(amount, fc.id, fc.title, userData.id, userData.name);

  //   let donationData = {amount: amount, fixed_cost_id: fc.id};
  //   this.fixedcostsService.donationPayment(donationData).subscribe(
  //     res => {
  //       console.log('preference_id', res['preference_id']);
  //       const script = document.createElement("script");
  //       script.type = "text/javascript";
  //       script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
  //       script.setAttribute('preferenceId', this.preference_id);
  //       const form = document.getElementById("form-id");
  //       form?.appendChild(script);
  //       this.displayCheckout(res['preference_id']);

  //       // const mp = new mercadopago('TEST-ad21e05e-710f-4fde-a1f4-dd749f8848cf', {
  //       //   locale: 'es-AR'
  //       // });
  //       // mp.checkout({
  //       //   preference: {
  //       //     id: this.preference_id
  //       //   },
  //       //   render: {
  //       //     container: '.cho-container',
  //       //     label: 'Pagar',
  //       //   }
  //       // });
  //     }
  //   )
  // }

  // old function to create checkout
  // displayCheckout(preference_id: string) {
  //   const mp = new MercadoPago('TEST-ad21e05e-710f-4fde-a1f4-dd749f8848cf', {
  //      locale: 'es-AR'
  //   });
  //   mp.checkout({
  //     preference: {
  //       id: preference_id
  //     },
  //     render: {
  //       container: '.cho-container',
  //       label: 'Pagar',
  //     }
  //   });
  // }

  // opens the modal to confirm the payment
  open(content: any, fc: FixedCost, amount: string) {
		this.modalService.open(content);

    let donationData = {amount: amount, fixed_cost_id: fc.id};
    this.fixedcostsService.donationPayment(donationData).subscribe(
      res => {
        console.log('preference_id', res['preference_id']);
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://sdk.mercadopago.com/js/v2";
        document.body.appendChild(script);
        script.addEventListener('load', this.createCheckout);
      }
    )
	}

  // creates checkout button "Pagar" inside the modal
  createCheckout() {
    const mp = new window.MercadoPago('SECRET_KEY', {
       locale: 'es-AR'
    });
    console.log(`mp`, mp)
    mp.checkout({
      preference: {
        id: this.preference_id
      },
      render: {
        container: '.cho-container',
        label: 'Pagar',
      }
    });
  }

  // function for testing payment button outside the fixed_costs table
  // pagar(fc: FixedCost, amount: string) {
  //   let donationData = {amount: amount, fixed_cost_id: fc.id};
  //   this.fixedcostsService.donationPayment(donationData).subscribe(
  //     res => {
  //       console.log('preference_id', res['preference_id']);
  //       const script = document.createElement("script");
  //       script.type = "text/javascript";
  //       script.src = "https://sdk.mercadopago.com/js/v2";
  //       document.body.appendChild(script);
  //       script.addEventListener('load', this.createCheckout);
  //     }
  //   )
  // }
}
