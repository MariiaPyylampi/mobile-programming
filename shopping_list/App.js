import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {

  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const buttonPressedAdd = () => {
    setData([...data, {key: text}]);
    setText('');
  }

  const buttonPressedClear = () => {
    setData([]);
    setText('');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.headertext}>Shopping List</Text>
        <StatusBar style="auto" />
        <TextInput 
          style={styles.textinput}
          placeholder={'add item'}
          onChangeText={text => setText(text)}
          value={text}
        />
        <View style={styles.containers}>
          <View style={styles.button}>
            <Button onPress={buttonPressedAdd} title='ADD'/>
          </View>
          <View style={styles.button}>
            <Button onPress={buttonPressedClear} title='CLEAR'/>
          </View>
        </View>
        <Text style={styles.text}>Shopping List</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containers: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headertext: {
    fontSize: 25,
    color: 'steelblue',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textinput: {
    width: 200,
    backgroundColor: 'white',
    borderColor: 'steelblue',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    height: 50,
    margin: 10,
  },
});
