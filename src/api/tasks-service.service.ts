import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  tasks: Task[] = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: false },
      { id: 4, title: 'Task 4', completed: false },
  ];

  constructor() { }

  deleteTask(id: number): Observable<Task> {
    const task = this.tasks.find(t => t.id === id);
    if (task == undefined)  {
      throw new Error('Task not found');
    }
    this.tasks = this.tasks.filter(t => t.id !== id);
    return this.pretendToBeHttp(task);
  }

  getTasks() : Observable<Task[]> {
    return this.pretendToBeHttp(this.tasks);
  }

  addTask(title: string) : Observable<Task> {
    const task = {
      id: 1 + Math.max(...this.tasks.map(t => t.id)),
      title,
      completed: false
    };
    this.tasks.push(task);
    return this.pretendToBeHttp(task);
  }

  pretendToBeHttp<T>(result: T): Observable<T> {
    return new Observable<T>(observer => {
      setTimeout(() => {
        observer.next(result);
      }, 1000);
    });
  }

}
