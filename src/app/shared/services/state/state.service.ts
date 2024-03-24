import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FileService } from '../file/file.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _unAssignedImageNameList$: BehaviorSubject<string[] | undefined> = new BehaviorSubject<string[] | undefined>(undefined);
  public readonly unAssignedImageNameList$: Observable<string[] | undefined> = this._unAssignedImageNameList$?.asObservable();

  private _assignedImageNameList$: BehaviorSubject<string[] | undefined> = new BehaviorSubject<string[] | undefined>(undefined);
  public readonly assignedImageNameList$: Observable<string[] | undefined> = this._assignedImageNameList$?.asObservable();

  constructor(
    private store: StorageService,
    private fileService: FileService,
  ) { }

  getCurrentImageNameList(type: string): Observable<string[] | undefined> {
    if (type == 'unAssigned')
      return this.unAssignedImageNameList$;
    else if (type == 'assigned')
      return this.assignedImageNameList$;
    else
      return of([]);
  }


  loadImageNameListToStorage(type: string) {
    const Q = this.getQData(`q-${type}`);

    if (Q) { // once reloading or routing
      this.updateCurrentImageNameList(JSON.parse(Q), type);
    } else { // storage is null, so here is first load of project and then save image name list on storage for next usages
      let _this = this;

      this.fileService.getImageNameList()
        .subscribe(
          {
            next(value: string[]) {
              if (type == 'assigned') // set empty for first time to detect if load from assigned route next time
                value = [];

              _this.fillQ(value, `q-${type}`);
              _this.updateCurrentImageNameList(value, type);
            }
          }
        );
    }
  };

  updateCurrentImageNameList(data: string[], type: string) {
    if (type == 'unAssigned')
      this._unAssignedImageNameList$.next(data);
    else if (type == 'assigned')
      this._assignedImageNameList$.next(data);

  }

  /**
   * 
   * @param data stringified data
   * @param qName name of key on storage
   */
  fillQ(data: string[], qName: string) {
    this.store.localSetItem(qName, JSON.stringify(data));
  }

  popNewImageFromQ(qName: string, imageName: string) {
    let q = this.getQData(qName);

    if (typeof q === 'string') {
      let qImageNames: string[] = JSON.parse(q);
      qImageNames = qImageNames.filter(x => x != imageName);
      this.store.localSetItem(qName, JSON.stringify(qImageNames));
    }
  }

  pushNewImageToQ(qName: string, imageName: string) {
    let q = this.getQData(qName);

    if (typeof q === 'string') {
      let qImageNames: string[] = JSON.parse(q);
      qImageNames.push(imageName);
      this.store.localSetItem(qName, JSON.stringify(qImageNames));
    }
  }

  getQData(qName: string): string | null {
    return this.store.localGetItem(qName);
  }

  updateStates() {
    const qData_unAssigned = this.getQData('q-unAssigned') || '';
    this.updateCurrentImageNameList(JSON.parse(qData_unAssigned), 'unAssigned');

    const qData_assigned = this.getQData('q-assigned') || '';
    this.updateCurrentImageNameList(JSON.parse(qData_assigned), 'assigned');

  }
}
