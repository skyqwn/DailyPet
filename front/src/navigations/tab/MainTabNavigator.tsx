import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapHomeScreen from '../../screens/map/MapHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import CalrendarHomeScreen from '@/screens/calrendar/CalrendarHomeScreen';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="FeedHome" component={FeedHomeScreen} />
      <Tab.Screen name="MapHome" component={MapHomeScreen} />
      <Tab.Screen name="CalrendarHome" component={CalrendarHomeScreen} />
      <Tab.Screen name="SettingHome" component={SettingHomeScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
