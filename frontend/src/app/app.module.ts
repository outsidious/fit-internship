import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './pages/auth/auth-page.component';
import { MyPageComponent } from './pages/my/my-page.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent, AuthPageComponent, MyPageComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthService, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
