import {mapNavigations} from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MapStackNavigator;
