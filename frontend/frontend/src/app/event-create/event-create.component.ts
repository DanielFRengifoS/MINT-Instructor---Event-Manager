import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
    NgForOf
  ]
})
export class EventCreateComponent {
  event = {
    type: '',
    description: '',
    startDate: '',
    endDate: '',
  };

  instructorId: string | null = null;
  eventTypes = ['SEMINAR', 'PROJECT_WEEK', 'VACATION'];
  dateError = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.instructorId = this.route.snapshot.paramMap.get('id');
  }

  validateDates(): void {
    if (this.event.startDate && this.event.endDate) {
      this.dateError =
        new Date(this.event.startDate) >= new Date(this.event.endDate);
    }
  }

  onSubmit(): void {
    if (this.dateError || !this.instructorId) return;

    this.http
      .get(`http://localhost:8000/api/instructors/${this.instructorId}`)
      .subscribe({
        next: (instructor: any) => {
          instructor.events.push(this.event);
          this.http
            .put(
              `http://localhost:8000/api/instructors/${this.instructorId}/events`,
              instructor.events
            )
            .subscribe({
              next: () => {
                alert('Event created successfully');
                this.router.navigate(['/instructor', this.instructorId]);
              },
              error: () => {
                alert('Failed to create event');
              },
            });
        },
        error: () => {
          alert('Failed to fetch instructor');
        },
      });
  }
}
