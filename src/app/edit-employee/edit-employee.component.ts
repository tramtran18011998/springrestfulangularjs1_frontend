import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeSService } from '../employee-s.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ListEmployeeComponent } from '../list-employee/list-employee.component';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  id: number;
  employee: Employee = new Employee();
  submitted = false;

  constructor(private employeeService: EmployeeSService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
   
      this.employee=new Employee();

      this.id= this.route.snapshot.params['id'];

      this.employeeService.getEmployeeById(this.id)
      .subscribe(data=>{
        console.log(data)
        this.employee=data;
      },error=>console.log(error));

      
  }

  

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe(data => {console.log(data);}, error => console.log(error));
    this.employee = new Employee();
    this.gotoList();
  }

  onSubmit() {
    this.updateEmployee();    
  }

  gotoList() {
    this.router.navigate(['/employees']);
    
  }

}
