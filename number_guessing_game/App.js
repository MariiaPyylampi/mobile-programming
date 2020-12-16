import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Button, TextInput } from 'react-native';

export default function App() {

  const [random, setRandom] = useState(Math.floor(Math .random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [count, setCount] = useState(1);
  const [text, setText] = useState('Guess a number between 1-100');

  const guessNumber = () => {
    if(guess < random) {
      setCount(count + 1);
      setText('Your guess ' + guess + ' is too low');
      setGuess('');
    } else if(guess > random){
      setCount(count + 1);
      setText('Your guess ' + guess + ' is too high');
      setGuess('');
    } else {
      Alert.alert('You guessed the number in ' + count + ' guesses');
      setCount(1);
      setRandom(Math.floor(Math .random() * 100) + 1);
      setText('Guess a number between 1-100');
      setGuess('');
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headertext}>Number Guessing Game</Text>
        <StatusBar style="auto" />
      </View>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View>
        <TextInput
          placeholder={'Guess!'}
          style={styles.textinput}
          onChangeText={guess => setGuess(parseInt(guess, 10))}
          value={guess}
          keyboardType='numeric'
        />
        <Button onPress={guessNumber} title='MAKE GUESS'></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  headertext: {
    fontSize: 25,
    color: 'steelblue',
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
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
});
