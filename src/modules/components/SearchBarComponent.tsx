import React from 'react';
import {GestureResponderEvent, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SearchBarComponentProps = {
  value?: string;
  onChanged?: (e: string) => void;
  onResetPressed?: (e: GestureResponderEvent) => void;
};

export const SearchBarComponent = (props: SearchBarComponentProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisa"
        style={styles.input}
        value={props.value}
        onChangeText={props.onChanged}
      />
      <View style={styles.searchButton}>
        <Icon
          name="refresh"
          onPress={props.onResetPressed}
          size={22}
          color="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    flex: 8,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    height: 48,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#053261',
    borderRadius: 5,
  },
});
