import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiService {

  url:string = "http://localhost:3000/Devops";
  constructor() { }

  getURL(){
    return this.url;
  }
}
