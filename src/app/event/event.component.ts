import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  user;
  event;

  categories = [
    { value: 'Conferencia', viewValue: 'Conferencia' },
    { value: 'Seminario', viewValue: 'Seminario' },
    { value: 'Congreso', viewValue: 'Congreso' },
    { value: 'Curso', viewValue: 'Curso' }];
  methods = [{ value: 'true', viewValue: 'Presencial' }, { value: 'false', viewValue: 'Virtual' }];
  constructor(
    private api: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.api.getUser();
    this.api.getEventDetail(this.user.id, this.route.snapshot.params.event).subscribe(data => {
      this.event = data;
    });
  }

}
