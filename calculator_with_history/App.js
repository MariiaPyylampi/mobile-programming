import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';

export default function App() {

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);

  const buttonPressedSum = () => {
    var sum = num1 + num2;
    setResult(sum);
    var sumText = num1 + ' + ' + num2 + ' = ' + sum;
    setData([...data, {key: sumText}]);
    setNum1('');
    setNum2('');
  }

  const buttonPressedSub = () => {
    var sub = num1 - num2;
    setResult(sub);
    var subText = num1 + ' - ' + num2 + ' = ' + sub;
    setData([...data, {key: subText}]);
    setNum1('');
    setNum2('');   
  }

  return (
    <View style={styles.container}>
        <Text style={styles.headertext}>Calculator with history</Text>
        <StatusBar style="auto" />
        <Text style={styles.text}>Result: {result}</Text>
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
        <View style={{flex: 0.3, flexDirection: 'row', alignItems: 'center',}}>
          <View style={styles.button}>
            <Button onPress={buttonPressedSum} title="+" />
          </View> 
          <View style={styles.button}>     
            <Button onPress={buttonPressedSub} title="-" />
          </View>
        </View>
        <Text style={styles.text}>History:</Text>
        <FlatList
        data={data}
        renderItem={({item}) => <Text>{item.key}</Text>}
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
    justifyContent: 'space-around'
  },
  headertext: {
    fontSize: 25,
    color: 'steelblue',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
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
