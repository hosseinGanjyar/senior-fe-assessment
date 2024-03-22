import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FileService } from '../file/file.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UnAssignedService {
  private _currentImageNameList: BehaviorSubject<string[] | undefined> = new BehaviorSubject<string[] | undefined>(undefined);
  public readonly currentImageNameList: Observable<string[] | undefined> = this._currentImageNameList?.asObservable();
  private QName = 'q-unAssigned';

  constructor(
    private store: StorageService,
    private fileService: FileService
  ) { }

  private getCurrentImageNameList(): Observable<string[] | undefined> {
    return this.currentImageNameList;
  }

  getImageNameList(from?: number, count?: number): Observable<string[] | undefined> {
    return this.getCurrentImageNameList()
      .pipe(
        map((res: string[] | undefined) => {
          if (res) {
            // return res.splice(from, count);
            return res;
          }
          else
            return res;
        })
      );
  }

  setImageNameListToStorage(): void {
    const Q_unAssigned = this.store.localGetItem(this.QName);

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
    this._currentImageNameList.next(data);
  }

  fillQUnAssigned(data: string[]) {
    this.store.localSetItem(this.QName, JSON.stringify(data));
  }

  unAssignImage(image: string) {
    this._currentImageNameList.next([image]);
  }

}
