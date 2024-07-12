import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `http://localhost:3000/api/user`;

  constructor(private http: HttpClient) {}

  createUser(formData: any): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}`, formData);
  }

  getUserById(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${userId}`);
  }

  getAllUsers(): Observable<{ users: IUser[], totalUser: number }> {
    return this.http.get<{ users: IUser[], totalUser: number }>(this.apiUrl);
  }

  updateUser(userId: string, updates: any): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${userId}`, updates);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

}

