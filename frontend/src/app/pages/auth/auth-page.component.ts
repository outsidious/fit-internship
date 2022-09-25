import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    /*this.authService.getTest().subscribe((data: Object) => {
      console.log(data);
    });*/
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['my']);
    });
  }
}
