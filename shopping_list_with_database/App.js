import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, AsyncStorage, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {

  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, item text, amount text);');
    }, null, updateList);  
  }, []);

  const buttonPressedSave = () => {
    db.transaction(tx => {
        tx.executeSql('insert into shopping (item, amount) values (?, ?);', [item, amount]);    
      }, null, updateList
    )
    console.log(item, amount)
    setItem('')
    setAmount('')
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping;', [], (_, { rows }) =>
        setData(rows._array)
      ); 
      
    });
    console.log(data)
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shopping where id = ?;`, [id]);
      }, null, updateList
    )    
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
            <Button onPress={buttonPressedSave} title='Save'/>
          </View>
        </View>
        <Text style={styles.text}>Shopping List</Text>
        <FlatList
          keyExtractor={item => item.id.toString()} 
          renderItem={({ item }) => <Text>{item.key}</Text>}
          renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.item}, {item.amount}</Text>
          <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> delete</Text></View>} 
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
