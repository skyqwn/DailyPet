import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Stack = createStackNavigator();

function MapStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="mapHome" component={MapHomeScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MapStackNavigator;
