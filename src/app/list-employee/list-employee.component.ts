import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from "../employee";
import { Observable,of } from "rxjs";
import { EmployeeSService } from '../employee-s.service';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { map,retry,catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employees: Observable<Employee[]>;
  
  //e: Employee[]=[];
  //e: Array<any> =this.employeeService.getEmployeesList();
  //k: Array<Observable<any>> = Array<Observable<Employee[]>>;

  dataSource: EmployeeDataSource;
  displayedColumns: Array<String> =['fullName','emailId'];
  
  //dataSource = new MatTableDataSource(this.e);
  //dataSource:any;
  

  constructor(private employeeService: EmployeeSService, private router: Router) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.reloadData();

    this.dataSource.sort=this.sort;
  }
  applyFilter(filterValue: string) {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
    //this.dataSource.sort=this.sort;
    //.subscribe(em => { this.employees = em})
    this.dataSource=new EmployeeDataSource(this.employeeService);
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));

  }

  employeeDetails(id:number){
    this.router.navigate(['details',id]);
  }

  employeeEdit(id:number){
    this.router.navigate(['edit',id]);
  }

}
export class EmployeeDataSource extends DataSource<any> {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private employeeService: EmployeeSService) {
    super();
  }
  connect(): Observable<Employee[]> {
    return this.employeeService.getEmployeesList();
  }
  disconnect() {}
}
