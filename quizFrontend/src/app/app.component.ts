import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './core/services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quizFrontend';
  constructor(private permissionsService: NgxPermissionsService, private http: HttpClient, private loginService:LoginService) {}

  ngOnInit(): void {
  //  const role = localStorage.getItem('role');
  //   console.log(role, "Role");
   
  //   if (Array.isArray(role)) {
  //     this.permissionsService.loadPermissions(role);
  //   } else if (role) {
  //     this.permissionsService.loadPermissions([role]);
  //   } else {
  //     console.error('Role not found or invalid:', role);
  //   }
  }
}
