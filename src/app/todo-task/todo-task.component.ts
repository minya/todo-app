import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from 'src/models/tasks';

@Component({
  selector: 'todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoTaskComponent {

  remove(task: Task) {
    throw new Error('Not implemented');
  }

  @Input()
  task!: Task;

  toggle(task: Task) {
    task.completed = !task.completed;
  }

}
