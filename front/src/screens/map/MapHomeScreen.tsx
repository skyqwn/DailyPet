import React, {useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import Config from 'react-native-config';

import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {MainTabParamList} from '@/navigations/tab/MainTabNavigator';
import {alerts, colors, mapNavigations} from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import CustomMarker from '@/components/CustomMarker';
import usePermission from '@/hooks/usePermission';
import useGetMarkers from '@/hooks/queries/useGetMarkers';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;

function MapHomeScreen() {
  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation<Navigation>();
  const googlePlaceApiKey = Config.GOOGLE_API_KEY;
  const insets = useSafeAreaInsets();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const {data: markers = []} = useGetMarkers();

  usePermission('LOCATION');

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }
    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });

    setSelectLocation(null);
  };

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
      {/* GoogleMap */}
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        onLongPress={handleLongPressMapView}>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            // onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        <CustomMarker
          color="RED"
          score={1}
          coordinate={{latitude: 37.5516, longitude: 126.9898}}
        />

        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>

      {/* GoogleAutoInput */}
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

      {/* Side Button  */}
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MaterialIcons name="add" color={colors.WHITE} size={25} />
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
