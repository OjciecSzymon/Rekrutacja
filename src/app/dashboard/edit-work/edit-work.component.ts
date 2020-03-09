import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorksService } from './../../config/works.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss']
})
export class EditWorkComponent implements OnInit {

  checkoutForm: FormGroup;
  id: any;
  works: any;
  work: any;
  
  constructor(private formBuilder: FormBuilder, private worksService: WorksService, private router: Router, private route: ActivatedRoute) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      date: '',
      id: this.id
    });
   }

  ngOnInit(): void {
    this.getWorks();
  }

  getWork() {
    this.id = this.route.snapshot.paramMap.get('id');

    for (let work of this.works) {
      for (let w of work.data) {
        if (w.id == this.id) {
          this.work = w;
          this.checkoutForm = this.formBuilder.group({
            name: [this.work?.name, Validators.required],
            date: this.work?.date,
            id: this.id
          });
        }
      }
    }
  }

  getWorks() {
    this.worksService.getWorks().subscribe(
      data => { this.works = data },
      err => console.error(err),
      () => this.getWork()
    );
  }

  get editWork(): any {
    return this.worksService.editWork;
  }

  onSubmit(customerData) {
    this.worksService.sendEditWork(this.checkoutForm);
    this.checkoutForm.reset();
    this.closeForm();
  }

  closeForm() {
    this.router.navigate(['/dashboard']);
  }

}
