import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageComponent } from '../../shared/components/image/image.component';
import { UnAssignedService } from '../../shared/services/un-assigned/un-assigned.service';

@Component({
  selector: 'app-un-assigned',
  standalone: true,
  imports: [CommonModule, ImageComponent, NgxPaginationModule],
  templateUrl: './un-assigned.component.html',
  styleUrl: './un-assigned.component.scss'
})
export class UnAssignedComponent {
  imageNameList: string[] = [];
  currentPage: number = 0;
  totalImages: number = 0;
  pageTotal: number = 6;

  constructor(private imageService: UnAssignedService) { }

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
  }

}
