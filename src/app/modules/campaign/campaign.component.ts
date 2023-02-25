import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.model';
import { EntityLink } from 'src/app/models/entity-link.model';
import { FixedCost } from 'src/app/models/fixed-cost.model';
import { ItemDonation } from 'src/app/models/item-donation.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { EntityLinkService } from 'src/app/services/entity-link.service';
import { FixedCostsService } from 'src/app/services/fixed-costs.service';
import { ItemDonationsService } from 'src/app/services/item-donations.service';
import { SharedService } from 'src/app/services/shared.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class CampaignComponent implements OnInit {

  campaign: Campaign = new Campaign();
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

  constructor(private campaignService: CampaignService,
              private fixedcostsService: FixedCostsService,
              private itemDonationsService: ItemDonationsService,
              private entityLinksService: EntityLinkService,
              private sharedService: SharedService,
              config: NgbModalConfig,
              private modalService: NgbModal) {
    this.reloadEventsubscription =
      this.sharedService.getReloadCampaign().subscribe(() => {
        this.ngOnInit();
      })
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit(): void {
    this.getCampaign();
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
    this.fixedcostsService.getFixedCosts('Campaign', obj.id).subscribe(
      res_fixedcosts => { this.fixedcost_list = res_fixedcosts }
    )
  }

  getItemDonations() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.itemDonationsService.getItemDonations('Campaign', obj.id).subscribe(
      res_itemDonations => { this.itemDonation_list = res_itemDonations }
    )
  }

  getEntityLinks() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.entityLinksService.getEntityLinks('Campaign', obj.id).subscribe(
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

  getCampaign() {
    let obj = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.campaignService.getCampaign(obj ? obj.id.toString() : '0').subscribe(
      res_campaign => {
        this.campaign = res_campaign;
        var url = this.campaign.video_url;
        if (url.includes('www.youtube.com')) {
          this.videoId = url.split('v=')[1].split('&')[0];
        } else {
          this.videoId = url.split('.be/')[1];
        };
      }
    )
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  // validates value of amount and opens the modal for payment confirmation
  open(content: any, fc: FixedCost, amount: string) {
    function getValue(a: string): any {
      if (amount == '') {
        return 1;
      } 
      else if (parseFloat(amount) < 10 || parseFloat(amount) > fc.mount) {
        return 2;
      }
    }
    switch (getValue(amount)) {
      case 1:
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ingrese un monto válido a donar!'
        })
        break;
      case 2:
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Ingrese un monto a donar entre $10 y $${fc.mount}`
        })
        break;
      default:
        this.modalService.open(content);
        let donationData = {amount: amount, fixed_cost_id: fc.id};
        this.fixedcostsService.donationPayment(donationData).subscribe(
          res => {
            this.createCheckoutButton(res['preference_id']);
          }
        )
        break;
    }
	}

  // creates mercadopago checkout button using web-payment-checkout v1
  createCheckoutButton(preference:any) {
    var script = document.createElement("script");
    localStorage.setItem('preference_id', preference);
    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset['preferenceId'] = preference;
    let divButton = document.getElementById("checkout");
    let loader = document.getElementById("loader");
    let modal_payment = document.getElementById("modal-payment");
    divButton!.innerHTML = "";
    divButton!.appendChild(script);
    function waitForElm(button:any) {
      return new Promise(resolve => {
          if (document.querySelector(button)) {
              return resolve(document.querySelector(button));
          }
          const observer = new MutationObserver(mutations => {
              if (document.querySelector(button)) {
                  resolve(document.querySelector(button));
                  observer.disconnect();
              }
          });
          observer.observe(document.body, {
              childList: true,
              subtree: true
          });
      });
    }
    waitForElm('.mercadopago-button').then((elm) => {
      loader?.classList.add('d-none');
      loader?.classList.remove('d-flex');
      modal_payment?.classList.add('d-block');
      modal_payment?.classList.remove('d-none');
    });
  }
}
