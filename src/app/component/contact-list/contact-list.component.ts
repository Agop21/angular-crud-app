import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { employeeModel } from '../employeemodel';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  data: any | employeeModel[];
  selectedItemId: number | null = null;
  public errorMessage: string | null = null; // Variable to hold error message
  constructor(
    private api: ApiService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.getcontact();
  }

  onClose() {
    this.errorMessage = null; // Clear the error message
  }

  getcontact() {
    this.api.getcontact().subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (error) => {
        this.errorMessage =
          'An error occurred while retrieving the employee list! Please, try again.';
        console.log('Error message:', this.errorMessage);
      },
    });
  }

  setSelectedItemId(id: number) {
    this.selectedItemId = id;
  }

  confirmDelete() {
    if (this.selectedItemId) {
      this.api.deletecontact(this.selectedItemId).subscribe({
        next: (res) => {
          this.getcontact();
          this.selectedItemId = null; // Reset selected item after deletion
        },
        error: (error) => {
          this.errorMessage =
            'An error occurred while trying to delete employee! Please, try again.';
          console.log('Error message:', this.errorMessage);
        },
      });
    }
  }

  //begin
  calculateAge(birthDate: string): number | null {
    if (birthDate) {
      const dob = new Date(birthDate);
      const today = new Date();
      const ageDiff = today.getFullYear() - dob.getFullYear();

      // Check if birthday has occurred this year
      if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        return ageDiff - 1;
      } else {
        return ageDiff;
      }
    } else {
      return null;
    }
  }
}
