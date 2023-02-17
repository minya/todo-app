import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/models/tasks';
import { TodoMainState } from 'src/models/todo-main-state';

@Component({
  selector: 'todo-main-pure',
  templateUrl: './todo-main-pure.component.html',
  styleUrls: ['./todo-main-pure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoMainPureComponent {
  @Input() state: TodoMainState;
  newTaskCaption: string = '';

  @Output()
  onAddTask = new EventEmitter<string>;

  @Output()
  onRemoveTask = new EventEmitter<Task>;
}
