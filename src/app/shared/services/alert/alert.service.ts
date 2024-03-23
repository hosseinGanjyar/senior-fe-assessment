import { Injectable } from '@angular/core';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, undefined, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: duration
    });
  }
}
