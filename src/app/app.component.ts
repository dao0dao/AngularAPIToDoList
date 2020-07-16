import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Task, TasksService } from './services/tasks.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  title: string = 'Lista zadań - Angular API'
  text: string = ''
  limit: number = 5
  option: boolean = false
  tasks: Task[] = []

  addTask() {
    this.taskService.addTask(this.text)
      .subscribe(
        (task) => { this.tasks.push(task) },
        (res: any) => { console.log(res); }
      )
    this.text = ''
  }

  removeTaks(id: number) {
    this.taskService.removeTask(id)
      .subscribe(() => { this.tasks = this.tasks.filter(task => task.id !== id) })
  }

  doneTask(id: number) {
    this.taskService.doneTask(id)
      .subscribe(
        () => {
          this.tasks.map(
            task => {
              if (task.id === id) {
                task.completed = true
              }
            }
          )
        }
      )
  }

  loadTasks() {
    this.tasks = []
    this.taskService.loadTasks(this.option, this.limit)
      .subscribe(res => {
        this.tasks = (res.body as Task[]);
      })
  }

  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.loadTasks()
  }
}
