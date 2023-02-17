import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TasksServiceService } from 'src/api/tasks-service.service';
import { Task } from 'src/models/tasks';
import { TodoMainState } from 'src/models/todo-main-state';

function initialState(): TodoMainState {
  return {
    tasksLeft: 0,
    tasks: [],
  };
}

type reducer = (state: TodoMainState, action: { type: string, payload?: any }) => Observable<TodoMainState>;

@Injectable({
  providedIn: 'root'
})
export class TodoMainStateStoreService {

  reducers = new Map<string, reducer>(
    [
        ["ADD_TASK", this.addTaskReducer.bind(this)],
        ["REMOVE_TASK", this.removeTaskReducer.bind(this)],
        ["FETCH_TASKS", this.fetchTasksReducer.bind(this)],
    ]
  );

  state: TodoMainState = initialState();

  private stateSubject = new BehaviorSubject<TodoMainState>(this.state);
  state$: Observable<TodoMainState> = this.stateSubject.asObservable();

  constructor (private _tasksService: TasksServiceService) {}

  dispatch(action: { type: string, payload?: any }) {
    const reducer = this.reducers.get(action.type);
    if (reducer) {
      reducer(this.state, action).subscribe((state) => this.nextState(state));
    }
  }

  fetchTasksReducer(state: TodoMainState, action: { type: string, payload?: any }): Observable<TodoMainState> {
    return this._tasksService.getTasks().pipe(
      map((tasks) => {
        return {  ...this.state, tasksLeft: tasks.filter(t => !t.completed).length, tasks };
      }
    ));
  }

  addTaskReducer(state: TodoMainState, action: { type: string, payload?: any }): Observable<TodoMainState> {
    const taskName: string = action.payload;
    return this._tasksService.addTask(taskName)
      .pipe(
        map((task) => {
          const tasks =  [...this.state.tasks, task];
          return { ...this.state, tasksLeft: tasks.filter(t => !t.completed).length, tasks };
        })
      );
  }

  removeTaskReducer(state: TodoMainState, action: { type: string, payload?: any }): Observable<TodoMainState> {
    const task: Task = action.payload;
    return this._tasksService.deleteTask(task.id)
    .pipe(map((task) => {
      const tasks = this.state.tasks.filter(t => t.id !== task.id);
      return { ...this.state, tasksLeft: tasks.filter(t => !t.completed).length, tasks };
    }));
  }

  nextState(state: TodoMainState) {
    this.state = state;
    this.stateSubject.next(this.state);
  }

}
