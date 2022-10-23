import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type CustomInputFieldComponentProps = {
  label: string;
  onChangeText?: (value: string) => void;
};

export const CustomInputFieldComponent = (
  props: CustomInputFieldComponentProps,
) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput style={styles.input} onChangeText={props.onChangeText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#898989',
    flex: 1,
    borderRadius: 5,
  },
  label: {
    paddingRight: 8,
  },
});
