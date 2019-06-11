import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Helpers {
  removeItem<T>(array: Array<T>, index: number) {
    array.splice(index, 1);
  }
}
