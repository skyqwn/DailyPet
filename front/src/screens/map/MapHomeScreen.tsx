import React, {useEffect, useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, LatLng} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '@/constants';

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516,
    longitude: 126.9898,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const mapRef = useRef<MapView | null>(null);

  const handlePressUserLocation = () => {
    console.log(1);
    if (isUserLocationError) {
      Alert.alert('asds');
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        console.log(1);
        console.log(userLocation);
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton={false}
      />
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonList: {
    position: 'absolute',
    bottom: 150,
    right: 10,
  },
  mapButton: {
    backgroundColor: colors.GREEN_400,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapHomeScreen;
