import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Task } from 'src/models/tasks';
import { TodoMainStateStoreService } from '../todo-main-state-store.service';

@Component({
  selector: 'todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoMainComponent implements OnInit {

  state$ = this._store.state$;

  constructor (private _store: TodoMainStateStoreService) { }

  onRemoveTask(task: Task) {
    this._store.removeTask(task);
  }

  onAddTask($event: string) {
    this._store.addTask($event);
  }

  ngOnInit(): void {
    this._store.fetchTasks();
  }
}

