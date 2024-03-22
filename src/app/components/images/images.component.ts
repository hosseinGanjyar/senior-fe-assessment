import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ImageComponent } from '../../shared/components/image/image.component';
import { ImageService } from '../../shared/services/image/image.service';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent {
  imageNameList: string[] = [];
  currentPage: number = 1;
  totalPage!: number;
  pageTotal: number = 3;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getImageNameList();
  }

  getImageNameList() {
    const _this = this;

    this.imageService.imageNameList
      .pipe(
        map(
          (res: any) => {
            debugger;

            if (res && res.length == 0) {
              debugger;

              this.imageService.loadImageNameList()
                .subscribe(
                  {
                    next() {
                      _this.pagingImages();
                    },
                    error(err) {
                      console.error(err);
                    },
                  }
                );
            }

          })
      );
  }

  pagingImages() {
    debugger;
    this.imageService
      .getImageNameList(this.currentPage, this.pageTotal)
      .subscribe((res: string[]) => {
        this.imageNameList = res;
      });
  }
}
