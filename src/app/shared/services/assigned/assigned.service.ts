import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FileService } from '../file/file.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AssignedService {
  private _currentImageNameList$: BehaviorSubject<string[] | undefined> = new BehaviorSubject<string[] | undefined>(undefined);
  public readonly currentImageNameList$: Observable<string[] | undefined> = this._currentImageNameList$?.asObservable();
  private Q_unAssignedName = 'q-unAssigned';
  private Q_assignedName = 'q-assigned';

  constructor(
    private store: StorageService,
    private fileService: FileService
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
    const Q_assigned = this.store.localGetItem(this.Q_assignedName);

    if (Q_assigned) {
      this.setCurrentImageNameList(JSON.parse(Q_assigned));
    } else { // first load of project
      let _this = this;

      this.fileService.getImageNameList()
        .subscribe(
          {
            next(value: string[]) {
              _this.fillQAssigned(value);
              _this.setCurrentImageNameList(value);
            }
          }
        );
    }
  };

  setCurrentImageNameList(data: string[]) {
    this._currentImageNameList$.next(data);
  }

  fillQAssigned(data: string[]) {
    this.store.localSetItem(this.Q_assignedName, JSON.stringify(data));
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
    }
  }
}
