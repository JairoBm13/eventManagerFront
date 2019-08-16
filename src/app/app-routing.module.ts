import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { IndexComponent } from './index/index.component';

import { AuthGuardService } from './auth-guard-service.service';
import { EventComponent } from './event/event.component';
import { EditEventComponent } from './edit-event/edit-event.component';



const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuardService] },
  { path: 'events/:event', component: EventComponent, canActivate: [AuthGuardService] },
  { path: 'events/:event/edit', component: EditEventComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: 'index' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
