import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TasksServiceService } from 'src/api/tasks-service.service';
import { Task } from 'src/models/tasks';

@Component({
  selector: 'todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoMainComponent implements OnInit {

  newTaskCaption: string = '';

  tasks: Task[] = [];

  constructor (
    private _tasksService: TasksServiceService,
    private _changeDetector: ChangeDetectorRef,
    ) { }


  addTask($event: string) {
    this._tasksService.addTask($event).subscribe({
      next: (task) => {
        this.tasks = [...this.tasks, task];
        this._changeDetector.detectChanges();
      }
    });
  }

  ntasks(): number {
    let acc = 0;
    for (let task of this.tasks) {
      if (!task.completed) {
        acc++;
      }
    }
    return acc;
  }

  ngOnInit(): void {
    this._tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this._changeDetector.detectChanges();
      }
    });
  }

  doRemoveTask(task: Task) {
    this._tasksService.deleteTask(task.id).subscribe({
      next: (task) => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this._changeDetector.detectChanges();
      }
    });
  }
}
