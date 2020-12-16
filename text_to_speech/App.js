import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [textInput, setTextInput] = useState('')

  const buttonPressed = () => {
    console.log('button pressed')
    Speech.speak(textInput)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headertext}>Text to speech</Text>
      <TextInput
          placeholder="enter text"
          style = {styles.textinput}
          onChangeText = {textInput => setTextInput(textInput)}
          value = {textInput}
          clearButtonMode='always'
      />
      <View style={styles.button}>
            <Button onPress={buttonPressed} title='SPEAK'/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
  },
  headertext: {
    fontSize: 25,
    color: 'steelblue',
    fontWeight: 'bold',
    marginBottom: 20,
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
    width: 200, 
    margin: 5,
  }
});
