import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageService } from '../../shared/services/image/image.service';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {
  imageNameList: string[] = [];
  currentPage: number = 0;
  totalPage!: number;
  pageTotal: number = 3;


  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit() {
    const _this = this;

    this.imageService.loadImageNameList()
      .subscribe({
        next() {
          _this.getImageNameList();
        },
        error(err) {
          console.error(err);
        },
      });
  }

  getImageNameList() {
    this.imageService.getImageNameList(this.currentPage, this.pageTotal)
      .subscribe(
        (res: string[]) => {
          this.imageNameList = res;
        }
      );
  }

}
