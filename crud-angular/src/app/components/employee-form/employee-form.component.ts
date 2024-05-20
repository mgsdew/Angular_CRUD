import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { HttpService } from '../../http.service';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router)
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService)

  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: [0, [Validators.required]],
    phone: ['', []],
    salary: [0, [Validators.required]],
    //  password: ['', [Validators.required, Validators.pattern]]
  });

  employeeId!: number;
  isEdit = false;
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.httpService.getEmployee(this.employeeId).subscribe((result) => {
        console.log(result);
        this.employeeForm.patchValue(result);
        //  this.employeeForm.controls.email.disable();
      });
    }
  }

  save() {
    //console.log(this.employeeForm.value);

    const employee: IEmployee = {
      name: this.employeeForm.value.name!,
      email: this.employeeForm.value.email!,
      age: this.employeeForm.value.age!,
      phone: this.employeeForm.value.phone!,
      salary: this.employeeForm.value.salary!,
      //  password: this.employeeForm.value.password!
    };
    if (this.isEdit) {

      console.log(this.employeeId)
      employee.email = this.employeeForm.value.email!

      this.httpService
        .updateEmployee(this.employeeId, employee)
        .subscribe(() => {
          console.log('success');
          this.toastr.success("Record updated sucessfully.");
          this.router.navigateByUrl('/employee-list');
        });

      // console.log(employee)

      // this.httpService.createEmployee(employee).subscribe(() => {
      //   console.log('success');
      //   this.toastr.success("Record updated sucessfully.");
      //   this.router.navigateByUrl('/employee-list');
      // });
    } else {
      this.httpService.createEmployee(employee).subscribe(() => {
        console.log('success');
        this.toastr.success("Record added sucessfully.");
        this.router.navigateByUrl('/employee-list');
      });
    }
  }
}

