import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamHistoryComponent } from './pages/exam-history/exam-history.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AdminAddUserComponent } from './pages/admin-add-user/admin-add-user.component';

const routes: Routes = [
  {path:'', redirectTo:"login", pathMatch:'full'},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"edit-user/:id", component: EditUserComponent},
  {path:"home", component: HomeComponent},
  {path:"admin", component: DashboardComponent},
  {path:"admin/addUser", component: AdminAddUserComponent},
  {path:"examHistory", component: ExamHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
