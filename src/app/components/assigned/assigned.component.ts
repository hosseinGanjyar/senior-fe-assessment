import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageComponent } from '../../shared/components/image/image.component';
import { AlertService } from '../../shared/services/alert/alert.service';
import { AssignedService } from '../../shared/services/assigned/assigned.service';

@Component({
  selector: 'app-assigned',
  standalone: true,
  imports: [CommonModule, ImageComponent, NgxPaginationModule],
  templateUrl: './assigned.component.html',
  styleUrl: './assigned.component.scss'
})
export class AssignedComponent {
  imageNameList: string[] = [];
  currentPage: number = 0;
  totalImages: number = 0;
  pageTotal: number = 6;

  constructor(
    private imageService: AssignedService,
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

  unAssignImage(imageName: string) {
    this.imageService.popNewImageFromQ('q-assigned', imageName);
    this.imageService.pushNewImageToQ('q-unAssigned', imageName);
    this.alertService.openSnackBar(`Remove image ${imageName} from Task`, 1000);
  }

}
