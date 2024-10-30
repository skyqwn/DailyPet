import React, {useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, LatLng} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import Config from 'react-native-config';
import usePermission from '@/hooks/usePermission';

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const mapRef = useRef<MapView | null>(null);
  usePermission('LOCATION');

  const {isUserLocationError, userLocation} = useUserLocation();

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

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
    top: 150,
    right: 10,
  },
  mapButton: {
    backgroundColor: colors.GREEN_500,
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
