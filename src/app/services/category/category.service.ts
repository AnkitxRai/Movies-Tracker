import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ApiUrlService } from '../api-url/api-url.service';


export interface Category {
  name: string
}

export interface CategoryState {
  categories: Category[] | null;
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  public state: BehaviorSubject<CategoryState | null> = new BehaviorSubject<CategoryState | null>(null);

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }


  /**
   *
   * @param categories
   */
  public init(categories: Category[]) {
    this.state.next({
      categories: categories,
    });
  }

  /**
   *
   * @returns state
   */
  public snapshot() {
    const value = this.state.value;
    if(!value)  {
      throw new Error('Category state is not initialized yet');
    }
    return value
  }


/**
 *
 * @param categories
 */
  public setCategory(categories: Category[]){
    const currentState = this.snapshot();
    currentState.categories = categories;
    this.state.next(currentState)
  }

  /**
   *
   * @returns categories
   */
  getCategories() {
    return this.http.get(this.apiUrlService.getApiUrl('categories'));
  }

  /**
   *
   * @param data
   * @returns
   */
  addCategory(data: Category) {
    return this.http.post(this.apiUrlService.getApiUrl('categories'), data);
  }


}
