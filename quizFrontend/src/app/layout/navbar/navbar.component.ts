import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/users.service'; // Adjust path as per your project structure
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  userId: string | null = null;
  userName: string | null = null;
  profilePicUrl: SafeResourceUrl | null = null;
  userRole: string | null = '';

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.fetchUserData();
    }
    
    this.userRole = localStorage.getItem('role');
    console.log(this.userId, this.userRole);
  }


  fetchUserData(): void {
    if (this.userId) {
    this.userService.getUserById(this.userId!).subscribe(
      user => {
        this.userName = user.name;
        console.log(this.userName);
        
        if (user.profilePic) {
          console.log(user.profilePic);
          
          const filename = user.profilePic.split('\\').pop();
          console.log(filename);
          
          const fullUrl = `http://localhost:3000/uploads/${filename}`;
          console.log(fullUrl);
          
          this.profilePicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
        }
        console.log(this.profilePicUrl);
        
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
    // localStorage.removeItem('userId');
    // this.router.navigate(['/login']); // Navigate to login page after logout
  }
}
