import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TestClass {

  square(x: number): number {
    return x * x;
  }

}
