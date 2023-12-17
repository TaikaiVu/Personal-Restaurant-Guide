import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantList from './screens/RestaurantList';
import AddRestaurant from './screens/AddRestaurant';
import HomeScreen from './screens/HomeScreen';
import DetailRestaurant from './screens/DetailRestaurant';
import EditRestaurant from './screens/EditRestaurant';
import SplashScreen from './screens/SplashScreen';
import Geolocation from 'react-native-geocoding';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';
import SetProfile from './screens/SetProfile';


Geolocation.init('AIzaSyCefx7AYYbtankadYQ3oCukCjlguPF9_1I')

AppRegistry.registerComponent(appName, () => App)

const Stack = createStackNavigator();

const restaurantGuideHeaderStyles = {
  title: 'My Gourmet',
  headerStyle: {
    backgroundColor: 'gray',
  },
  headerTitleStyle: {
    color: 'white',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash Screen" >

        <Stack.Screen 
          options={{ headerShown: false }} 
          name="Splash Screen" 
          component={SplashScreen} />

        <Stack.Screen
          name="Set Profile" // Add Set Profile screen
          component={SetProfile}
          options={restaurantGuideHeaderStyles}
        />

        <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
          options={restaurantGuideHeaderStyles}
        />
        <Stack.Screen
          name="Add Restaurant"
          component={AddRestaurant}
          options={restaurantGuideHeaderStyles}
        />
        <Stack.Screen
          name="Restaurant List"
          component={RestaurantList}
          options={restaurantGuideHeaderStyles}
        />
        <Stack.Screen
          name="Detail Restaurant"
          component={DetailRestaurant}
          options={restaurantGuideHeaderStyles}
        />


        <Stack.Screen 
          name="Edit Restaurant" 
          component={EditRestaurant} 
          options={restaurantGuideHeaderStyles}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;