import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageComponent } from '../../shared/components/image/image.component';
import { AlertService } from '../../shared/services/alert/alert.service';
import { StateService } from '../../shared/services/state/state.service';

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
    private alertService: AlertService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    let _this = this;

    this.stateService.getCurrentImageNameList('assigned')
      .subscribe(
        {
          next(value: string[] | undefined) {
            if (value) {
              _this.imageNameList = value;
              _this.totalImages = value?.length;
            } else // try to get data from local storage
              _this.stateService.loadImageNameListToStorage('assigned');
          }
        }
      );
  }

  unAssignImage(imageName: string) {
    this.stateService.popNewImageFromQ('q-assigned', imageName);
    this.stateService.pushNewImageToQ('q-unAssigned', imageName);

    // update states
    this.stateService.updateStates();

    this.alertService.openSnackBar(`Remove image ${imageName} from Task`, 3000);
  }

}
