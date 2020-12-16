import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'

export default function App() {
  const [findtext, setFindtext] = useState('')
  const [data, setData] = useState({latitude: 0, longitude: 0})

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    try{
      console.log('get location')
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to access location')
        console.log('no permission')
      }
      else {
        let location = await Location.getCurrentPositionAsync({})
        console.log(location.coords)
        setData(location.coords)
      }
    }
    catch (error) {
    console.log('error')
    }
  }

  const showLoc = () => {
    console.log('button pressed')
    const trim = findtext.replace(/\s+/g, "")
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=jccOCdz0ooeoq31CY6Bz9kZlqDypypDQ&location=' + trim
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.results[0].locations[0].latLng)
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
          clearButtonMode = "always"
          value={findtext}
          onChangeText={(findtext) => setFindtext(findtext)}
         
        />
      <Button title='show' onPress={showLoc}></Button>
      <MapView
        style={{flex: 1, width: '100%', height: '100%'}}
        showsUserLocation={true}
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
    fontSize: 18, 
    width: 200
  }
});
