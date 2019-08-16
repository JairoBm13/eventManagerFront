import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpRequest, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from './../environments/environment';

const url = environment.urlAddress;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user;

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private headers() {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    return { headers: headers };
  }

  login(data) {
    return this.http.post(url + 'login', data, this.headers())
      .pipe(
        catchError(this.handleError<any>('failLogin'))
      );
  }

  register(data) {
    return this.http.post(url + 'signup', data, this.headers())
      .pipe(
        catchError(this.handleError<any>('failRegister'))
      );
  }

  getUser() {
    return this.user;
  }

  setUser(newUSer) {
    this.user = newUSer;
  }



  // GETS

  getEvents(user) {
    return this.http.get(url + user + '/events', this.headers())
      .pipe(
        catchError(this.handleError<any>('getEvents'))
      );
  }

  getEventDetail(user, event) {
    return this.http.get(url + user + '/events/' + event, this.headers())
      .pipe(
        catchError(this.handleError<any>('getDetails'))
      );
  }


  // POSTS

  createEvent(user, element: any): Observable<any> {
    return this.http.post(url + user + '/events', element, this.headers())
      .pipe(
        catchError(this.handleError<any>('createElement'))
      );
  }


  // DELETE

  deleteEvent(user, data) {
    console.log(data)
    return this.http.delete(url + user + '/events/' + data, this.headers())
      .pipe(
        catchError(this.handleError<any>('deleteElement'))
      );
  }

  // PUTS
  editEvent(user, data) {
    return this.http.put(url + user + '/events', data, this.headers())
      .pipe(
        catchError(this.handleError<any>('update'))
      );
  }

}
