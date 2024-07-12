import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-history',
  templateUrl: './exam-history.component.html',
  styleUrls: ['./exam-history.component.scss']
})
export class ExamHistoryComponent implements OnInit{

  examHistory: any[] = [];

  
  constructor(private examsService: ExamService) { }
  
  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); 
    if(userId){
      this.fetchExamHistory(userId);
    }
  }

  fetchExamHistory(userId: string): void {
      this.examsService.getExamHistory(userId).subscribe(
        data => {          
          this.examHistory = data;          
        },
        error => {
          console.error('Error fetching exam history:', error);
        }
      );
  }

  showAnswers(result: any): void {
    // Prepare the questions and answers for display
    console.log(result);
    
    const questionsAndAnswers = result.answers.map((answer: any) => {
      return `
        <div>
          <strong>Question:</strong> ${answer.question}<br>
          <strong>Your Answer:</strong> ${answer.userAnswer}<br>
        </div>
      `;
    }).join('');
  
    // Show SweetAlert with questions and answers
    Swal.fire({
      title: 'Your Answers',
      html: questionsAndAnswers,
      icon: 'info',
      confirmButtonText: 'Close'
    });
  }
  


}
