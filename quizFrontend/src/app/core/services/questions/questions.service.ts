import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000/api/question'; 

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  createQuestion(questionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, questionData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllQuestions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getQuestionById(questionId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${questionId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateQuestion(questionId: string, updatedQuestion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${questionId}`, updatedQuestion)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteQuestion(questionId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${questionId}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}

