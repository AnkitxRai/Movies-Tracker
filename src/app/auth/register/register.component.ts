import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
export interface Category {
  name: string
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  categories: Category[] | null = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.provideCategories();
    this.initForm();
    this.onSubmit();
  }

  private initForm()  {
    this.registerForm = new FormGroup({
      fname: new FormControl('', []),
      lname: new FormControl('', []),
      username: new FormControl('', []),
      email: new FormControl('', []),
      password: new FormControl('', []),
      confirm_password: new FormControl('', []),
      gender: new FormControl(''),
      address: new FormGroup({
        country: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl(''),
        street: new FormControl(''),
        zip: new FormControl(''),
      }),
      t_c: new FormControl(''),
      newsletter: new FormControl(''),
      categories: new FormArray([])
    })
  }

  /**
   *
   * @param e
   */
  public onCheckboxChange(e: any) {  // this method is used to push new FormControl into FormArray when toggling checkboxes
    const isArray: FormArray = this.registerForm.get('categories') as FormArray;
    if (e.target.checked) {
      isArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      isArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  private provideCategories() {
    this.categories = this.categoryService.snapshot().categories;
  }

  public onSubmit()  {
    console.log(this.registerForm.getRawValue());
  }



}
