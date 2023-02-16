import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TasksServiceService } from 'src/api/tasks-service.service';
import { Task } from 'src/models/tasks';
import { TodoMainState } from 'src/models/todo-main-state';

@Component({
  selector: 'todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoMainComponent implements OnInit {

  state: TodoMainState = initialState();

  constructor (private _tasksService: TasksServiceService) { }

  onRemoveTask(task: Task) {
    this._tasksService.deleteTask(task.id).subscribe({
      next: (task) => {
        const tasks = this.state.tasks.filter(t => t.id !== task.id);
        this.state = { ...this.state, tasksLeft: tasks.filter(t => !t.completed).length, tasks };
      }
    });
  }

  onAddTask($event: string) {
    this._tasksService.addTask($event).subscribe({
      next: (task) => {
        const tasks =  [...this.state.tasks, task];
        this.state = { ...this.state, tasksLeft: tasks.filter(t => !t.completed).length, tasks };
      }
    });
  }


  ngOnInit(): void {
    this._tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.state = {  ...this.state, tasksLeft: tasks.filter(t => !t.completed).length, tasks };
      }
    });
  }
}

function initialState(): TodoMainState {
  return {
    tasksLeft: 0,
    tasks: [],
  };
}

