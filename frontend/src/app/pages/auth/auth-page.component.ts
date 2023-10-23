import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  login() {
    console.log(this.email, this.password);
    this.authService.login(this.email, this.password).subscribe(console.log);
  }
}
