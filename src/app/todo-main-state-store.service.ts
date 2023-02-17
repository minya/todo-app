import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TasksServiceService } from 'src/api/tasks-service.service';
import { Task } from 'src/models/tasks';
import { TodoMainState } from 'src/models/todo-main-state';

function initialState(): TodoMainState {
  return {
    tasksLeft: 0,
    tasks: [],
  };
}

@Injectable({
  providedIn: 'root'
})
export class TodoMainStateStoreService {
  state: TodoMainState = initialState();

  private stateSubject = new BehaviorSubject<TodoMainState>(this.state);
  state$: Observable<TodoMainState> = this.stateSubject.asObservable();

  constructor ( private _tasksService: TasksServiceService)
    {}

  removeTask(task: Task) {
    this._tasksService.deleteTask(task.id).subscribe({
      next: (task) => {
        const tasks = this.state.tasks.filter(t => t.id !== task.id);
        const newState = { ...this.state, tasksLeft: tasks.filter(t => !t.completed).length, tasks };
        this.nextState(newState);
      }
    });
  }

  addTask($event: string) {
    this._tasksService.addTask($event).subscribe({
      next: (task) => {
        const tasks =  [...this.state.tasks, task];
        this.state = { ...this.state, tasksLeft: tasks.filter(t => !t.completed).length, tasks };
      }
    });
  }

  fetchTasks() {
    this._tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.state = {  ...this.state, tasksLeft: tasks.filter(t => !t.completed).length, tasks };
      }
    });
  }

  nextState(state: TodoMainState) {
    this.state = state;
    this.stateSubject.next(this.state);
  }

}
