import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task } from 'src/models/tasks';

@Component({
  selector: 'todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoMainComponent {
  tasks: Task[] = [];

  ntasks() {
    return this.tasks.length;
  }
}
