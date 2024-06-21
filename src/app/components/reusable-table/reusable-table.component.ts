import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss']
})
export class ReusableTableComponent implements OnInit {
  @Input() columns?: any[];
  @Input() data?: any[] =[];
  @Output() delete = new EventEmitter<string>();
  @Output() complete = new EventEmitter<{ id: string, completed: boolean }>();
  currentPage = 1;
  itemsPerPage = 10;
public page = 1;
  constructor() { }

  ngOnInit(): void {
  }


  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data?.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onComplete(id: string, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      const checked = target.checked;
  
      // Encontrar el índice de la tarea específica por su id
      const taskIndex = this.data?.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
 
  
        // Emitir el evento complete
        this.complete.emit({ id: id, completed: checked });
  
        // Actualizar la tabla eliminando duplicados
        this.data = this.data!.filter((task, index, self) =>
          index === self.findIndex((t) => (
            t.id === task.id
          ))
        );
  
        // Forzar la actualización de la tabla
        this.data = [...this.data];
      }
    }
  }
  
    
  
  

  onDelete(id: string): void {
    this.delete.emit(id);
  }

}
