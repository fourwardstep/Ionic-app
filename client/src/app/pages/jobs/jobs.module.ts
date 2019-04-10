import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JobsPage } from './jobs.page';

const routes: Routes = [
  {
    path: '', component: JobsPage,
    children: [

      { path: 'feeds', loadChildren: '../feeds/feeds.module#FeedsPageModule' },
      { path: 'matches', loadChildren: '../matches/matches.module#MatchesPageModule' },
      { path: 'conversation', loadChildren: '../conversation/conversation.module#ConversationPageModule' },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
      { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule' },
      {
        path: '',
        redirectTo: 'feeds',
        pathMatch: 'full'
      }
    ]
  }
]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)

  ],
  declarations: [JobsPage]
})
export class JobsPageModule { }
