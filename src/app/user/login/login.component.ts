import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm : FormGroup;

  constructor(public appService: AppService,
              public router: Router) { }

  ngOnInit() {

    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

  }

  signOn = () => {
    console.log(this.signinForm);
    let data = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    }
    this.router.navigate(['/admin-login']);
    // this.appService.login(data)
    //   .subscribe((apiResponse) => {
    //     console.log(apiResponse);
    //     if(apiResponse.status === 200){
    //       console.log('successful');
    //       this.router.navigate(['/admin-login']);
    //     }
    //   })

  }

}
