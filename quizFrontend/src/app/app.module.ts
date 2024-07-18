import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ExamHistoryComponent } from './pages/exam-history/exam-history.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AdminAddUserComponent } from './pages/admin-add-user/admin-add-user.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './layout/footer/footer.component';
import { ErrorHandlerInterceptor } from './core/interceptor/error-handler.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { EditQuestionComponent } from './pages/edit-question/edit-question.component';
import { ActionCellRendererComponent } from './shared/action-cell-renderer/action-cell-renderer.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    ExamHistoryComponent,
    UserDetailComponent,
    EditUserComponent,
    AdminAddUserComponent,
    FooterComponent,
    NotFoundComponent,
    QuestionListComponent,
    EditQuestionComponent,
    ActionCellRendererComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModalModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    AgGridModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
