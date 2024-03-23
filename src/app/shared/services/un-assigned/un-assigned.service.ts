import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AssignedService } from '../assigned/assigned.service';
import { FileService } from '../file/file.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UnAssignedService {
  private _currentImageNameList$: BehaviorSubject<string[] | undefined> = new BehaviorSubject<string[] | undefined>(undefined);
  public readonly currentImageNameList$: Observable<string[] | undefined> = this._currentImageNameList$?.asObservable();
  private Q_unAssignedName = 'q-unAssigned';
  private Q_assignedName = 'q-assigned';

  constructor(
    private store: StorageService,
    private fileService: FileService,
    private assignedService: AssignedService
  ) { }

  private getCurrentImageNameList(): Observable<string[] | undefined> {
    return this.currentImageNameList$;
  }

  getImageNameList(): Observable<string[] | undefined> {
    return this.getCurrentImageNameList()
      .pipe(
        map((res: string[] | undefined) => {
          if (res) {
            return res;
          }
          else
            return res;
        })
      );
  }

  setImageNameListToStorage(): void {
    const Q_unAssigned = this.store.localGetItem(this.Q_unAssignedName);

    if (Q_unAssigned) {
      this.setCurrentImageNameList(JSON.parse(Q_unAssigned));
    } else { // first load of project
      let _this = this;

      this.fileService.getImageNameList()
        .subscribe(
          {
            next(value: string[]) {
              _this.fillQUnAssigned(value);
              _this.setCurrentImageNameList(value);
            }
          }
        );
    }
  };

  setCurrentImageNameList(data: string[]) {
    this._currentImageNameList$.next(data);
  }

  fillQUnAssigned(data: string[]) {
    this.store.localSetItem(this.Q_unAssignedName, JSON.stringify(data));
    this.store.localSetItem(this.Q_assignedName, JSON.stringify([]));
  }

  popNewImageFromQ(qName: string, imageName: string) {
    let q = this.store.localGetItem(qName);

    if (typeof q === 'string') {
      let qImageNames: string[] = JSON.parse(q);
      qImageNames = qImageNames.filter(x => x != imageName);
      this.store.localSetItem(qName, JSON.stringify(qImageNames));
      this.setCurrentImageNameList(qImageNames);
    }
  }

  pushNewImageToQ(qName: string, imageName: string) {
    let q = this.store.localGetItem(qName);

    if (typeof q === 'string') {
      let qImageNames: string[] = JSON.parse(q);
      qImageNames.push(imageName);
      this.store.localSetItem(qName, JSON.stringify(qImageNames));
      this.assignedService.setCurrentImageNameList(qImageNames);
    }
  }

}
