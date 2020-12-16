import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default function App() {
  
  const [numInput, setNumInput] = useState('');
  const [curRates, setCurRates] = useState('');
  const [pickerValues, setPickerValues] = useState([]);
  const [selectedCur, setSelectedCur] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => getCurrencyRates(), [])

  const getCurrencyRates = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=8da276568f820f42b9fde6f5a3644cb5'
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.rates)
      const rates = Object.keys(responseJson.rates)
      console.log(rates)
      setCurRates(responseJson.rates)
      setPickerValues(rates)
    })
    .catch((Error) =>
      Alert.alert('Error', Error))
  }

  const convert = () => {
    const number = Number(numInput)
    const converted = number / curRates[selectedCur]
    const round = converted.toFixed(2)
    setResult(round)
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.headertext}>Euro conventer</Text>
        <StatusBar style="auto"></StatusBar>
        <Text style={styles.text}>Result: {result} €</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        <TextInput style={styles.textinput}
          value={numInput}
          onChangeText={numInput => setNumInput(numInput)}
          keyboardType='numeric'
        />
        <Picker
        style={{width: 50}}
        itemStyle={{width: 50}}
        selectedValue={selectedCur}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedCur(itemValue)
        }>
          {pickerValues.map((item) => <Picker.Item label={item} value={item} key={item} />)}
        </Picker>
        <Button onPress={convert} title='Convert'/>
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
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
    borderColor: 'steelblue',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
  },
});
