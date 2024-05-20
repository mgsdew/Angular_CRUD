import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  router = inject(Router)
  httpService = inject(HttpService)
  toastr = inject(ToastrService)

  employeeList: IEmployee[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'age', 'salary', 'action'];

  ngOnInit() {
    this.getEmployeeList()
  }

  getEmployeeList() {
    this.httpService.getAllEmployee().subscribe((result) => {
      this.employeeList = result;
      console.log(this.employeeList);
    });
  }

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/employee/' + id);
  }

  delete(id: number) {
    this.httpService.deleteEmployee(id).subscribe(() => {
      console.log('deleted');
      // this.employeeList=this.employeeList.filter(x=>x.id!=id);
      this.getEmployeeList();
      this.toastr.warning('Record deleted sucessfully');
    });
  }
}
