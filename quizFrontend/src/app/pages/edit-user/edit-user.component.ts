import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm!: FormGroup;
  userId: string | null = null;
  existingProfilePic: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id'); // Get user ID from URL
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
      profilePic: [''] // No validation required here
    });

    if (this.userId) {
      this.loadUserData(this.userId);
    }
  }

  loadUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe(user => {
      this.editForm.patchValue({
        name: user.name,
        email: user.email,
        role: user.role,
      });
      this.existingProfilePic = user.profilePic ? `http://localhost:3000/uploads/${user.profilePic.split('\\').pop()}` : null;
    }, error => {
      Swal.fire('Error', 'User not found', 'error');
      this.router.navigate(['/users']); // Redirect if user not found
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('name', this.editForm.get('name')?.value);
      formData.append('email', this.editForm.get('email')?.value);
      formData.append('password', this.editForm.get('password')?.value);
      formData.append('role', this.editForm.get('role')?.value);

      const profilePicFile = this.editForm.get('profilePic')?.value;
      if (profilePicFile) {
        formData.append('profilePic', profilePicFile);
      }

      this.userService.updateUser(this.userId!, formData).subscribe(
        (response) => {
          console.log(response);
          
          Swal.fire('Success', 'User updated successfully', 'success');
          this.router.navigate(['/users']);
        },
        (error) => {
          Swal.fire('Error', 'Update failed', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Invalid form data', 'error');
    }
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.editForm.patchValue({
      profilePic: file
    });
  }
}
