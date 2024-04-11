import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { employeeModel } from '../employeemodel';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  isNotAllowed: boolean = false;
  contactform: FormGroup | any;
  public errorMessage: string | null = null; // Variable to hold error message
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.contactform = this.formbuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.firstLetterUppercaseValidator,
          this.noSpecialCharactersValidator,
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.firstLetterUppercaseValidator,
          this.noSpecialCharactersValidator,
        ],
      ],
      job: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.firstLetterUppercaseValidator,
        ],
      ],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required, this.futureDateValidator()]],
    });
  }

  onClose() {
    this.errorMessage = null; // Clear the error message
  }

  submitEmployee(data: employeeModel) {
    if (this.contactform.valid) {
      this.api.addcontact(data).subscribe({
        next: (res) => {
          // Success handling
          this.contactform.reset();
          this.router.navigate(['/contactlist']);
        },
        error: (error) => {
          console.error('Error:', error); // Log the error object
          this.errorMessage =
            'An error occurred while uploading employee data! Please, try again.';
          console.log('Error message:', this.errorMessage);
        },
      });
    } else {
      this.markFormGroupTouched(this.contactform);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Custom validator function
  private firstLetterUppercaseValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;
    if (value && value.length > 0 && value[0] !== value[0].toUpperCase()) {
      return { firstLetterUppercase: true };
    }
    return null;
  }

  // Custom validator function for no special characters
  private noSpecialCharactersValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;
    const pattern = /^[a-zA-Z]*$/; // Allow only Latin alphabets and spaces
    if (value && !pattern.test(value)) {
      return { noSpecialCharacters: true };
    }
    return null;
  }

  private futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      if (selectedDate > today) {
        return { futureDate: true };
      }
      return null;
    };
  }
}
