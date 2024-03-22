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
  currentPage: number = 1;
  totalPage!: number;
  pageTotal: number = 3;

  constructor(private imageService: UnAssignedService) { }

  ngOnInit() {

    this.getImageNameList();
  }

  getImageNameList() {
    this.imageService.getImageNameList(this.currentPage, this.pageTotal)
      .subscribe(
        (res: any) => {
          this.imageNameList = res;
        }
      );
  }

  pagingImages() {
    this.imageService
      .getImageNameList(this.currentPage, this.pageTotal)
      .subscribe((res: string[]) => {
        this.imageNameList = res;
      });
  }
}
