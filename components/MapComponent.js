import React from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ latitude, longitude, fullScreen }) => {
    return (
      <View style={fullScreen ? { flex: 1 } : { height: 280 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude, longitude }} title="Restaurant Location" />
        </MapView>
      </View>
    );
  };
  
  export default MapComponent;