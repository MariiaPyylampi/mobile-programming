import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';

export default function history({ route, navigation}) {

  const { data } = route.params;

  return (
    <View style={styles.container}>
        <Text style={styles.headertext}>History</Text>
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
});
