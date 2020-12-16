import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [desc, setDesc] = useState('');
  const [recipe, setRecipe] = useState([]);

  const getRecipe = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + desc;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRecipe(responseJson.results);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headertext}>Recipe</Text>
      <TextInput 
        style={{fontSize: 18, width: 200}} 
        value={desc} 
        placeholder="Description"
        onChangeText={(desc) => setDesc(desc)} 
      />
     <Button title="Find" onPress={getRecipe} />
     <FlatList 
        style={{marginLeft : "5%", marginTop: "7%"}}
        keyExtractor={item => item.id} 
        renderItem={({item}) => 
          <View>
            <Text>{item.title}</Text>
            <Image source={{ uri: item.thumbnail,}} style={{height: 50, width: 50}} />
          </View>
        } 
        ItemSeparatorComponent={listSeparator}
        data={recipe} 
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
},
});