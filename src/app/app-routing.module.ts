import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewWorkComponent } from './dashboard/new-work/new-work.component';
import { EditWorkComponent } from './dashboard/edit-work/edit-work.component';


const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    children: [
      {
        path: 'new-work', 
        component: NewWorkComponent,
        data: { title: 'Nowe zadanie' }
      },
      {
        path: 'edit-work/:id', 
        component: EditWorkComponent,
        data: { title: 'Edytuj zadanie' }
      }
    ] 
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
