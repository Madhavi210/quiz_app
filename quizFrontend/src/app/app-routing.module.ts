import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamHistoryComponent } from './pages/exam-history/exam-history.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AdminAddUserComponent } from './pages/admin-add-user/admin-add-user.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { roleGuard } from './core/guards/role.guard';
import { authGuard } from './core/guards/auth.guard';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { EditQuestionComponent } from './pages/edit-question/edit-question.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', 
    component: HomeComponent, 
    canActivate: [authGuard] 
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/addUser',
    component: EditUserComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/edit-user/:id',
    component: EditUserComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/userList',
    component: UserDetailComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/questionList',
    component: QuestionListComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/addQuestion',
    component: EditQuestionComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/edit-question/:id',
    component: EditQuestionComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'examHistory',
    component: ExamHistoryComponent,
    canActivate: [authGuard],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
