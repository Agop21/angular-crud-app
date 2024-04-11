import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../api.service';
import { employeeModel } from '../employeemodel';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent implements OnInit {
  public employeeId!: number;
  public contactData: employeeModel = {} as employeeModel;
  public errorMessage: string | null = null; // Variable to hold error message
  public contactform: FormGroup | any;

  constructor(
    private api: ApiService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactform = this.formbuilder.group({
      firstName: ['', [Validators.minLength(4)]],
      lastName: ['', [Validators.minLength(4)]],
      job: ['', [Validators.minLength(4)]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required, this.futureDateValidator()]],
    });

    this.activatedroute.params.subscribe((params: Params) => {
      this.employeeId = params['id'];
    });

    this.api.fetchdata(this.employeeId).subscribe({
      next: (data: employeeModel) => {
        this.contactData = data;

        console.log(data);
      },
      error: (error) => {
        console.error('Error:', error); // Log the error object
      },
    });
  }

  onClose() {
    this.errorMessage = null; // Clear the error message
  }

  update() {
    this.api.updatecontact(this.employeeId, this.contactData).subscribe({
      next: (res: employeeModel) => {
        this.router.navigate(['/contactlist']);
      },
      error: (error) => {
        console.error('Error:', error); // Log the error object
        this.errorMessage =
          'An error occurred while updating employee data! Please, try again.';
        console.log('Error message:', this.errorMessage);
      },
    });
  }

  //validations

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
