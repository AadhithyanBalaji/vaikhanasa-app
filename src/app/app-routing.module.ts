import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatchmakingWizardComponent } from './matchmaking-wizard/matchmaking-wizard.component';
import { AuthGuard } from './authentication.guard';
import { HomeComponent } from './home/home.component';
import { AccountWizardComponent } from './account-wizard/account-wizard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'matrimony', component: MatchmakingWizardComponent },
      { path: 'user/:id', component: AccountWizardComponent },
    ],
  },
  // {
  //   path: 'matrimony',
  //   canActivate: [AuthGuard],
  //   component: MatchmakingWizardComponent,
  // },
  // {
  //   path: 'user/:id',
  //   canActivate: [AuthGuard],
  //   component: AccountWizardComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
