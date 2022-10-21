import {TodoDTO} from '../../dtos/todo_dto';
import {TodoModel} from '../../models/todo_model';
import {TodosService} from './todos_service';
import {AsyncStorageStatic} from '@react-native-async-storage/async-storage';
import {v4 as uuidV4} from 'uuid';

export class AsyncStorageTodoServiceImpl implements TodosService {
  constructor(storage: AsyncStorageStatic) {
    this._storage = storage;
    this._todosKey = '@todos_key';
  }

  _storage: AsyncStorageStatic;
  _todosKey: string;

  async getAllTodos(): Promise<TodoModel[]> {
    const rawData = await this._storage.getItem(this._todosKey);
    if (rawData !== null) {
      const data = JSON.parse(rawData);
      return data;
    } else {
      return [];
    }
  }

  async insertTodo(newTodo: TodoModel): Promise<TodoModel> {
    const todos = await this.getAllTodos();
    const newTodoUid = uuidV4();
    newTodo.uid = newTodoUid;
    todos.push(newTodo);
    const rawData = JSON.stringify(todos);
    await this._storage.setItem(this._todosKey, rawData);
    return newTodo;
  }

  async updateTodoState(todoDTO: TodoDTO): Promise<TodoModel> {
    const todos = await this.getAllTodos();
    const todoIndex = todos.findIndex(todo => todo.uid === todoDTO.uid);
    todos[todoIndex].state = todoDTO.state;
    const rawData = JSON.stringify(todos);
    await this._storage.setItem(this._todosKey, rawData);
    return todos[todoIndex];
  }

  async findTodoByName(name: string): Promise<TodoModel[]> {
    const todos = await this.getAllTodos();
    const filteredTodos = todos.filter(todo => todo.name.includes(name));
    return filteredTodos;
  }

  async deleteTodo(uid: string): Promise<void> {
    const todos = await this.getAllTodos();
    const filteredTodos = todos.filter(todo => todo.uid !== uid);
    const rawData = JSON.stringify(filteredTodos);
    await this._storage.setItem(this._todosKey, rawData);
  }
}
