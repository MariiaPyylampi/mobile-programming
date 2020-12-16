import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [findtext, setFindtext] = useState('Haaga-Helia')
  const [data, setData] = useState(
    { 
      latitude: 60.201373, 
      longitude: 24.934041
    })
  

  const showLoc = () => {
    console.log('button pressed')
    const trim = findtext.replace(/\s+/g, "")
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=jccOCdz0ooeoq31CY6Bz9kZlqDypypDQ&location=' + trim
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('testi')
      console.log(responseJson.results[0].locations[0].latLng)
      console.log(responseJson.results[0].locations[0].latLng.lat)
      const coords = {
        latitude: responseJson.results[0].locations[0].latLng.lat,
        longitude: responseJson.results[0].locations[0].latLng.lng
      }
      console.log(coords)
      setData(coords)
    })
    .catch((error) => {
      Alert.alert('Error', error)
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
          style={styles.textinput}
          placeholder='address, city and postal code'
          value={findtext}
          clearButtonMode = "always"
          onChangeText={(findtext) => setFindtext(findtext)}
         
        />
      <Button title='show' onPress={showLoc}></Button>
      <MapView
        style={{flex: 1, width: '100%', height: '100%'}}
        region={{
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
          <Marker
            coordinate={data}
            title={findtext}
          />
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  textinput: {
    fontSize: 16, 
    width: 300
  }
});
