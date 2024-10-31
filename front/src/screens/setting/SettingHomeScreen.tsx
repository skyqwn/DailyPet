import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import useAuth from '@/hooks/queries/useAuth';

interface SettingHomeScreenProps {}

function SettingHomeScreen({}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();
  return (
    <View>
      <Pressable
        onPress={() => {
          logoutMutation.mutate(null);
        }}>
        <Text>로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});

export default SettingHomeScreen;
