import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-elements';
import * as Location from 'expo-location';

export default function map({ route, navigation }) {
    const { item } = route.params;

    const [title, setTitle] = useState('')
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
            setTitle('YOU ARE HERE')
          }
        }
        catch (error) {
        console.log('error')
        }
      }

    const showLoc = () => {
        console.log('button pressed')
        const trim = item.address.replace(/\s+/g, "")
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
          setTitle(item.address)
        })
        .catch((error) => {
          Alert.alert('Error', error)
        })
      }

    return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <MapView
          style={{flex: 1, width: '100%', height: '100%'}}
          region={{
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          }}>
            <Marker
              coordinate={data}
              title={title}
            />
          </MapView>
          <Button 
            raised 
            buttonStyle={{backgroundColor: 'steelblue', padding: 10}} 
            icon={{type: 'material', name: 'map', color: 'white' }}
            onPress={showLoc} 
            title="SHOW" 
            />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  });
  