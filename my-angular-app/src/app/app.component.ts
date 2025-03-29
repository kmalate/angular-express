import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-angular-app';
  tasks: any[] = [];
  // message: string = '';
  constructor(private apiService: ApiService, private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.fetchTaks();
    // this.apiService.getMessage().subscribe(
    //   (data:any) => {
    //     this.message = data;
    //   },
    //   (error: any) => {
    //     console.error('An error occured:', error);
    //   }
    // );
  }
  fetchTaks() {
    this.apiService.getTasks().subscribe(
      (data:any) => {
        this.tasks = data;
      },
      (error:any) => {
        console.error('An error occured:', error);
      }
    );
  }
  // Implement other CRUD operations (GET by ID, PUT, DELETE)
}
