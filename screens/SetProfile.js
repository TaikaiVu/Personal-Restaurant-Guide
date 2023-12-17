import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SetProfile = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSaveProfile = async () => {
    const newUserProfile = {
      userName: userName,
      userEmail: userEmail
    };

    console.log('Saving profile:', newUserProfile);

    try {
      // Retrieve existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem('userProfile');
      const data = existingData ? JSON.parse(existingData) : [];

      // Add the new profile
      data.push(newUserProfile);

      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem('userProfile', JSON.stringify(data));

      // Navigate to the home screen
      navigation.replace('Home Screen', { userName, userEmail });
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Your Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />

      <Text style={styles.label}>Enter Your Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="john.doe@example.com"
        value={userEmail}
        onChangeText={(text) => setUserEmail(text)}
        keyboardType="email-address"
      />

      <Button title="Save Profile" onPress={handleSaveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
});

export default SetProfile;
