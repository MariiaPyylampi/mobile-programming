import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Input, Button, ListItem } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('addressdb.db');

export default function addressList ({ route, navigation }) {

    const [address, setAddress] = useState('');
    const [addressData, setAddressData] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql('create table if not exists addressList (id integer primary key not null, address text);');
        }, null, updateList);  
      }, []);

    const buttonPressedSave = () => {
        console.log('pressed')
        db.transaction(tx => {
            tx.executeSql('insert into addressList (address) values (?);', [address]);    
          }, null, updateList
        )
        console.log(address)
        setAddress('')
    }

    const updateList = () => {
        db.transaction(tx => {
          tx.executeSql('select * from addressList;', [], (_, { rows }) =>
            setAddressData(rows._array)
          ); 
          
        });
        console.log(address)
      }

      const deleteAddress = (id) => {
        db.transaction(
          tx => {
            tx.executeSql(`delete from addressList where id = ?;`, [id]);
          }, null, updateList
        )    
      }

      const renderItem = ({ item, id }) => (
        <ListItem 
            key={id} 
            title={item.address}
            bottomDivider 
            chevron
            rightSubtitle = "Show on map"
            onLongPress={() => deleteAddress(item.id)}
            onPress={() => navigation.navigate('MAP', {item})}
        />       
      )

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Input 
                placeholder='insert address, city and postal code'
                label='PLACEFINDER'
                onChangeText={(address) => setAddress(address)} 
                value={address} 
            />
            <Button 
                raised 
                buttonStyle={{backgroundColor: 'steelblue', padding: 10, width: 350}} 
                icon={{type: 'material', name: 'save', color: 'white' }}
                onPress={buttonPressedSave} 
                title="SAVE" 
            />
            <FlatList
                style={{width: '100%'}}
                data={addressData}
                renderItem={renderItem}
            />     
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
   justifyContent: 'space-around'
  }
});
