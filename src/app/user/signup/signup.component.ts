import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { Subscription } from 'rxjs';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Router } from '@angular/router';

import { ICountry } from '../icountry';
import { UserService } from '../user.service';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;

  selectedCountry: any = 'IN';
  selectedPhoneNumber: any;
  countries: any[];
  register: FormGroup;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public appService: AppService,
    public router: Router
  ) { }

  ngOnInit() {
    
    this.signupForm = new FormGroup({
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        rePassword: new FormControl(null, [Validators.required, this.match('password')]),
        phone: new FormControl(null, [Validators.required, this._validatePhoneNumberInput.bind(this)])
      });

    

    this.fetchCountryList();
    // this.initForm();

  }

  

  match(controlName: string) : ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if(c.value === null || c.value.length === 0){
        return null;
      }
      const controlToCompare = c.root.get(controlName);
      if(controlToCompare){
        const subscription: Subscription = controlToCompare.valueChanges.subscribe(()=>{
          c.updateValueAndValidity();
          subscription.unsubscribe();
        }); 
      }
      return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true} : null;
    };
    
  }

  onSubmit() {
    console.log(this.signupForm.value);
    let data = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      mobile: this.signupForm.value.phone,
      password: this.signupForm.value.password
    }

    this.appService.signUp(data).subscribe((apiResponse) => {
      if(apiResponse.status === 200)
        this.router.navigate(['/login']);
    })
    this.signupForm.reset();
  }

  

  private fetchCountryList(): void{
    this.subscription = this.userService.getCountries().subscribe((res: ICountry[]) => {
      this.countries = res;
    }, error => error)
  }



  _validatePhoneNumberInput(c: FormControl): object {
    let inputValue: string
    let phoneNumber: any
    if(c.value == null){
     return {
       phoneNumber:{
         valid: false
       }
     }
    }else{
      inputValue = c.value.toString();
      phoneNumber = parsePhoneNumberFromString(inputValue, this.selectedCountry);
      if(phoneNumber){
        if(phoneNumber.isValid()){
          return null;
        }else{
          return {
            phoneNumber: {
              valid: false
          }
        }
      }
    }else {
        return {
          phoneNumber: {
            valid: false
        }
      }
    }
  }
}

  resetPhoneNumber(event: any): void {
    this.signupForm.controls['phone'].setValue('');
  }

  formatPhoneNumber(event: any): void{
    let inputValue: any = this.signupForm.controls['phone'].value.toString();
    let phoneNumber: any = parsePhoneNumberFromString(inputValue, this.selectedCountry);

    if(phoneNumber){
      this.selectedPhoneNumber = phoneNumber.number;
      this.signupForm.controls['phone'].setValue(phoneNumber.formatInternational());
    }
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
