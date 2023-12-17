import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native'; // Add TouchableOpacity import
 import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RestaurantList({ navigation, route }) {

  const [restaurantData, setRestaurantData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const userEmail = route.params?.userEmail;



  useEffect(() => {
    loadRestaurantData();

  }, []);

  useEffect(() => {
    // Filter restaurants based on search query
    const filtered = restaurantData.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchQuery, restaurantData]);

  const loadRestaurantData = async () => {
    try {
      // Retrieve stored restaurant data from AsyncStorage
      const storedData = await AsyncStorage.getItem('restaurantData');
      if (storedData) {
        setRestaurantData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading restaurant data:', error);
    }
  };

  const handleSelectRestaurant = (restaurant) => {
    console.log('Selected Restaurant:', restaurant);
    console.log('User Email:', userEmail);
    navigation.navigate('Detail Restaurant', {restaurant, userEmail})
    // navigation.navigate('Edit Restaurant', { restaurant });
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectRestaurant(item)}>
      <View style={styles.gridItem}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rate}>Rate: {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restaurant List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by restaurant name"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={searchQuery ? filteredRestaurants : restaurantData}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderRestaurantItem}
        horizontal={false}
      />
    </View>
  );
}

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
  gridItem: {
    backgroundColor: 'grey',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    width: '90%',
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rate: {
    color: 'white',
    fontSize: 14,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});
