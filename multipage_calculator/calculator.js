import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default function calculatorApp({ navigation }) {

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);

  const buttonPressedSum = () => {
    const [number1, number2] = [Number(num1), Number(num2)]
    var sum = number1 + number2;
    setResult(sum);
    var sumText = number1 + ' + ' + number2 + ' = ' + sum;
    setData([...data, {key: sumText}]);
    setNum1('');
    setNum2('');
  }

  const buttonPressedSub = () => {
    const [number1, number2] = [Number(num1), Number(num2)]
    var sub = number1 - number2;
    setResult(sub);
    var subText = number2 + ' - ' + number2 + ' = ' + sub;
    setData([...data, {key: subText}]);
    setNum1('');
    setNum2('');   
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.headertext}>Calculator</Text>
        <StatusBar style="auto" />
      </View>
      <View style={{flex: 1}}>
        <TextInput
          placeholder={'first number'}
          style={styles.textinput}
          onChangeText={num1 => setNum1(num1)}
          value={num1}
          keyboardType='numeric'
        />
        <TextInput
          placeholder={'second number'}
          style={styles.textinput}
          onChangeText={num2 => setNum2(num2)}
          value={num2}
          keyboardType='numeric'
        />
        </View>
        <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
          <View style={styles.button}>
            <Button 
              color='steelblue'
              title="+" 
              onPress={buttonPressedSum} 
            />
          </View> 
          <View style={styles.button}>     
            <Button 
              color='steelblue'
              title="-" 
              onPress={buttonPressedSub} 
            />
          </View>
          <View style={{width: 90, margin: 5,}}>     
            <Button 
              color='steelblue'
              title="History"
              onPress={() => navigation.navigate('History', {data})} 
              title="History" 
            />
          </View>
        </View>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.text}>Result: {result}</Text>
        </View>
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
  },
  text: {
    fontSize: 20,
  },
  textinput: {
    width: 200,
    backgroundColor: 'white',
    borderColor: 'steelblue',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  button: {
    width: 50, 
    margin: 5,
  },
});
