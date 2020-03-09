import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  private subject = new Subject<any>();
  configURL = 'assets/works.json';
  newWork: any;
  editWork: any;

  constructor(private http: HttpClient) {

  }

  getWorks() {
    return this.http.get(this.configURL);
  }

  getNewWork(): Observable<any> {
    return this.subject.asObservable();
  }
  sendNewWork(data: any) {
    this.subject.next(data);
  }

  getEditWork(): Observable<any> {
    return this.subject.asObservable();
  }
  sendEditWork(data: any) {
    this.subject.next(data);
  }
}
