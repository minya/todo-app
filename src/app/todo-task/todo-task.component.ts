import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TasksServiceService } from 'src/api/tasks-service.service';
import { Task } from 'src/models/tasks';

@Component({
  selector: 'todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoTaskComponent {

  constructor(private _tasksService: TasksServiceService) { }

  remove(task: Task) {
    this.onRemoveTask.emit(task);
  }

  @Output()
  onRemoveTask = new EventEmitter<Task>();

  @Input()
  task!: Task;

  toggle(task: Task) {
    task.completed = !task.completed;
  }

}
