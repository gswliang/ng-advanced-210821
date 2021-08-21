import { ColorComponent } from './utilities/color/color.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Page1Component } from './page1/page1.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page2Component } from './page2/page2.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  // { path: 'utilities/color', component: ColorComponent },
  {
    path: 'utilities',
    children: [
      { path: 'color', component: ColorComponent }
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
