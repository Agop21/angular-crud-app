import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateEmployeeComponent } from './component/update-employee/update-employee.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { authGuard } from './guards/auth-guard.guard';
import { CanActivateEditGuard } from './guards/can-activate-edit.guard';
import { canActivateAddGuard } from './guards/can-activate-add.guard';
import { NotificationComponent } from './component/notification/notification.component';
import { NotificationService } from './notification.service';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    NotificationComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    [authGuard],
    CanActivateEditGuard,
    canActivateAddGuard,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
