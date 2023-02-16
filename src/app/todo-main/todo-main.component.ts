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
  tasks: Task[] = [];

  constructor (
    private _tasksService: TasksServiceService,
    private _changeDetector: ChangeDetectorRef,
    ) { }

  ntasks(): number {
    return this.tasks.length;
  }

  ngOnInit(): void {
    this._tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this._changeDetector.detectChanges();
      }
    });
  }
}
