import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface FeedHomeScreenProps {}

function FeedHomeScreen({}: FeedHomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text>feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
