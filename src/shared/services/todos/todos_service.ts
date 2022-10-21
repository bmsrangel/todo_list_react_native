import {TodoDTO} from '../../dtos/todo_dto';
import {TodoModel} from '../../models/todo_model';

export interface TodosService {
  getAllTodos(): Promise<TodoModel[]>;
  insertTodo(newTodo: TodoModel): Promise<TodoModel>;
  updateTodoState(todoDTO: TodoDTO): Promise<TodoModel>;
  findTodoByName(name: string): Promise<TodoModel[]>;
  deleteTodo(uid: string): Promise<void>;
}
