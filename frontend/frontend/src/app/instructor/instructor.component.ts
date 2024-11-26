import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ]
})
export class InstructorComponent implements OnInit {
  instructor: any;
  isLoading = true;
  sortedEvents: any[] = [];
  totalDuration = 0;
  hasOverlap = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    const instructorId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8000/api/instructors/${instructorId}`).subscribe({
      next: (data: any) => {
        this.instructor = data;
        this.isLoading = false;

        if (this.instructor.events && this.instructor.events.length > 0) {
          this.sortedEvents = this.instructor.events.sort((a: any, b: any) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );

          this.calculateTotalDurationAndCheckOverlap();
        }
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  calculateTotalDurationAndCheckOverlap(): void {
    this.hasOverlap = this.checkForOverlaps(this.sortedEvents);
    const mergedPeriods = this.mergeOverlappingPeriods(this.sortedEvents);
    this.totalDuration = this.calculateTotalDuration(mergedPeriods);
  }

  private checkForOverlaps(events: any[]): boolean {
    const eventPeriods: { start: Date; end: Date }[] = [];

    for (const event of events) {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);

      for (const period of eventPeriods) {
        if (start <= period.end && end >= period.start) {
          return true;
        }
      }

      eventPeriods.push({start, end});
    }

    return false;
  }

  private mergeOverlappingPeriods(events: any[]): { start: Date; end: Date }[] {
    const eventPeriods = events.map((event) => ({
      start: new Date(event.startDate),
      end: new Date(event.endDate),
    }));

    eventPeriods.sort((a, b) => a.start.getTime() - b.start.getTime());

    const mergedPeriods: { start: Date; end: Date }[] = [];
    for (const period of eventPeriods) {
      if (
        mergedPeriods.length > 0 &&
        mergedPeriods[mergedPeriods.length - 1].end >= period.start
      ) {
        mergedPeriods[mergedPeriods.length - 1].end = new Date(
          Math.max(
            mergedPeriods[mergedPeriods.length - 1].end.getTime(),
            period.end.getTime()
          )
        );
      } else {
        mergedPeriods.push(period);
      }
    }

    return mergedPeriods;
  }

  private calculateTotalDuration(periods: { start: Date; end: Date }[]): number {
    return periods.reduce(
      (sum, period) =>
        sum +
        (period.end.getTime() - period.start.getTime()) / (1000 * 60 * 60 * 24) +
        1,
      0
    );
  }

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

  deleteEvent(eventId: number): void {
    const confirmed = window.confirm('Are you sure to delete this event?');
    if (confirmed) {
      this.http.delete(`http://localhost:8000/api/events/${eventId}`).subscribe({
        next: () => {
          alert('Event deleted successfully');
          this.ngOnInit();
        },
        error: () => {
          alert('Failed to delete event');
        }
      });
    }
  }
}
