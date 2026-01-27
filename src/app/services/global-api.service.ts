import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiService {

  url:string = environment.apiUrl;
  constructor() { }

  getURL(){
    return this.url;
  }
}
