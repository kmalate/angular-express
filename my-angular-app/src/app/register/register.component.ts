import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IUser } from '../shared/models/user.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild("registerForm", {static: false}) registerForm!: NgForm;

  constructor(private userService: UserService) {}

  onRegisterSubmit() {
    const user:IUser =  { 
      userName: this.registerForm.value.username,
      password: this.registerForm.value.password
    };

    this.userService.register(user).subscribe(
      {
        next: (response) => {
          console.log(response);
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
