import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoMainComponent } from './todo-main/todo-main.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { TodoMainPureComponent } from './todo-main-pure/todo-main-pure.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoMainComponent,
    TodoTaskComponent,
    TodoMainPureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
