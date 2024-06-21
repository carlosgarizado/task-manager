import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskTitle: string = '';
  completed: boolean = false;
  constructor(private _taskService : TaskService, private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

   addTask(): void {
    if (!this.taskTitle.trim()) {
      return;
    }
    const newTask: ITask = {
      id: new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
      state: this.completed,
      title: this.taskTitle,
      completed : this.completed
    };
  
    this._taskService.addTask(newTask).subscribe(response => {
      this.taskTitle = ''; 
      this.completed = false; 
    }, error => {
      console.error('Error adding task:', error);
    });
  }
}