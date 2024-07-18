import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  // private readonly apiUrl = 'http://localhost:3000/api/exam'; 
  private readonly apiUrl = '/exam'; 
  

  constructor(private http: HttpClient) {}

  generateFirstTimeExam(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, {});
  }

  submitAnswers(userId: string, examId: string, answers: { questionId: string; answer: string }[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit-answers`, { userId, examId, answers });
  }

  generateNextExam(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/nextExam`, {userId} );
  }

  getExamHistory(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exam-history/${userId}`);
  }

}
