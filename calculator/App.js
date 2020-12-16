import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const buttonPressedSum = () => {
    var sum = num1 + num2;
    setResult(sum);
  }

  const buttonPressedSub = () => {
    var sub = num1 - num2;
    setResult(sub);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headertext}>CALCULATOR</Text>
        <StatusBar style="auto" />
        <Text style={styles.text}>RESULT: {result}</Text>
      </View>
      <View>
        <TextInput
          placeholder={'first number'}
          style={styles.textinput}
          onChangeText={num1 => setNum1(parseInt(num1, 10))}
          value={num1}
          keyboardType='numeric'
        />
        <TextInput
          placeholder={'second number'}
          style={styles.textinput}
          onChangeText={num2 => setNum2(parseInt(num2, 10))}
          value={num2}
          keyboardType='numeric'
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.button}>
          <Button onPress={buttonPressedSum} title="+" />
        </View> 
        <View style={styles.button}>       
          <Button onPress={buttonPressedSub} title="-" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertext: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  textinput: {
    width: 200,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  button: {
    width: 50, 
    margin: 10,
  },
});
