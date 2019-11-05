import { Component, OnInit } from '@angular/core';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../connect';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor() { }

  public GG_AUTH = GOOGLE_AUTH_URL;
  public FACE_AUTH = FACEBOOK_AUTH_URL;
  ngOnInit() {
  }

}
