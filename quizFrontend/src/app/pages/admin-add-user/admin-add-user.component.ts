import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user/users.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.scss']
})
export class AdminAddUserComponent {
  addUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService // Import your user service here
  ) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
      profilePic: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const formData = new FormData();
      formData.append('name', this.addUserForm.get('name')?.value);
      formData.append('email', this.addUserForm.get('email')?.value);
      formData.append('password', this.addUserForm.get('password')?.value);
      formData.append('role', this.addUserForm.get('role')?.value);
      const profilePicFile = this.addUserForm.get('profilePic')?.value;
      if (profilePicFile) {
        formData.append('profilePic', profilePicFile);
      }

      this.userService.createUser(formData).subscribe(
        (response) => {
          Swal.fire('Success', 'User created successfully', 'success');
          this.router.navigate(['/admin']); // Navigate to the admin user list or any other appropriate route
        },
        (error) => {
          if (error.status === 409) {
            Swal.fire('Error', 'Username or email already exists. Please choose another one.', 'error');
          } else {
            Swal.fire('Error', 'Failed to create user. Please try again.', 'error');
          }
        }
      );
    } else {
      Swal.fire('Error', 'Invalid form data', 'error');
    }
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.addUserForm.patchValue({
      profilePic: file
    });
  }

}
