import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  constructor() { }

  baseUrl() {
    return environment.baseUrl;
  }

  getApiUrl(url: string) {
    return `${this.baseUrl()}/${url}`
  }
}
