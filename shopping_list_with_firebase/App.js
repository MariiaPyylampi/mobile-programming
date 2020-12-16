import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import firebase from './firebase';

export default function App() {

  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase.database().ref('shoppinglist/').on('value',  snapshot =>  {
      if (snapshot.val() !== null) {
        const fbdata =  snapshot.val();
        const prods = Object.values(fbdata);
        console.log('prods', prods)
        setData(prods);
      }
    });
  }, []);

  const saveItem = () => {
    firebase.database().ref('shoppinglist/').push(
      {'item': item,  'amount': amount}
    );
    setItem('');
    setAmount('');
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
        <Text style={styles.headertext}>Shopping List</Text>
        <StatusBar style="auto" />
        <TextInput 
          style={styles.textinput}
          placeholder={'add item'}
          onChangeText={item => setItem(item)}
          value={item}
        />
        <TextInput 
          style={styles.textinput}
          placeholder={'add amount'}
          onChangeText={amount => setAmount(amount)}
          value={amount}
        />
        <View style={styles.containers}>
          <View style={styles.button}>
            <Button onPress={saveItem} title='Save'/>
          </View>
        </View>
        <Text style={styles.text}>Shopping List</Text>
        <FlatList
          keyExtractor={item => item.item} 
          renderItem={({ item }) => <Text>{item.key}</Text>}
          renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.item}, {item.amount}</Text></View>} 
          data={data} 
          ItemSeparatorComponent={listSeparator} 
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
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
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
