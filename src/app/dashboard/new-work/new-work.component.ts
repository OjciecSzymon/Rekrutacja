import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorksService } from './../../config/works.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-work',
  templateUrl: './new-work.component.html',
  styleUrls: ['./new-work.component.scss']
})
export class NewWorkComponent implements OnInit {
  checkoutForm: FormGroup;
  works: any;
  
  constructor(private formBuilder: FormBuilder, private worksService: WorksService, private router: Router, private route: ActivatedRoute) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: '',
      id: 0
    });
   }

  ngOnInit(): void {
    this.getWorks();
  }

  getWork() {
    
  }

  getWorks() {
    this.worksService.getWorks().subscribe(
      data => { this.works = data },
      err => console.error(err),
      () => this.getWork()
    );
  }

  get newWork(): any {
    return this.worksService.newWork;
  }

  onSubmit(customerData) {
    this.worksService.sendNewWork(this.checkoutForm);
    this.checkoutForm.reset();
    this.closeForm();
  }

  closeForm() {
    this.router.navigate(['/dashboard']);
  }

}
