import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { UpdateEmployeeComponent } from './component/update-employee/update-employee.component';
import { authGuard } from './guards/auth-guard.guard';
import { CanActivateEditGuard } from './guards/can-activate-edit.guard';
import { canActivateAddGuard } from './guards/can-activate-add.guard';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'contactlist',
    component: ContactListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'addEmployee',
    component: AddEmployeeComponent,
    canActivate: [canActivateAddGuard],
  },
  {
    path: 'updateEmployee/:id',
    component: UpdateEmployeeComponent,
    canActivate: [CanActivateEditGuard],
  },
  { path: '', redirectTo: '/contactlist', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
