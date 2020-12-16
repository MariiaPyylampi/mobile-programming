import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, ListItem, Icon} from 'react-native-elements';

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
  
  const renderItem = ({ item }) => (
    <ListItem 
      key={item.id}
      bottomDivider
      onPress={() => deleteItem(item.id)}
    >
      <ListItem.Content>
        <ListItem.Title>{item.item}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon name='delete' />
    </ListItem>
  )
/*  <ListItem
      key={id}
      title={item.item}
      subtitle={item.amount}
      rightIcon={{name: 'delete', onPress: () => {deleteItem(item.id)}}}
      bottomDivider
    /> */
  
  
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Header 
        centerComponent={{ text: 'SHOPPING LIST', style: { color: 'white', fontWeight: 'bold', fontSize: 16 }}}
        statusBarProps={{ barStyle: 'light-content' }}
        containerStyle={{ backgroundColor: 'steelblue', marginBottom: 20 }}
        />
        <View style={{flex: 1, width: '90%', alignItems: 'center'}}>
          <Input 
            placeholder='add item'
            label='ITEM' 
            onChangeText={(item) => setItem(item)} 
            value={item} 
          />
          <Input 
            placeholder='add amount'
            label='AMOUNT' 
            onChangeText={(amount) => setAmount(amount)} 
            value={amount} 
          />
          <Button 
            raised 
            buttonStyle={{backgroundColor: 'steelblue', width: 100 }} 
            icon={{type: 'material', name: 'save', color: 'white' }} iconRight
            onPress={buttonPressedSave} 
            title="ADD" />
          <FlatList
            style={{width: '100%'}}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} 
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containers: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  }
});