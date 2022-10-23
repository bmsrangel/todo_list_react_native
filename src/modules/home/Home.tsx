import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SearchBarComponent} from '../components/SearchBarComponent';
import {TodosService} from '../../shared/services/todos/todos_service';
import {AsyncStorageTodoServiceImpl} from '../../shared/services/todos/async_storage_todo_service_impl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoModel} from '../../shared/models/todo_model';
import {FloatingActionButtonComponent} from '../../shared/components/FloatingActionButtonComponent';
import {TodoModalComponent} from '../components/TodoModalComponent';

export const Home = () => {
  const todosService: TodosService = new AsyncStorageTodoServiceImpl(
    AsyncStorage,
  );

  const [search, setSearch] = useState<string>('');
  const [todosList, setTodosList] = useState<TodoModel[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const states = ['Todo', 'Doing', 'Completed'];
  const [todoDescription, setTodoDescription] = useState<string>('');
  const [todoState, setTodoState] = useState<string>(states[0]);

  useEffect(() => {
    todosService.getAllTodos().then(todos => {
      setTodosList(todos);
      console.log(todos);
      setIsLoading(false);
    });
  }, []);

  const updateTodos = async () => {
    setIsLoading(true);
    const todos = await todosService.getAllTodos();
    setTodosList(todos);
    setIsLoading(false);
  };

  const resetFields = () => {
    setTodoDescription('');
    setTodoState(states[0]);
    setIsModalVisible(false);
  };

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={styles.container}>
      <SearchBarComponent
        value={search}
        onChanged={setSearch}
        onSearchPressed={() => console.log('search pressed')}
      />
      <View style={styles.content}>
        {todosList?.length === 0 ? (
          <Text>Nenhuma tarefa criada.</Text>
        ) : (
          <FlatList
            data={todosList}
            keyExtractor={key => key.uid}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.listTile}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.state}>{item.state}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <TodoModalComponent
        isVisible={isModalVisible}
        onChangeDescription={setTodoDescription}
        dropdownInputValues={states}
        dropdownSelectedValue={todoState}
        onDropdownChanged={setTodoState}
        onAddPressed={async () => {
          await todosService.insertTodo({
            name: todoDescription,
            state: todoState,
          });
          updateTodos();
          resetFields();
        }}
        onCancelPressed={resetFields}
      />
      <FloatingActionButtonComponent
        onPressed={() => setIsModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
    width: '100%',
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  listTile: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    width: '70%',
    fontSize: 20,
  },
  state: {
    width: '30%',
    fontSize: 16,
  },
});
