import { Component } from '@angular/core';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.scss']
})
export class ActionCellRendererComponent {
  params: any; 

  agInit(params: any): void {
    this.params = params;
  }

  onEditClick(): void {
    if (this.params.onEdit) {
      this.params.onEdit(this.params.data._id); 
    }
  }

  onDeleteClick(): void {
    if (this.params.onDelete) {
      this.params.onDelete(this.params.data._id); 
    }
  }
}
