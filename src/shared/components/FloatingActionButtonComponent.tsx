import React from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FloatingActionButtonProps = {
  onPressed?: (e: GestureResponderEvent) => void;
};

export const FloatingActionButtonComponent = (
  props: FloatingActionButtonProps,
) => {
  return (
    <View style={styles.container}>
      <Icon name="add" color="white" size={32} onPress={props.onPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 60,
    aspectRatio: 1,
    backgroundColor: '#053261',
    bottom: 16,
    right: 16,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
