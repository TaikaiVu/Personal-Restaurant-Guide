import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';



const SplashScreen = ({ navigation }) => {
  useEffect(() => {

    // Check to see if the user information is entered or not
    const checkUserState = async () => {
      try{
        const userNameData = await AsyncStorage.getItem('userProfile')
        const userNameDataJSON = JSON.parse(userNameData)

        if (userNameDataJSON && userNameDataJSON.length > 0) {
          console.log("User data found !")
          navigation.replace('Home Screen')
        }else{
          console.log("Not found!")
          navigation.replace('Set Profile')
        }
      }catch(err){
        console.log("Error checking user profile: ", err)
        navigation.replace('Set Profile');

      }
    }
  
    const splashTimer = setTimeout(() => {
      checkUserState()
    }, 3000);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(splashTimer);
  }, [navigation]);



  return (
    <View style={styles.container}>
      <Image source={require('../assets/cover.jpg')} style={styles.image} />
    </View>
  );
};

const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover', // Use 'cover' to make sure the image covers the entire screen
  },
});

export default SplashScreen;





