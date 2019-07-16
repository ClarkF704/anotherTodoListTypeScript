import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  // Headers are used fo sending information to the server
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  //Observable comes from Rxjs
  // Getting todos
  getTodos():Observable<Todo[]> {
    //<Todo[]> Bringing our GET request this is out Todo format/Type as an array from out Todo Model
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`)
  }

  // Delete todo Server method
  deleteTodo(todo:Todo):Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.delete<Todo>(url, httpOptions);

    
  }


  // Toggle Completed
  toggleCompleted(todo: Todo):Observable<any>{
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put(url, todo, httpOptions);
    
  }


  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions)
  }
}
