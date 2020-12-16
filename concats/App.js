import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';



export default function App() {

  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    console.log('button pressed')

    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
       });

       if(data.length > 0) {
         console.log(data)
         setContact(data)
       }
    }

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
      <Text style={styles.headertext}>Contacts</Text>
      <StatusBar style="auto" />
      <View style={styles.button}>
        <Button 
          color='steelblue'
          title="Get contacts" 
          onPress={getContacts} 
        />
      </View>
      <FlatList
        data={contact}
        renderItem={({item}) => {
          if (!item.phoneNumbers)
          return <Text>{item.name} no number</Text>
          return <Text>{item.name} {item.phoneNumbers[0].number} </Text>
        }}
        ItemSeparatorComponent={listSeparator} 
      />
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
  button: {
    width: 200, 
    margin: 5,
  }
});
