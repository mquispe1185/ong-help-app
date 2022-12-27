import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Campaign } from 'src/app/models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign-info',
  templateUrl: './campaign-info.component.html',
  styleUrls: ['./campaign-info.component.scss']
})
export class CampaignInfoComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImages: any[] = [];
  photo: File;
  photos: File[] = [];
  photo_added = true;
  campaignSelected: Campaign;
  campaign: Campaign;

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.getCampaign()
  }

  getCampaign() {
    let obj = JSON.parse(localStorage.getItem('entitySelected')|| '{}');
    this.campaignService.getCampaign(obj.id).subscribe(
      res_campaign => { 
        this.campaign = res_campaign
      }
    )
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    if (Boolean(this.imageChangedEvent)) {
      this.photo_added = false;
    }
  }

  addPhoto() {
    this.photo_added = true;
    this.croppedImages.push(this.croppedImage);
    this.imageChangedEvent = '';
    var file = this.dataURLtoFile(this.croppedImage, 'image.png');
    this.photos.push(file);
  }

  savePhoto() {
    this.addPhoto();
    this.croppedImage=undefined;
    this.campaignSelected = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.campaignService.uploadPhotos(this.photos, this.campaignSelected.id).subscribe(
      res => {
        Swal.fire(
          '¡Guardado!',
          'Su foto ha sido cargada correctamente.',
          'success'
        )
        this.photos.splice(0);
        this.getCampaign()
      }
    )
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  dataURLtoFile(dataurl: any, filename: any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  deletePhoto(photo: any, campaign: Campaign) {
    this.campaignService.deletePhoto(photo[0], campaign).subscribe(
      res => {
        Swal.fire(
          '¡Eliminado!',
          'Su foto ha sido eliminada.',
          'success'
        )
        this.getCampaign()
      }
    )
  }

}
