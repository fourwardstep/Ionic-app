import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'location', loadChildren: './pages/location/location.module#LocationPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path : 'reset-password/:token', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule'},
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule' },
  { path: 'edit-info', loadChildren: './pages/edit-info/edit-info.module#EditInfoPageModule' },
  { path: 'privacypolicy', loadChildren: './pages/privacypolicy/privacypolicy.module#PrivacypolicyPageModule' },
  { path: 'update', loadChildren: './pages/update/update.module#UpdatePageModule' },
  { path: 'slides', loadChildren: './pages/slides/slides.module#SlidesPageModule' },
  { path: 'termsconditions', loadChildren: './pages/termsconditions/termsconditions.module#TermsconditionsPageModule' },
  { path: 'jobdetail', loadChildren: './pages/jobdetail/jobdetail.module#JobdetailPageModule' },
  { path: 'modal', loadChildren: './pages/modal/modal.module#ModalPageModule' },
  { path: 'jobs', loadChildren: './pages/jobs/jobs.module#JobsPageModule' }, 
  { path: 'chatbox', loadChildren: './pages/chatbox/chatbox.module#ChatboxPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
