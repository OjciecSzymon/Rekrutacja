import { Component, OnInit } from '@angular/core';
import { WorksService } from './../config/works.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  works: any;
  subscription: Subscription;
  groupDate: any;

  constructor(private worksService: WorksService, private router: Router) {
    
   }
  
  ngOnInit(): void {
    this.getWorks();
    
    this.subscription = this.worksService.getNewWork().subscribe(data => {
      if (data) {
        for (let typeWork of this.works) {
          if (typeWork.type == 0 && data.value.id == 0) {
            typeWork.data.push(data.value);
          }
        }
      } 
    });

    this.subscription = this.worksService.getEditWork().subscribe(data => {
      if (data) {
        for (let typeWork of this.works) {
          for (let work of typeWork.data) {
            if (work.id == data.value.id) {
              work.name = data.value.name;
              work.date = data.value.date;
            }
          }
        }
      } 
    });
  }

  getWorks() {
    this.worksService.getWorks().subscribe(
      data => { this.works = data },
      err => console.error(err),
      () => console.log('Works loaded.')
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeWork(worksType, work) {
    this.works[this.works.indexOf(worksType)].data.splice(this.works[this.works.indexOf(worksType)].data.indexOf(work), 1);
  }

  editWork(work) {
    this.router.navigate(['dashboard/edit-work/' + work.id]);
  }

  getGroupDate(event: any) {
    this.groupDate = event.target.value;
  }

  groupItem() {
    
  }

}
