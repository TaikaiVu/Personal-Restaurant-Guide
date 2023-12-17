import React, { useEffect, useState } from 'react';
import * as Sharing from 'expo-sharing';
import { View, Text, ScrollView, Button, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geocoding';
import MapComponent from '../components/MapComponent';
import { FontAwesome } from '@expo/vector-icons';
import { Navigation } from 'react-native-navigation';
import Email from 'react-native-email';



// Inside your DetailRestaurant
const DetailRestaurant = ({ route, navigation }) => {
  const [location, setLocation] = useState(null);
  const [fullScreenMap, setFullScreenMap] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true); // Added loading state
  const { restaurant } = route.params;
  const { name, address, phoneNumber, details, tag, rating } = route.params.restaurant;

  const userEmail = route.params?.userEmail;


  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await Geolocation.from(address);

        // Check if the response has results and an address
        if (response.results.length > 0 && response.results[0].formatted_address) {
          const latitude = response.results[0].geometry.location.lat;
          const longitude = response.results[0].geometry.location.lng;
          console.log('Latitude:', latitude, 'Longitude:', longitude);
          console.log(userEmail)

          setLocation({ latitude, longitude });
        } else {
          setAddressAvailable(false); // Set addressAvailable to false if address is not available
        }

        setLoadingLocation(false);
      } catch (err) {
        console.log(err);
        setLoadingLocation(false);
        setAddressAvailable(false);
      }
    };

    getLocation();
  }, [address]);

  const getDirection = () => {
    if (location) {
      const { latitude, longitude } = location;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };


  if (!restaurant) {
    console.error('Restaurant not found');
    return null;
  }


  const handleEmailShare = async () => {
    const message = "Check out this restaurant !"
    const body = `
      Restaurant Details:
      Name: ${name}
      Address: ${address}
      Phone Number: ${phoneNumber}
      Tags: ${tag}
      My Rating: ${rating}
    `;
    const recipients = ''; 
    const email = userEmail; // pass the email values all the way from SetProfile.js
  
    try {
      const url = `mailto:${recipients}?subject=${encodeURIComponent(
        message
      )}&body=${encodeURIComponent(body)}&from=${encodeURIComponent(email)}`;
      await Linking.openURL(url);
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleEdit = () => {
    navigation.navigate('Edit Restaurant', { restaurant: route.params.restaurant });
  };

  const handleDelete = async () => {
    try {
      const existingData = await AsyncStorage.getItem('restaurantData');
      let data = existingData ? JSON.parse(existingData) : [];
      const index = data.findIndex((r) => r.id === route.params?.restaurant?.id);

      if (index !== -1) {
        data.splice(index, 1);
        await AsyncStorage.setItem('restaurantData', JSON.stringify(data));

        navigation.goBack();
        navigation.goBack();
        navigation.navigate('Restaurant List');
      } else {
        console.error('Restaurant not found for deletion');
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!fullScreenMap && (
        <>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.detailText}>{`Rating: ${rating}`}</Text>
          <Text style={styles.detailText}>Tags: {tag}</Text>

          <View style={styles.detailContainer}>
            <Text style={styles.detailText}>Phone Number: {phoneNumber}</Text>
            <Text style={styles.detailText}>Address: {address}</Text>
            <Text style={styles.detailText}>Description: {details}</Text>
          </View>

        </>
      )}

      <View style={styles.mapContainer}>
        {loadingLocation ? (
          <Text>Address not available</Text>
        ) : (
          <MapComponent latitude={location.latitude} longitude={location.longitude} fullScreen={fullScreenMap} />
        )}
        <TouchableOpacity
          style={styles.fullScreenButton}
          onPress={() => setFullScreenMap(!fullScreenMap)}
        >
          <FontAwesome name={fullScreenMap ? 'compress' : 'expand'} size={24} color="black" />
        </TouchableOpacity>
      </View>

          {!fullScreenMap && (
        <>
         <View style={styles.buttonGroup}>
            <Button title="Get Directions" onPress={getDirection} />
            <Button title="Share" onPress={handleEmailShare}/>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagsText: {
    fontSize: 14,
    color: 'gray',
  },
  detailContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1, // Make sure it takes the whole available space
    marginBottom: 90,
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  fullScreenButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 60,
    marginTop: 100,
    backgroundColor: 'transparent', // Set a transparent background
  },

  button: {
    backgroundColor: '#808080',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%', // Adjust the width as needed
  },

  deleteButton: {
    backgroundColor: 'red',
  },
  buttonGroup: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
});

export default DetailRestaurant;
