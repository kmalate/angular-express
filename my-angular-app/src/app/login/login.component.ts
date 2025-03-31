import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IUser } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { IResponse } from '../shared/models/response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  //This will give access to the form
  @ViewChild("loginForm", {static: false}) loginForm!: NgForm;
  response: IResponse | null = null;

  constructor(private userService: UserService, private authService: AuthService) {}
  ngOnInit(): void {
    this.response = null;
  }

  onLoginSubmit() {
    const user:IUser =  { 
          userName: this.loginForm.value.username,
          password: this.loginForm.value.password
        };
    this.userService.login(user).subscribe(
      {
        next: (response: IResponse) => {
          this.authService.setLocalStorage(response);
          this.response = response;
        },
        error: (error) => {
          console.log(error);
          this.response = error.error;
        }
      }
    );
  }
}
