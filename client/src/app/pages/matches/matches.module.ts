import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MatchesPage } from './matches.page';

const routes: Routes = [
  {
    path: '',
    component: MatchesPage,
    children: [
      { path: 'applied', loadChildren: '../applied/applied.module#AppliedPageModule' },
      { path: 'failed', loadChildren: '../failed/failed.module#FailedPageModule' },
      { path: 'saved', loadChildren: '../saved/saved.module#SavedPageModule' },
      { path: '', redirectTo: 'applied', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MatchesPage]
})
export class MatchesPageModule { }
