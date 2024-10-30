import useAuth from '@/hooks/queries/useAuth';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface FeedHomeScreenProps {}

function FeedHomeScreen({}: FeedHomeScreenProps) {
  const {logoutMutation} = useAuth();
  return (
    <View style={styles.container}>
      <Text>feed</Text>
      <Pressable
        onPress={() => {
          logoutMutation.mutate(null);
        }}>
        <Text>로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
