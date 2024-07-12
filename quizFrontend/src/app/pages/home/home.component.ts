import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/core/services/exam/exam.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  examPaper: any = [];
  userAnswers: { [questionId: string]: string } = {};
  userId: string | null = '';
  examId: string = '';
  loading: boolean = true;

  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){ }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId'); 
  }

  viewResults() {
    console.log('Viewing results...');
  }

  viewHistory() {
    console.log('Viewing quiz history...');
    this.router.navigate(['/examHistory'])
  }



  loadFirstExamPaper() {
    this.examService.generateFirstTimeExam().subscribe(
      response => {
        this.examPaper = response[0];
        this.examId = response[0]._id;
        localStorage.setItem('examId', this.examId);
        this.userId = localStorage.getItem('userId');
      },
      error => {
        console.error('Error generating first exam:', error);
      }
    );
  }


  submitExam(): void {    
    event?.preventDefault();
    const answers = Object.keys(this.userAnswers).map(questionId => ({
      questionId,
      answer: this.userAnswers[questionId]
    }));
    this.userId = localStorage.getItem('userId');
    if (!this.userId || !this.examId) {
      console.error("User ID or Exam ID is missing");
      return;
    }
  
    this.examService.submitAnswers(this.userId , this.examId, answers).subscribe(
      (response) => {
        this.userId = localStorage.getItem('userId')
        console.log(response, "responseeee");
        Swal.fire({
          title: "Exam submitted Successfully, Do You Want to give next Exam?",
          text: `Next Exam Will Be a little Difficult!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, give next exam!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.generateNextExam();
            Swal.fire({
              title: "Good Luck!",
              text: "Your next exam is ready.",
              icon: "success"
            });
          }
          else {
            Swal.fire('Error', 'Failed to generate next error.', 'error');
            this.router.navigate(['/home']);
          }
        });
      },
      (error) => {
        console.error('Error submitting exam:', error);
        Swal.fire('Error', error.message || 'Failed to submit answers.', 'error');
      }
    );
  }

  generateNextExam(): void {
    this.userId = localStorage.getItem("userId");
    if (!this.userId) {
      console.error("User ID or Exam ID is missing");
      return;
    }
    console.log(this.userId, );
    
    this.examService.generateNextExam(this.userId).subscribe(
      (response) => {
        console.log(response);
        
        this.examPaper = response.nextExamQuestions;
        this.examId = response.examId;
        this.userId = response.userId;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading next exam paper:', error);
        this.loading = false;
      }
    );
  }

}


