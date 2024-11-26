import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ]
})
export class InstructorListComponent implements OnInit {
  instructors: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/instructors').subscribe({
      next: (data: any) => {
        this.instructors = data;
        this.isLoading = false;
      },
      error: () => {
        console.error('Failed to fetch instructors');
        this.isLoading = false;
      },
    });
  }
}
