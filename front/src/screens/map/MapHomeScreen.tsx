import React, {useRef} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import Config from 'react-native-config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const mapRef = useRef<MapView | null>(null);
  const googlePlaceApiKey = Config.GOOGLE_API_KEY;
  const insets = useSafeAreaInsets();
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

  const moveToLocation = (latitude: number, longitude: number) => {
    mapRef.current?.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.008,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
      />
      <View style={[styles.placeContainer, {marginTop: insets.top + 10}]}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Search..."
          debounce={200}
          styles={{
            textInputContainer: {
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              marginHorizontal: 20,
              position: 'relative',
              shadowColor: '#d4d4d4',
            },
            textInput: {
              backgroundColor: colors.WHITE,
              fontSize: 16,
              fontWeight: '600',
              width: '100%',
              borderRadius: 200,
            },
            listView: {
              backgroundColor: colors.WHITE,
              position: 'relative',
              top: 0,
              width: '100%',
              borderRadius: 10,
              shadowColor: '#d4d4d4',
              zIndex: 99,
            },
          }}
          onPress={(data, detail = null) => {
            if (detail?.geometry.location) {
              moveToLocation(
                detail.geometry.location.lat,
                detail.geometry.location.lng,
              );
            }
          }}
          query={{
            key: googlePlaceApiKey,
            language: 'ko',
          }}
        />
      </View>
      {/* <GoogleTextInput /> */}
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 20,
    width: '90%',
    alignSelf: 'center',
    zIndex: 10, // MapView 위에 나타나게 함
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
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    zIndex: 10,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapHomeScreen;
