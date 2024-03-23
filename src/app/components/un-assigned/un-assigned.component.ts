import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageComponent } from '../../shared/components/image/image.component';
import { AlertService } from '../../shared/services/alert/alert.service';
import { UnAssignedService } from '../../shared/services/un-assigned/un-assigned.service';


@Component({
  selector: 'app-un-assigned',
  standalone: true,
  imports: [CommonModule, ImageComponent, NgxPaginationModule, MatButtonModule, MatIconModule],
  templateUrl: './un-assigned.component.html',
  styleUrl: './un-assigned.component.scss'
})
export class UnAssignedComponent {
  imageNameList: string[] = [];
  currentPage: number = 0;
  totalImages: number = 0;
  pageTotal: number = 6;
  isFullScreen: boolean = false;


  constructor(
    private imageService: UnAssignedService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    let _this = this;

    this.imageService.getImageNameList()
      .subscribe(
        {
          next(value: string[] | undefined) {
            if (value) {
              _this.imageNameList = value;
              _this.totalImages = value?.length;
            } else // try to get data from local storage
              _this.imageService.setImageNameListToStorage();
          }
        }
      );
  }

  assignImage(imageName: string) {
    this.imageService.popNewImageFromQ('q-unAssigned', imageName);
    this.imageService.pushNewImageToQ('q-assigned', imageName);
    this.alertService.openSnackBar(`Add image ${imageName} to Task`, 3000);
  }

  toggleFullScreen(state: any) {
    this.isFullScreen = state;
  }
}
