import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation, route }) {
  const [userData, setUserData] = useState('');
  // const userEmail = route.params?.userEmail;

  // check id there is user information or not, if not, navigate to SetProfile

  useEffect(() => {
    const checkUserState = async () => {
      try {
        const getUserData = await AsyncStorage.getItem('userProfile');
        const userDataJSON = JSON.parse(getUserData);

        if (userDataJSON && userDataJSON.length > 0) {
          console.log('User data found:', userDataJSON);
          setUserData(userDataJSON);

        } else {
          console.log('User data not found!');
          navigation.replace('Set Profile');
        }
      } catch (error) {
        console.error('Error checking user profile:', error);
        navigation.replace('Set Profile');
      }
    };
    checkUserState();

  }, [navigation]);

  const handleAddRestaurant = () => {
    navigation.navigate('Add Restaurant');
  };

  const handleViewRestaurantList = () => {
    const userEmail = userData[0]?.userEmail;
    navigation.navigate('Restaurant List', {userEmail});
  };


  return (
    <View style={styles.container}>
 
    
      {/* Shows only after the user information is loaded */}
      <View style={styles.userContainer}>
        {userData ? (
          <>
            <Text style={styles.userInfoText}>Welcome, {userData[0]?.userName}!</Text>
          </>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddRestaurant}>
          <Text style={styles.buttonText}>Add Your Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={handleViewRestaurantList}>
          <Text style={styles.buttonText}>View Restaurant List</Text>
        </TouchableOpacity>
      </View>

  
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#3498db', // Set a background color for the container
    borderWidth: 2, // Border width
    borderColor: '#2980b9', // Border color
  },
  userPhotoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden', // Ensure the image stays within the rounded border
    marginRight: 10,
  },
  userPhoto: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  userInfo: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Text color
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 16,
  },
  button: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#808080',
  },
  viewButton: {
    backgroundColor: '#808080',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});