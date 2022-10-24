import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type CustomDropdownComponentProps<T> = {
  label: string;
  selectedValue: T;
  onValueChange?: ((itemValue: T, itemIndex: number) => void) | undefined;
  inputValues: T[];
};

export const CustomDropdownComponent = <T extends Object>(
  props: CustomDropdownComponentProps<T>,
) => {
  return (
    <View style={styles.pickerSection}>
      <Text>{props.label}</Text>
      <Picker<T>
        style={styles.picker}
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}>
        {props.inputValues.map((state, index) => (
          <Picker.Item label={state.toString()} value={state} key={index} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
  },
});
