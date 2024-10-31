import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {mapNavigations} from '@/constants';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params;
  console.log(location);
  return (
    <SafeAreaView>
      <Text>AddPost</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AddPostScreen;
