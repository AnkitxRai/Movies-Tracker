import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { ApiUrlService } from '../api-url/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: boolean = false;

  constructor(public http:HttpClient , private apiUrlService: ApiUrlService) { }


  /**
   *
   * @returns users list
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlService.getApiUrl('users'));
  }

  /**
   *
   * @param data
   * @returns
   */
  public register(user: User) {
    return this.http.post(this.apiUrlService.getApiUrl('users'), user);
  }

}
