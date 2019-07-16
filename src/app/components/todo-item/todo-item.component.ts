import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {Todo} from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // set dynamic classes if item is true then it gets the class of 'is-complete'
  setClasses(){
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  // onToggle changes todo if line is through or not. If you check the box then it is assigned the methos setClasses which gives it the line through css class
  onToggle(todo){
    // UI
    todo.completed = !todo.completed;
    // Server
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo)
    });
  }
  // Deletes todo
  onDelete(todo){
    this.deleteTodo.emit(todo)
  }

}
