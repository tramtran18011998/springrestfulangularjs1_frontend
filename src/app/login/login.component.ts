import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { EmployeeSService } from '../employee-s.service';
import { Employee } from '../employee';
import {HttpParams} from  "@angular/common/http";
import{LoginInfo} from '../login-info';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // username: string;
  // password: string;

  // loginForm: FormGroup;
  // invalidLogin: boolean = false;

  // submitted = false;
  // employee: Employee = new Employee();
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: LoginInfo;

  
  constructor(private tokenStorage: TokenStorageService, private employeeService: EmployeeSService, private router: Router) { }

  // checkLogin() {
    
  //   //this.submitted=true;
  //   this.login();
  // }

  // login(){
  //   // this.employeeService.login(this.username,this.password).subscribe(data => {console.log(data);}, error => console.log(error));
  //   // console.log(this.username);
  //   // console.log(this.password);
    
  //   // this.employee = new Employee();
  //   // this.gotoList();
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   const body = new HttpParams()
  //     .set('username', this.loginForm.controls.username.value)
  //     .set('password', this.loginForm.controls.password.value)
  //     .set('grant_type', 'password');

  //   //this.employeeService.login(body.toString()).subscribe(data => {console.log(data);}, error => console.log(error));

  //   // this.employeeService.login(body.toString()).subscribe(data => {
  //   //   window.sessionStorage.setItem('token', JSON.stringify(data));
  //   //   console.log(window.sessionStorage.getItem('token'));
      
  //   // }, error => {
  //   //     alert(error.error.error_description)
  //   // });

  //   console.log(this.username);
  //   console.log(this.password);
    
  //   this.employee = new Employee();
  //   this.gotoList();
  // }


  onSubmit() {
    console.log(this.form);

    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password);

    this.employeeService.login(this.loginInfo).subscribe(
      data => {console.log(data);},
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
    console.log(this.form.username);
    console.log(this.form.password);
    console.log("Success");
      
    this.gotoList();
  }
  gotoList() {
    this.router.navigate(['/employees']);
    
  }

  ngOnInit() {
    // window.sessionStorage.removeItem('token');
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.compose([Validators.required])],
    //   password: ['', Validators.required]
    // });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

}
