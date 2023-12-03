import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatchmakingWizardComponent } from './matchmaking-wizard/matchmaking-wizard.component';
import { AuthGuard } from './authentication.guard';
import { HomeComponent } from './home/home.component';
import { AccountWizardComponent } from './account-wizard/account-wizard.component';
import { AdminGuard } from './admin.guard';
import { UsersBrowserComponent } from './admin/users-browser/users-browser.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user/:id/:mode', component: AccountWizardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'matrimony',
    canActivate: [AuthGuard],
    component: MatchmakingWizardComponent,
  },
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersBrowserComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
