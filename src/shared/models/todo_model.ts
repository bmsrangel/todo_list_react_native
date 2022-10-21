export type TodoModel = {
  uid: string;
  name: string;
  state: 'todo' | 'doing' | 'completed';
};
