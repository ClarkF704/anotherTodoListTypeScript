import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[];

  constructor(private todoService:TodoService) { }
   

  ngOnInit() {
    // .subscribe() similar to .then()
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    })
  }

  // Deleteing Todo
  deleteTodo(todo:Todo){
    // UI
    this.todos = this.todos.filter(t => t.id !== todo.id)
    // Server
    this.todoService.deleteTodo(todo).subscribe();

  }

  // Add Todo
  addTodo(todo:Todo){

    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.unshift(todo)
    })

  }

}
