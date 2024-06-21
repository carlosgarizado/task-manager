import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { columns} from 'src/app/const/columns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
columns = columns;

data : ITask[] = []

  constructor(private _taskService : TaskService) { }

  ngOnInit(): void {
    this.getTasks();
    this._taskService.taskAdded$.subscribe(newTask => {
      this.data.push(newTask);
      this.data = this.data.filter((task, index, self) =>
        index === self.findIndex((t) => (
          t.id === task.id
        ))
      );
      
      this.data = this.sortTask(this.data);
    });
  }

  getTasks(): void {
    this._taskService.getData().subscribe({
      next: (tasks: ITask[]) => {
        this.data = tasks.map(task => ({
          ...task,
          state: typeof task.state === 'string' ? task.state === 'true' : !!task.state,
          completed: task.completed || false 
        }));
  
        this.data = this.sortTask(this.data);
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }
  
  sortTask(data: ITask[]): ITask[] {
    return [...new Map(data.map(task => [task.id, task])).values()]
      .sort((a, b) => Number(b.id) - Number(a.id));
  }
  
  

  deleteTask(id: string): void {
    this._taskService.deleteTask(id).subscribe(() => {
      this.data = this.data.filter(task => task.id !== id);
    });
  }

  updateTask(event: { id: string, completed: boolean }) {
    this._taskService.updateTask(event.id, event.completed).subscribe(
      updatedTask => {
        const taskIndex = this.data.findIndex(task => task.id === updatedTask.id);
        if (taskIndex !== -1) {
          this.data[taskIndex] = updatedTask;
          this.data = this.sortTask(this.data);
        }
      },
      error => {
        console.error('Error al actualizar la tarea:', error);
      }
    );
  }
}
