import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.setupForm();
  }

  private setupForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if(!!this.loginForm.valid)
    this.auth.getUsers().subscribe((res) => {
      const user = res.find((a: User) => {
        return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
      })
      if(!!user) {
        alert('login success')
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      } else {
        alert('user not found');
      }
    })
  }

}
