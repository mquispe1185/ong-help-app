import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Ong } from 'src/app/models/ong.model';
import { OngService } from 'src/app/services/ong.service';
import Swal from 'sweetalert2';

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

  constructor(private ongService: OngService) { }

  ngOnInit(): void {
    this.getOng()    
  }

  getOng() {
    let obj = JSON.parse(localStorage.getItem('entitySelected')|| '{}');
    this.ongService.getOng(obj.id).subscribe(
      res_ong => { 
        this.ong = res_ong
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
    this.croppedImage = undefined;
    this.ongSelected = JSON.parse(localStorage.getItem('entitySelected') || '{}');
    this.ongService.uploadPhotos(this.photos, this.ongSelected.id).subscribe(
      res => {
        Swal.fire(
          '¡Guardado!',
          'Su foto ha sido cargada correctamente.',
          'success'
        )
        this.photos.splice(0);
        this.getOng()
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

  deletePhoto(photo: any, ong: Ong) {
    this.ongService.deletePhoto(photo[0], ong).subscribe(
      res => {
        Swal.fire(
          '¡Eliminado!',
          'Su foto ha sido eliminada.',
          'success'
        )
        this.getOng()
      }
    )
  }

}
