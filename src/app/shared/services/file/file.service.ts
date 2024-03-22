import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private _imageNameList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly imageNameList: Observable<string[]> = this._imageNameList.asObservable();

  constructor(private http: HttpClient) { }

  private getImagePathList(): Observable<string> {
    return this.http.get<string>('assets/data/image_paths.txt', {
      responseType: 'text' as 'json',
    });
  }

  loadImageNameList() {
    return this.getImagePathList()
      .pipe(
        map((res: string) => {
          // remove break line
          const imagePathList = res.split(/[\r\n]+/);

          // split name from url
          let arrName: string[] = [];
          imagePathList.forEach((element) => {
            if (element) {
              const name = element.split(
                'https://vst-test-images.s3.ap-southeast-1.amazonaws.com/sfe-images/'
              )[1];
              arrName.push(name);
            }
          });

          this._imageNameList.next(arrName);
        })
      );
  }

  getImageNameList(from: number, count: number): Observable<string[]> {
    return this.imageNameList.pipe(
      map((res: string[]) => {
        return res.splice(from, count);
      })
    );
  }
}
