import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  user: any;

  dataSource = new MatTableDataSource();
  skillsArray: any = [];
  displayedColumns: any = ['name', 'edit', 'delete'];

  categories = [
    { value: 'Conferencia', viewValue: 'Conferencia' },
    { value: 'Seminario', viewValue: 'Seminario' },
    { value: 'Congreso', viewValue: 'Congreso' },
    { value: 'Curso', viewValue: 'Curso' }];
  methods = [{ value: 'true', viewValue: 'Presencial' }, { value: 'false', viewValue: 'Virtual' }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ApiService) { }

  ngOnInit() {
    this.user = this.api.getUser();
    this.api.getEvents(this.user.id).subscribe(data => {
      this.skillsArray = data;
      this.updateDatasource(this.skillsArray);
      console.log(data)
    });
  }

  private updateDatasource(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit(form: NgForm) {
    this.api.createEvent(this.user.id, form.value).subscribe(data => {
      this.skillsArray.push(data);
      this.updateDatasource(this.skillsArray);
      form.reset();
    });
  }

  deleteElement(element) {
    this.api.deleteEvent(this.user.id, element.id).subscribe(data => {
      this.skillsArray = this.skillsArray.filter(skill => skill.id !== element.id);
      this.updateDatasource(this.skillsArray);
    });
  }

}
