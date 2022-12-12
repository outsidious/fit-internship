import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthPageComponent } from './pages/auth/auth-page.component';
import { MyPageComponent } from './pages/my/my-page.component';

const routes: Routes = [
  { path: 'auth', component: AuthPageComponent },
  { path: 'my', component: MyPageComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'my' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
