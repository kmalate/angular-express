import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-protected',
  imports: [],
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css'
})
export class ProtectedComponent implements OnInit {
  message: String = "";

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.protected().subscribe({
      next : (response) => {
        if (response) {
          this.message = "You are authenticated!";
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.message = "You are not authorized!";
        }
      },
      complete: () => {
        console.log("HTTP request done");
      }
    });
  }
}
