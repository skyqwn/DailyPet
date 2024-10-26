import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import MapHomeScreen from '../../screens/map/MapHomeScreen';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapHomeScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MainTabNavigator;
