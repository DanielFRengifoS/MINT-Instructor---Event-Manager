import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  imports: [
    NgIf,
    RouterLink
  ],
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: any;
  isLoading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
    return Math.max(duration, 0);
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8000/api/events/${eventId}`).subscribe({
      next: (data) => {
        this.event = data;
        this.isLoading = false;
      },
      error: () => {
        console.error('Failed to fetch event details');
        this.isLoading = false;
      }
    });
  }
}
