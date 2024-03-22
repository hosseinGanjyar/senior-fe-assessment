import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  localSetItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  localGetItem(key: string) {
    return localStorage.getItem(key);
  }

  localRemoveItem(key: string) {
    return localStorage.removeItem(key);
  }
}
