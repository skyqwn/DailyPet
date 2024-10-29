import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapHomeScreen from '../../screens/map/MapHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import CalrendarHomeScreen from '@/screens/calrendar/CalrendarHomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, mainTabNavigation} from '@/constants';
import {StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';

export type MainTabParamList = {
  [mainTabNavigation.FEED_TAB]: undefined;
  [mainTabNavigation.CALENDAR_TAB]: undefined;
  [mainTabNavigation.MAP_TAB]: undefined;
  [mainTabNavigation.SETTING_TAB]: undefined;
};
const Tab = createBottomTabNavigator<MainTabParamList>();

const TabBarIcons = (route: RouteProp<MainTabParamList>, focused: boolean) => {
  let iconName = '';

  switch (route.name) {
    case mainTabNavigation.FEED_TAB: {
      iconName = focused ? 'home' : 'home-outline';
      break;
    }
    case mainTabNavigation.MAP_TAB: {
      iconName = focused ? 'map' : 'map-outline';
      break;
    }
    case mainTabNavigation.CALENDAR_TAB: {
      iconName = focused ? 'calendar-number' : 'calendar-number-outline';
      break;
    }
    case mainTabNavigation.SETTING_TAB: {
      iconName = focused ? 'settings' : 'settings-outline';
      break;
    }
  }

  return (
    <View style={focused && styles.icon}>
      <Ionicons name={iconName} color={colors.WHITE} size={25} />
    </View>
  );
};

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: colors.WHITE,
        tabBarInactiveTintColor: colors.WHITE,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333333',
          borderRadius: 50,
          paddingBottom: 0,
          overflow: 'hidden',
          marginHorizontal: 20,
          marginBottom: 30,
          height: 78,
          display: 'flex',
          justifyContent: 'space-between',
          // alignItems: 'center',
          // flexDirection: 'row',
          // position: 'absolute',
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <Tab.Screen
        name={mainTabNavigation.FEED_TAB}
        component={FeedHomeScreen}
      />
      <Tab.Screen name={mainTabNavigation.MAP_TAB} component={MapHomeScreen} />
      <Tab.Screen
        name={mainTabNavigation.CALENDAR_TAB}
        component={CalrendarHomeScreen}
      />
      <Tab.Screen
        name={mainTabNavigation.SETTING_TAB}
        component={SettingHomeScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.GREEN_400,
    padding: 10,
    borderRadius: 20,
  },
});

export default MainTabNavigator;
