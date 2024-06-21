import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { ITask } from '../models/task.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl= environment.API;
  private taskAddedSource = new Subject<any>();
  taskAdded$ = this.taskAddedSource.asObservable();
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos`);
  }
  addTask(task: ITask): Observable<ITask> { 
    return this.http.post<ITask>(`${this.apiUrl}/todos`, task).pipe( 
      map((newTask: ITask) => { 
        this.taskAddedSource.next(newTask);
        return newTask;
      })
    );
  }

  deleteTask(id: string): Observable<any> {
    const url = `${this.apiUrl}/todos/${id}`;
    return this.http.delete<any>(url);
  }

  updateTask(id: string, state: boolean): Observable<ITask> {
    const url = `${this.apiUrl}/todos/${id}`;
    return this.http.put<ITask>(url, { completed: state })
  }
}

