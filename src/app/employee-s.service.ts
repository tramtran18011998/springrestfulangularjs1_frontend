import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginInfo} from './login-info';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSService {
  private baseUrl = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) { }

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  // login( username: string,  password: string):Observable<any> {
  //   // const headers = {
  //   //   'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
  //   //   'Content-type': 'application/x-www-form-urlencoded'
  //   // }
  //   //return this.http.post('http://localhost:8080/' + 'employee', loginPayload, {headers});
  //   return this.http.post(`${this.baseUrl}/${username}/${password}`,username);
  // }
  // login( loginForm){
    
  //   return this.http.post(`${this.baseUrl}`+"/login",loginForm);
  // }
  login( credentials: LoginInfo){
    
    return this.http.post(`${this.baseUrl}`+"/login",credentials);
  }
}
