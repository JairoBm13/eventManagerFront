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
