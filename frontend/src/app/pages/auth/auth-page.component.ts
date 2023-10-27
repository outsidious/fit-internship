import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {

  authForm!: FormGroup<{ email: FormControl<string | null>, password: FormControl<string | null> }>

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();

    this.authForm.valueChanges.subscribe((value) => {
      //console.log(value.email, value.password);
    })

    this.changeValidators();
  }


  initForm() {
    this.authForm = this.fb.group({ email: ['', [Validators.required, Validators.pattern(/[A-z]/)]], password: ['', [Validators.required, this.passwordValidator]] });
  }

  changeValidators() {
    const emailControl = this.authForm.controls.email;
    const validators: ValidatorFn[] = [Validators.required, Validators.min(3)];

    emailControl?.setValidators(validators);
    //emailControl.clearValidators();
    emailControl.updateValueAndValidity();
  }

  passwordValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const isLengthValid = value ? value.length < 5 : false;
    if (!isLengthValid) {
      return { invalidPassword: 'wrong password format' };
    }
    return null;
  }

  login() {
    //console.log(this.authForm.value.email);
    const emailControl = this.authForm.controls.email;
    const correctEmail: boolean = emailControl.valid;
    console.log(correctEmail);
    //this.authService.login(this.authForm.value.email, this.authForm.value.password).subscribe(console.log);
  }
}
