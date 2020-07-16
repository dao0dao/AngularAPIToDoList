import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { delay } from 'rxjs/operators'
import { Observable } from 'rxjs';

export interface Task {
  id?: number,
  title: string,
  completed: boolean
}

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  loadTasks(option: boolean, limit: number): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/todos?completed=${option}&_limit=${limit}`, { observe: 'response' })
      .pipe(
        delay(1000)
      )
  }

  addTask(text: string): Observable<Task> {
    return this.http.post<Task>('https://jsonplaceholder.typicode.com/todos/', {
      title: text,
      completed: false
    })
  }

  removeTask(id: number): Observable<void> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }

  doneTask(id: number): Observable<Task> {
    return this.http.patch<Task>(`https://jsonplaceholder.typicode.com/todos/${id}`, { completed: true })
  }

  constructor(private http: HttpClient) { }

}
