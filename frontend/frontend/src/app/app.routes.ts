import { Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {InstructorListComponent} from "./instructor-list/instructor-list.component";
import {InstructorComponent} from './instructor/instructor.component';
import {EventComponent} from './event/event.component';
import {EventCreateComponent} from './event-create/event-create.component';
import {EventEditComponent} from './event-edit/event-edit.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'instructors', component: InstructorListComponent },
    { path: 'instructor/:id', component: InstructorComponent },
    { path: 'event/:id', component: EventComponent },
    { path: 'instructor/:id/event-create', component: EventCreateComponent },
  { path: 'instructor/:instructorId/event-edit/:eventId', component: EventEditComponent }
];
