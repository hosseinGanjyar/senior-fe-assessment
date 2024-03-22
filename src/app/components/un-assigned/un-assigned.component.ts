import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageComponent } from '../../shared/components/image/image.component';
import { UnAssignedService } from '../../shared/services/un-assigned/un-assigned.service';

@Component({
  selector: 'app-un-assigned',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './un-assigned.component.html',
  styleUrl: './un-assigned.component.scss'
})
export class UnAssignedComponent {
  imageNameList: string[] = [];
  currentPage: number = 0;
  totalPage!: number;
  pageTotal: number = 3;

  constructor(private imageService: UnAssignedService) { }

  ngOnInit() {
    this.pagingImages();
  }

  pagingImages() {
    let _this = this;

    this.imageService.getImageNameList(this.currentPage, this.pageTotal)
      .subscribe(
        {
          next(value: string[] | undefined) {
            debugger;

            if (value)
              _this.imageNameList = value;
            else // try to get data from local storage
              _this.imageService.setImageNameListToStorage();
          }
        }
      );
  }

}
