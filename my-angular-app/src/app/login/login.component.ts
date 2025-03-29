import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IUser } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //This will give access to the form
  @ViewChild("loginForm", {static: false}) loginForm!: NgForm;

  constructor(private userService: UserService, private authService: AuthService) {}

  onLoginSubmit() {
    const user:IUser =  { 
          userName: this.loginForm.value.username,
          password: this.loginForm.value.password
        };
    this.userService.login(user).subscribe(
      {
        next: (response) => {
          this.authService.setLocalStorage(response);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('done!');
        }
      }
    );
  }
}
