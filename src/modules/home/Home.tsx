import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
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
import {Picker} from '@react-native-picker/picker';
import {useDebouncedCallback} from 'use-debounce';

export const Home = () => {
  const todosService: TodosService = new AsyncStorageTodoServiceImpl(
    AsyncStorage,
  );

  const [search, setSearch] = useState<string>('');
  const [todosList, setTodosList] = useState<TodoModel[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const states = ['Pendente', 'Em andamento', 'Finalizado'];
  const [todoDescription, setTodoDescription] = useState<string>('');
  const [todoState, setTodoState] = useState<string>(states[0]);

  useEffect(() => {
    todosService.getAllTodos().then(todos => {
      setTodosList(todos);
      console.log(todos);
      setIsLoading(false);
    });
  }, []);

  const debounced = useDebouncedCallback(async term => {
    const filteredResults = await todosService.findTodoByName(term);
    setTodosList(filteredResults);
  }, 1000);

  const reloadTodos = async () => {
    const todos = await todosService.getAllTodos();
    setTodosList(todos);
  };

  const resetFields = () => {
    setTodoDescription('');
    setTodoState(states[0]);
    setIsModalVisible(false);
  };

  const onSearchChanged = (value: string) => {
    setSearch(value);
    debounced(value);
  };

  const onResetPressed = () => {
    reloadTodos();
    setSearch('');
  };

  const onAddPressed = async () => {
    await todosService.insertTodo({
      name: todoDescription,
      state: todoState,
    });
    reloadTodos();
    resetFields();
  };

  const flatListRenderItem: ListRenderItem<TodoModel> = ({item}) => (
    <TouchableOpacity
      onLongPress={async () => {
        await todosService.deleteTodo(item.uid);
        reloadTodos();
      }}>
      <View style={styles.listTile}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.state}>
          <Picker
            selectedValue={item.state}
            onValueChange={async value => {
              await todosService.updateTodoState({
                uid: item.uid,
                state: value,
              });
              reloadTodos();
            }}>
            {states.map((state, index) => (
              <Picker.Item label={state.toString()} value={state} key={index} />
            ))}
          </Picker>
        </View>
      </View>
    </TouchableOpacity>
  );

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={styles.container}>
      <SearchBarComponent
        value={search}
        onChanged={onSearchChanged}
        onResetPressed={onResetPressed}
      />
      <View style={styles.content}>
        {todosList?.length === 0 ? (
          <Text>Nenhuma tarefa criada.</Text>
        ) : (
          <FlatList
            data={todosList}
            keyExtractor={key => key.uid}
            renderItem={flatListRenderItem}
          />
        )}
      </View>
      <TodoModalComponent
        isVisible={isModalVisible}
        onChangeDescription={setTodoDescription}
        dropdownInputValues={states}
        dropdownSelectedValue={todoState}
        onDropdownChanged={setTodoState}
        onAddPressed={onAddPressed}
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
    width: '55%',
    fontSize: 18,
  },
  state: {
    width: '45%',
  },
});
