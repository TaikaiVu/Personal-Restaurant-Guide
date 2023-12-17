import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';


const EditRestaurant = ({ route, navigation }) => {
  // Ensure that route.params.restaurant exists or provide a default empty object
  const { restaurant } = route.params || { restaurant: {} };
  const [editedRestaurant, setEditedRestaurant] = useState({
    name: restaurant.name,
    address: restaurant.address,
    phoneNumber: restaurant.phoneNumber,
    details: restaurant.details,
    tag: restaurant.tag,
    rating: restaurant.rating,
  });

  const handleSaveChanges = async () => {
    // Check if the edited restaurant's address is missing
    if (!editedRestaurant.address.trim()) {
      alert('Address must be filled'); 
      return; // Stop further execution if address is missing
    }
  
    try {
      // Load existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem('restaurantData');
      let data = existingData ? JSON.parse(existingData) : [];
  
      // Find the index of the restaurant to be edited
      const index = data.findIndex((r) => r.name === restaurant.name);
  
      // Update the restaurant data
      if (index !== -1) {
        data[index] = { ...data[index], ...editedRestaurant };
  
        // Save the updated data back to AsyncStorage
        await AsyncStorage.setItem('restaurantData', JSON.stringify(data));
  
        console.log('Changes saved:', editedRestaurant);
  
        // Navigate back to the Detail Restaurant screen
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();
        navigation.navigate('Detail Restaurant', { restaurant: data[index] });
      } else {
        console.error('Restaurant not found for editing');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Restaurant</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={editedRestaurant.name}
        onChangeText={(text) => setEditedRestaurant({ ...editedRestaurant, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={editedRestaurant.address}
        onChangeText={(text) => setEditedRestaurant({ ...editedRestaurant, address: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={editedRestaurant.phoneNumber}
        onChangeText={(text) => setEditedRestaurant({ ...editedRestaurant, phoneNumber: text })}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Details"
        value={editedRestaurant.details}
        onChangeText={(text) => setEditedRestaurant({ ...editedRestaurant, details: text })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Tag"
        value={editedRestaurant.tag}
        onChangeText={(text) => setEditedRestaurant({ ...editedRestaurant, tag: text })}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Rating"
        value={editedRestaurant.rating}
        onChangeText={(text) => setEditedRestaurant({ ...editedRestaurant, rating: text })}
      /> */}

        <View style={styles.pickerContainer}>
        <RNPickerSelect
          items={[
            { label: '5.0', value: '5.0' },
            { label: '4.5', value: '4.5' },
            { label: '4.0', value: '4.0' },
            { label: '3.5', value: '3.5' },
            { label: '3.0', value: '3.0' },
          ]}
          value={editedRestaurant.rating}
          placeholder='Rating'
          onValueChange={(items) => setEditedRestaurant({ ...editedRestaurant, rating: items })}
          style={pickerSelectStyles}
        />
      </View>
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 98,
    paddingBottom: 12,
    borderColor: '#4682B4',
    borderRadius: 8,
    backgroundColor: '#4682B4',
    color: 'white',
    paddingRight: 30,
    alignSelf: 'center',
    width: '60%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 98,
    paddingBottom: 12,
    borderColor: '#4682B4',
    borderRadius: 8,
    backgroundColor: '#4682B4',
    color: 'white',
    paddingRight: 30,
    alignSelf: 'center',
    width: '60%',
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  pickerContainer: {
    height: 40,
    borderColor: '#4682B4',
    marginBottom: 16,
    borderRadius: 6,
  }
});

export default EditRestaurant;
