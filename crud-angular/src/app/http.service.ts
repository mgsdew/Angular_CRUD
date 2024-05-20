import { Injectable, inject } from '@angular/core';
import { IEmployee } from './interfaces/employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http = inject(HttpClient);
  apiUrl = "https://localhost:44365/";

  constructor() { }

  getAllEmployee() {
    return this.http.get<IEmployee[]>(this.apiUrl + "api/Employee")
  }

  createEmployee(employee: IEmployee) {
    return this.http.post(this.apiUrl + 'api/Employee', employee);
  }
  getEmployee(employeeId: number) {
    return this.http.get<IEmployee>(
      this.apiUrl + 'api/Employee/' + employeeId
    );
  }
  updateEmployee(employeeId: number, employee: IEmployee) {
    console.log(employee)
    return this.http.put<IEmployee>(this.apiUrl + 'api/Employee/' + employeeId, employee);
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(this.apiUrl + 'api/Employee/' + employeeId);
  }
}
