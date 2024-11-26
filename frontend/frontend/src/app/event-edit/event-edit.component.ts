import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
    NgForOf
  ]
})
export class EventEditComponent implements OnInit {
  instructorId: string | null = null;
  eventId: string | null = null;
  event: any = null;
  eventTypes = ['SEMINAR', 'PROJECT_WEEK', 'VACATION'];
  dateError = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve instructorId and eventId from the route
    this.instructorId = this.route.snapshot.paramMap.get('instructorId');
    this.eventId = this.route.snapshot.paramMap.get('eventId');

    if (this.eventId) {
      this.http.get(`http://localhost:8000/api/events/${this.eventId}`).subscribe({
        next: (data: any) => {
          this.event = data;
        },
        error: () => {
          alert('Failed to load event details');
          this.router.navigate(['/instructors']);
        },
      });
    } else {
      alert('Event ID is missing');
      this.router.navigate(['/instructors']);
    }
  }

  validateDates(): void {
    if (this.event.startDate && this.event.endDate) {
      this.dateError =
        new Date(this.event.startDate) >= new Date(this.event.endDate);
    }
  }
  onSubmit(): void {
    if (this.dateError || !this.instructorId) {
      alert('Invalid data. Please check and try again.');
      return;
    }

    this.http
      .get(`http://localhost:8000/api/instructors/${this.instructorId}`)
      .subscribe({
        next: (instructor: any) => {
          console.log(instructor.events);
          console.log(this.event);
          console.log(this.eventId);
          let arr: any[] = [];
          instructor.events.forEach((ev: any) => {
              if(ev.id == this.eventId) {
                console.log(ev.id);
                arr.push(this.event);
              } else {
                arr.push(ev);
              }
            }
          );

          console.log(arr);

          this.http
            .put(
              `http://localhost:8000/api/instructors/${this.instructorId}/events`,
              arr
            )
            .subscribe({
              next: () => {
                alert('Event updated successfully');
                this.router.navigate(['/instructor', this.instructorId]);
              },
              error: () => {
                alert('Failed to update event');
              },
            });
        },
        error: () => {
          alert('Failed to fetch instructor data');
        },
      });
  }

}
