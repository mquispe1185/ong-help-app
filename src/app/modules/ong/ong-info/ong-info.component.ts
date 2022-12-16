import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Ong } from 'src/app/models/ong.model';
import { OngService } from 'src/app/services/ong.service';

@Component({
  selector: 'app-ong-info',
  templateUrl: './ong-info.component.html',
  styleUrls: ['./ong-info.component.scss']
})
export class OngInfoComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImages: any[] = [];
  photo: File;
  photos: File[] = [];
  photo_added = true;
  ongSelected: Ong;
  ong: Ong;
  public photoURL: SafeResourceUrl;

  constructor(private ongService: OngService,
              private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getOng();
    
  }

  getOng() {
    let obj = JSON.parse(localStorage.getItem('entitySelected')|| '{}');
    this.ongService.getOng(obj.id).subscribe(
      res_ong => { this.ong = res_ong; 
        this.photoURL = this.sanitizer.bypassSecurityTrustResourceUrl("file:///home/jose/proyectos/ong-help-api/storage/5r/9h/5r9hmhy1q8ibif15jnn1o3d8t3nn");
        console.log('objeto: ', this.ong.photos[0]) }
    )
  }

  displayPhoto(n: number) {
    return this.ong.photos[n]
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log('filechangeevent')
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
    console.log('foto agregada')
  }

  savePhoto() {
    this.ongSelected = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.ongService.uploadPhotos(this.photos, this.ongSelected.id).subscribe(
      res => {
        console.log('foto guardada');
        this.photos.splice(0);
        console.log('fotos: ', this.ongService.getOng(this.ongSelected.id))
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

}
