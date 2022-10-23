import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SearchBarComponent} from '../components/SearchBarComponent';
import {TodosService} from '../../shared/services/todos/todos_service';
import {AsyncStorageTodoServiceImpl} from '../../shared/services/todos/async_storage_todo_service_impl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoModel} from '../../shared/models/todo_model';
import {FloatingActionButtonComponent} from '../../shared/components/FloatingActionButtonComponent';
import {CustomInputFieldComponent} from '../components/CustomInputFieldComponent';
import {CustomDropdownComponent} from '../components/CustomDropdownComponent';

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
              <View style={styles.listTile}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.state}>{item.state}</Text>
              </View>
            )}
          />
        )}
      </View>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <CustomInputFieldComponent
              label="Descrição:"
              onChangeText={setTodoDescription}
            />
            <CustomDropdownComponent
              label="Estado:"
              inputValues={states}
              selectedValue={todoState}
              onValueChange={setTodoState}
            />
            <View style={styles.buttonsSection}>
              <View style={styles.actionButton}>
                <Button
                  title="Adicionar"
                  color="#053261"
                  onPress={async () => {
                    await todosService.insertTodo({
                      name: todoDescription,
                      state: todoState,
                    });
                    updateTodos();
                    resetFields();
                  }}
                />
              </View>
              <View style={styles.actionButton}>
                <Button
                  title="Cancelar"
                  color="#053261"
                  onPress={resetFields}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  modalContent: {
    width: '100%',
    height: '50%',
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: '#cdcdcd',
    position: 'absolute',
    bottom: 0,
    padding: 8,
    backgroundColor: '#fbfbfb',
  },
  buttonsSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '40%',
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
    fontSize: 24,
  },
  state: {
    width: '30%',
    fontSize: 20,
  },
});
