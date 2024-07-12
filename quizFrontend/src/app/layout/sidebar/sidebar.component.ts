import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/users.service'; // Adjust path as per your project structure
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  userId: string | null = null;
  userName: string | null = null;
  profilePicUrl: SafeResourceUrl | null = null;
  userRole: string | null = '';

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.fetchUserData();
    }
    
    this.userRole = localStorage.getItem('role');
  }

  fetchUserData(): void {
    if (this.userId) {
    this.userService.getUserById(this.userId!).subscribe(
      user => {
        this.userName = user.name;        
        if (user.profilePic) {          
          const filename = user.profilePic.split('\\').pop();
          const fullUrl = `http://localhost:3000/uploads/${filename}`;
          this.profilePicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
        }        
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  } else {
    console.error('User ID is undefined or null');
  }
}

logout(): void {
  this.loginService.logout().subscribe(
    response => {
      Swal.fire("Success", "Logout Successfully", "success").then(() => {
        this.router.navigate(['/login']);
      });
    },
    error => {
      console.error(error);
      Swal.fire("Error", "Logout Failed", "error"); 
    }
  );
}


}
