import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-angular-app';
  tasks: any[] = [];
  // message: string = '';
  constructor(private apiService: ApiService) {}
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
