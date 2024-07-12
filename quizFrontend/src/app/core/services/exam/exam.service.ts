import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private readonly apiUrl = 'http://localhost:3000/api/exam'; 
  

  constructor(private http: HttpClient) {}

  // Generate the first exam for a user
  generateFirstTimeExam(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, {});
  }

  // Submit answers for the exam
  submitAnswers(userId: string, examId: string, answers: { questionId: string; answer: string }[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit-answers`, { userId, examId, answers });
  }

  // Generate the next exam based on previous results
  generateNextExam(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/nextExam`, {userId} );
  }

  // Get exam history for a user
  getExamHistory(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exam-history/${userId}`);
  }

}
