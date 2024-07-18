import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { QuestionService } from 'src/app/core/services/questions/questions.service';
import { ActionCellRendererComponent } from 'src/app/shared/action-cell-renderer/action-cell-renderer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {


  rowData: any[] = [];
  frameworkComponents: any;

  constructor(private questionService: QuestionService, 
    private router: Router,
  ){
    this.frameworkComponents = {CellRenderer: ActionCellRendererComponent} 
  }

  columnDefs = [
    { headerName: 'Sr no', valueGetter: 'node.rowIndex + 1', sortable: true, filter: true,  },
    { field: 'text', headerName: 'Question Text', sortable: true, filter: true, floatingFilter:true },
    { field: 'difficulty', headerName: 'Difficulty', sortable: true, filter: true , floatingFilter:true},
    {
      field: 'options',
      headerName: 'Options',
      cellRenderer: (params: any) => params.value.join(', '),
      valueFormatter: (params: any) => params.value.join(', '),
      sortable: false,
      filter: true,
      floatingFilter:true
    },
    { field: 'correctAnswer', headerName: 'Correct Answer', sortable: true, filter: true , floatingFilter:true},
    {
      headerName: 'Actions',
      cellRenderer: 'CellRenderer',
      sortable: false,
      filter: false,
      cellRendererParams: {
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this)
      }
    }
  ];


  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,  //remove if setting width 
    minWidth: 100,
    // valueFormatter: (params: any) => (typeof params.value === 'object' ? JSON.stringify(params.value) : params.value)
  };

  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20, 30, 50, 100];

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      data => {
        this.rowData = data.questions;
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  onEdit(questionId: string): void {
    console.log('Edit question with ID:', questionId);
    this.router.navigate(['admin/edit-question/', questionId]);
  }

  onDelete(questionId: string): void {
    console.log('Delete question with ID:', questionId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this question!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete API or service method here
        this.questionService.deleteQuestion(questionId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your question has been deleted.', 'success');
            // Reload questions after deletion
            this.loadQuestions();
          },
          error => {
            console.error('Error deleting question:', error);
            Swal.fire('Error', 'Failed to delete the question.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your question is safe :)', 'info');
      }
    });
  }

  navigateToAddQuestion():void {
    this.router.navigate(['admin/addQuestion']);
  }
}
