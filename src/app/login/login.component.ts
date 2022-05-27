import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username : '',
    password : '',
  }

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit(): void {
  }

  userLogin(form: NgForm) {
    // console.log(form.value);
    this.appService.authenicateLogin(form.value).subscribe(
      res => {
      console.log(res);
      localStorage.setItem('accessToken',res.token);
      this.router.navigate(['/members'])
    })
  }

}
