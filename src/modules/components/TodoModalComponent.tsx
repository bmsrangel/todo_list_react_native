import React from 'react';
import {Modal, View, Button, StyleSheet} from 'react-native';
import {CustomDropdownComponent} from './CustomDropdownComponent';
import {CustomInputFieldComponent} from './CustomInputFieldComponent';

type TodoModalComponentProps = {
  isVisible: boolean;
  onChangeDescription?: (value: string) => void;
  dropdownInputValues: string[];
  dropdownSelectedValue: string;
  onDropdownChanged: (itemValue: string, itemIndex: number) => void;
  onAddPressed: () => void;
  onCancelPressed: () => void;
};

export const TodoModalComponent = (props: TodoModalComponentProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.isVisible}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <CustomInputFieldComponent
            label="Descrição:"
            onChangeText={props.onChangeDescription}
          />
          <CustomDropdownComponent<string>
            label="Estado:"
            inputValues={props.dropdownInputValues}
            selectedValue={props.dropdownSelectedValue}
            onValueChange={props.onDropdownChanged}
          />
          <View style={styles.buttonsSection}>
            <View style={styles.actionButton}>
              <Button
                title="Adicionar"
                color="#053261"
                onPress={props.onAddPressed}
              />
            </View>
            <View style={styles.actionButton}>
              <Button
                title="Cancelar"
                color="#053261"
                onPress={props.onCancelPressed}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});
