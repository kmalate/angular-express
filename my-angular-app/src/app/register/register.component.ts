import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IUser } from '../shared/models/user.model';
import { IResponse } from '../shared/models/response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @ViewChild("registerForm", {static: false}) registerForm!: NgForm;
  response: IResponse | null = null;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.response = null;
  }

  onRegisterSubmit() {
    const user:IUser =  { 
      userName: this.registerForm.value.username,
      password: this.registerForm.value.password
    };

    this.userService.register(user).subscribe(
      {
        next: (response) => {
          this.response = response;
        },
        error: (error) => {
          this.response = error.error;
        }
      }
    );
  }
}
