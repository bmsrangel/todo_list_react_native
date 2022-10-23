import {CreateTodoDTO} from '../../dtos/create_todo_dto';
import {UpdateTodoDTO} from '../../dtos/update_todo_dto';
import {TodoModel} from '../../models/todo_model';

export interface TodosService {
  getAllTodos(): Promise<TodoModel[]>;
  insertTodo(newTodo: CreateTodoDTO): Promise<TodoModel>;
  updateTodoState(todoDTO: UpdateTodoDTO): Promise<TodoModel>;
  findTodoByName(name: string): Promise<TodoModel[]>;
  deleteTodo(uid: string): Promise<void>;
}
